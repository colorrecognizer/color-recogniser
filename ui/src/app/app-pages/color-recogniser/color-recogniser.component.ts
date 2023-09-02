import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { ThemeService } from "src/app/shared/services/theme.service";
import { SelectionTool } from "./selection-tool";
import {
  Color,
  ColorCoverage,
  RecogniserResponse,
} from "src/app/shared/auto-generated/apis";
import { catchError, finalize, map } from "rxjs";
import { MessageService } from "primeng/api";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { DialogService } from "primeng/dynamicdialog";
import { FileUpload } from "primeng/fileupload";
import { Meta, Title } from "@angular/platform-browser";
import { HowToMixComponent } from "src/app/shared/components/how-to-mix/how-to-mix.component";
import { BackgroundChangeService } from "src/app/shared/services/background-change.service";

declare let Konva: any;
declare let Mousetrap: any;

const BORDER_WIDTH = 4;
const SCROLL_SCALE_DELTA = 1.01;
const DRAG_THRESHOLD = 0.25;

function getCenter(p1: any, p2: any) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

function getDistance(p1: { x: any; y: any }, p2: { x: any; y: any }) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

@Component({
  selector: "app-color-recogniser",
  templateUrl: "./color-recogniser.component.html",
  styleUrls: ["./color-recogniser.component.scss"],
})
export class ColorRecognizerComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  stage: any;
  layer: any;
  imageObj: any;
  konvaImage: any;
  @ViewChild("canvas") canvasDiv!: ElementRef<HTMLDivElement>;
  @ViewChild("matchColorTable", { static: false })
  matchColorTable!: ElementRef<HTMLDivElement>;
  border = new Konva.Line({
    stroke: "black",
    strokeWidth: BORDER_WIDTH,
  });

  panZoomLastCenter: any = null;
  panZoomLastDist = 0;

  selectionTools: SelectionTool[] = [
    {
      icon: "pi pi-stop",
      label: "Rectangle selection",
      type: "RECTANGLE",
    },
    {
      icon: "pi pi-circle",
      label: "Ellipse selection",
      type: "ELLIPSE",
    },
    {
      label: "Free selection",
      icon: "pi pi-pencil",
      type: "FREE",
    },
  ];

  selectedSelectionTool?: SelectionTool;
  canModifyImage = true;
  selection: any;
  freeDrawingGroup: any;
  canvas: any;
  averageColor?: {
    r: number;
    g: number;
    b: number;
  };

  recogniseButtonDisabled = false;
  private ctrlPressed = false;
  private zoomTipShown = false;
  private moveTipShown = false;
  colorCoverages: ColorCoverage[] = [];
  selectedColor?: Color;
  @ViewChild("imageUpload") imageUpload!: FileUpload;
  @ViewChildren("bubbles") bubbles!: QueryList<ElementRef<HTMLSpanElement>>;
  numColors = 5;

  get imageZoom(): number {
    if (!this.konvaImage) return 1;

    return Math.round(this.konvaImage.scaleX() * 100);
  }

  set imageZoom(value: number) {
    if (!this.konvaImage || this.imageZoom === value) return;

    if (!this.zoomTipShown) {
      this.$message.add({
        severity: "info",
        summary: "Tip",
        detail:
          "You can zoom in/out the image by holding down \"ctrl\"/\"⌘\" while scrolling, or using two fingers on a touch device.",
        life: 60000,
      });
      this.zoomTipShown = true;
    }

    const scale = value / 100;

    const oldScale = this.konvaImage.scaleX();

    const mousePointTo = {
      x: (this.stage.width() / 2 - this.konvaImage.x()) / oldScale,
      y: (this.stage.height() / 2 - this.konvaImage.y()) / oldScale,
    };

    const newPos = {
      x: this.stage.width() / 2 - mousePointTo.x * scale,
      y: this.stage.height() / 2 - mousePointTo.y * scale,
    };

    this.konvaImage.position(newPos);
    this.konvaImage.scale({ x: scale, y: scale });
  }

  get canvasWidth(): number {
    return this.canvasDiv.nativeElement.offsetWidth;
  }

  set canvasWidth(value: number) {
    this.canvasDiv.nativeElement.style.width = value + "px";
  }

  constructor(
    $theme: ThemeService,
    private $message: MessageService,
    private $http: HttpClient,
    private $dialog: DialogService,
    private $title: Title,
    $meta: Meta,
    private $backgroundChange: BackgroundChangeService
  ) {
    this.$title.setTitle("Color Recognizer");

    $theme.theme.subscribe((theme) => {
      this.border.stroke(theme === "light-theme" ? "black" : "white");
    });

    $meta.addTags([
      {
        name: "description",
        content:
          "Discover a world of vibrant colors with Color Recognizer. Our easy-to-use tool helps you recognize and explore colors in photos, making it perfect for kids, art teachers, artists, photographers, and designers. Unleash your creativity and unlock the palette of possibilities with our accurate color recognition tool.",
      },
      {
        name: "og:title",
        content: "Color Recognizer",
      },
      {
        name: "og:description",
        content:
          "Discover a world of vibrant colors with Color Recognizer. Our easy-to-use tool helps you recognize and explore colors in photos, making it perfect for kids, art teachers, artists, photographers, and designers. Unleash your creativity and unlock the palette of possibilities with our accurate color recognition tool.",
      },
    ]);
  }

  ngOnDestroy(): void {
    this.$backgroundChange.clear();
  }

  ngOnInit(): void {
    Mousetrap.bind(
      ["ctrl", "command"],
      () => {
        this.ctrlPressed = true;
        if (!this.selection) this.konvaImage.draggable(true);
      },
      "keydown"
    );

    Mousetrap.bind(
      ["ctrl", "command"],
      () => {
        this.ctrlPressed = false;
        this.konvaImage.draggable(false);
      },
      "keyup"
    );
  }

  ngAfterViewInit(): void {
    this.$backgroundChange.randomize();

    // by default Konva prevent some events when node is dragging
    // it improve the performance and work well for 95% of cases
    // we need to enable all events on Konva, even when we are dragging a node
    // so it triggers touchmove correctly
    Konva.hitOnDragEnabled = true;

    this.stage?.destroyChildren();

    this.layer = new Konva.Layer();

    this.stage = new Konva.Stage({
      container: "canvas",
    });

    this.stage.add(this.layer);
    this.konvaImage = new Konva.Image({
      preventDefault: false,
    });

    this.konvaImage.on("mousedown touchstart", (event: any) => {
      event.evt.stopPropagation();

      if (!this.moveTipShown) {
        this.$message.add({
          severity: "info",
          summary: "Tip",
          detail:
            "You can move the image by holding down \"ctrl\"/\"⌘\" while dragging it, or using two fingers on a touch device.",
          life: 60000,
        });
        this.moveTipShown = true;
      }
    });

    // add the shape to the layer
    this.layer.add(this.konvaImage);
    this.layer.add(this.border);

    this.setToDefault();
    // this.setImageDragLimit();

    this.setStageZoom();

    // this.imageObj.src = "/assets/images/andrew.jpeg";
    this.canvas = this.stage.container().getElementsByTagName("canvas")[0];

    this.canvas.addEventListener("mouseover", () => {
      this.canvas.tabIndex = 1;
      this.canvas.focus();
    });

    // Bubbles
    this.bubbles.forEach(
      (b) =>
        (b.nativeElement.style.animationDuration = `calc(125s / ${
          Math.random() * (30 - 10) + 10
        })`)
    );
  }

  removeImage() {
    this.imageObj = null;
    this.konvaImage.setAttrs({
      height: 0,
      image: null,
    });

    this.onCanvasResized();
  }

  setImage(file: File) {
    const URL = window.webkitURL || window.URL;
    const url = URL.createObjectURL(file);
    this.imageObj = new Image();
    this.imageObj.src = url;

    this.imageObj.onload = () => {
      this.konvaImage.image(this.imageObj);

      this.onCanvasResized();
    };
  }

  private onImageDragLimitUpdated() {
    if (!this.konvaImage || !this.stage) {
      return;
    }

    const stageWidth = this.stage.width();
    const stageHeight = this.stage.height();
    const imageWidth = this.konvaImage.width() * this.konvaImage.scaleX();
    const imageHeight = this.konvaImage.height() * this.konvaImage.scaleX();

    if (this.konvaImage.x() < -imageWidth * (1 - DRAG_THRESHOLD)) {
      this.konvaImage.x(-imageWidth * (1 - DRAG_THRESHOLD));
    } else if (this.konvaImage.x() > stageWidth - imageWidth * DRAG_THRESHOLD) {
      this.konvaImage.x(stageWidth - imageWidth * DRAG_THRESHOLD);
    }

    if (this.konvaImage.y() < -imageHeight * (1 - DRAG_THRESHOLD)) {
      this.konvaImage.y(-imageHeight * (1 - DRAG_THRESHOLD));
    } else if (
      this.konvaImage.y() >
      stageHeight - imageHeight * DRAG_THRESHOLD
    ) {
      this.konvaImage.y(stageHeight - imageHeight * DRAG_THRESHOLD);
    }
  }

  private setImageDragLimit() {
    if (!this.konvaImage) return;

    // we can use transformer event
    // or just shape event
    this.konvaImage.on("dragmove", () => {
      this.onImageDragLimitUpdated();
    });
  }

  private setStageZoom() {
    this.stage.on(
      "wheel",
      (e: {
        evt: { preventDefault: () => void; deltaY: number; ctrlKey: any };
      }) => {
        if (!this.canModifyImage || !this.ctrlPressed) return;

        // stop default scrolling
        e.evt.preventDefault();

        const oldScale = this.konvaImage.scaleX();
        const pointer = this.stage.getPointerPosition();

        const mousePointTo = {
          x: (pointer.x - this.konvaImage.x()) / oldScale,
          y: (pointer.y - this.konvaImage.y()) / oldScale,
        };

        // how to scale? Zoom in? Or zoom out?
        let direction = e.evt.deltaY > 0 ? 1 : -1;

        // when we zoom on trackpad, e.evt.ctrlKey is true
        // in that case lets revert direction
        if (e.evt.ctrlKey) {
          direction = -direction;
        }

        const newScale =
          direction > 0
            ? oldScale * SCROLL_SCALE_DELTA
            : oldScale / SCROLL_SCALE_DELTA;

        this.konvaImage.scale({ x: newScale, y: newScale });

        const newPos = {
          x: pointer.x - mousePointTo.x * newScale,
          y: pointer.y - mousePointTo.y * newScale,
        };
        this.konvaImage.position(newPos);
        this.onImageDragLimitUpdated();
      }
    );

    this.stage.on(
      "touchmove",
      (e: { evt: { preventDefault: () => void; touches: any[] } }) => {
        if (!this.canModifyImage) return;
        const touch1 = e.evt.touches[0];
        const touch2 = e.evt.touches[1];

        if (touch1 && touch2) {
          e.evt.preventDefault();
          // if the stage was under Konva's drag&drop
          // we need to stop it, and implement our own pan logic with two pointers
          if (this.konvaImage.isDragging()) {
            this.konvaImage.stopDrag();
          }

          const p1 = {
            x: touch1.clientX,
            y: touch1.clientY,
          };
          const p2 = {
            x: touch2.clientX,
            y: touch2.clientY,
          };

          if (!this.panZoomLastCenter) {
            this.panZoomLastCenter = getCenter(p1, p2);
            return;
          }
          const newCenter = getCenter(p1, p2);

          const dist = getDistance(p1, p2);

          if (!this.panZoomLastDist) {
            this.panZoomLastDist = dist;
          }

          // local coordinates of center point
          const pointTo = {
            x: (newCenter.x - this.konvaImage.x()) / this.konvaImage.scaleX(),
            y: (newCenter.y - this.konvaImage.y()) / this.konvaImage.scaleX(),
          };

          const scale =
            this.konvaImage.scaleX() * (dist / this.panZoomLastDist);

          this.konvaImage.scaleX(scale);
          this.konvaImage.scaleY(scale);

          // calculate new position of the stage
          const dx = newCenter.x - this.panZoomLastCenter.x;
          const dy = newCenter.y - this.panZoomLastCenter.y;

          const newPos = {
            x: newCenter.x - pointTo.x * scale + dx,
            y: newCenter.y - pointTo.y * scale + dy,
          };

          this.konvaImage.position(newPos);

          this.panZoomLastDist = dist;
          this.panZoomLastCenter = newCenter;
          this.onImageDragLimitUpdated();
        }
      }
    );

    this.stage.on("touchend", () => {
      if (!this.canModifyImage) return;
      this.panZoomLastDist = 0;
      this.panZoomLastCenter = null;
    });
  }

  onCanvasResized() {
    if (
      !this.stage?.width ||
      !this.stage?.height ||
      !this.konvaImage?.width ||
      !this.konvaImage?.height
    ) {
      return;
    }

    this.selectedSelectionTool = undefined;
    this.onSelectionToolChanged();

    if (this.imageObj) {
      const imageWidth = this.imageObj?.width;
      const imageHeight = this.imageObj?.height;

      // canvasWidth / canvasHeight = imageWidth / imageHeight
      // canvasHeight = canvasWidth / (imageWidth / imageHeight)
      const stageWidth = this.canvasWidth;
      const stageHeight = Math.min(
        this.canvasWidth,
        this.canvasWidth / (imageWidth / imageHeight)
      );

      const realStageHeight = this.canvasWidth / (imageWidth / imageHeight);

      const oldStageWidth = this.stage.width();
      this.stage.width(stageWidth);
      const scale = oldStageWidth ? this.stage.width() / oldStageWidth : 1;

      this.stage.height(stageHeight);
      this.konvaImage.x(this.konvaImage.x() * scale);
      this.konvaImage.y(this.konvaImage.y() * scale);
      this.konvaImage.width(stageWidth - BORDER_WIDTH);
      this.konvaImage.height(realStageHeight - BORDER_WIDTH);
      this.border.points([
        0,
        0,
        0,
        stageHeight,
        stageWidth,
        stageHeight,
        stageWidth,
        0,
        0,
        0,
      ]);
    } else {
      this.stage.height(0);
      this.konvaImage.height(0);
    }
  }

  setToDefault() {
    this.konvaImage.x(BORDER_WIDTH / 2);
    this.konvaImage.y(BORDER_WIDTH / 2);
    this.konvaImage.scale({ x: 1, y: 1 });
  }

  onSelectionToolChanged() {
    this.konvaImage.draggable(false);
    this.stage.off("mousedown touchstart mousemove touchmove mouseup touchend");

    this.selection?.destroy();
    this.selection = undefined;

    if (!this.selectedSelectionTool) {
      this.canModifyImage = true;

      // Turn on zoom back because it is off in the first line of the function
      this.setStageZoom();
      return;
    }

    this.canModifyImage = false;

    switch (this.selectedSelectionTool.type) {
      case "RECTANGLE":
        this.selection = new Konva.Rect();
        break;
      case "ELLIPSE":
        this.selection = new Konva.Ellipse();
        break;
      case "FREE":
        this.selection = new Konva.Line({
          points: [],
          closed: true,
          // round cap for smoother lines
          lineCap: "round",
          lineJoin: "round",
        });

        break;
    }

    this.selection.stroke("rgb(0,0,255)");
    this.selection.strokeWidth(BORDER_WIDTH);
    this.selection.visible(false);
    this.layer.add(this.selection);

    let x1: number, y1: number, x2: number, y2: number;
    let isSelecting = false;

    this.stage.on(
      "mousedown touchstart",
      (e: { target: any; evt: { preventDefault: () => void } }) => {
        // do nothing if we mousedown on any shape
        if (!this.selectedSelectionTool) {
          return;
        }

        isSelecting = true;
        e.evt.preventDefault();

        x1 = this.stage.getPointerPosition().x;
        y1 = this.stage.getPointerPosition().y;
        x2 = this.stage.getPointerPosition().x;
        y2 = this.stage.getPointerPosition().y;

        this.selection.visible(true);

        if (this.selectedSelectionTool.type === "FREE") {
          this.selection.points([x1, y1]);
        } else {
          this.selection.width(0);
          this.selection.height(0);
        }
      }
    );

    this.stage.on(
      "mousemove touchmove",
      (e: { evt: { preventDefault: () => void } }) => {
        // do nothing if we didn't start selection
        if (
          !this.selectedSelectionTool ||
          !this.selection.visible() ||
          !isSelecting
        ) {
          return;
        }

        e.evt.preventDefault();
        x2 = this.stage.getPointerPosition().x;
        y2 = this.stage.getPointerPosition().y;

        if (this.selectedSelectionTool.type === "FREE") {
          this.selection.points(this.selection.points().concat([x2, y2]));
        } else {
          let x = 0,
            y = 0;
          switch (this.selectedSelectionTool.type) {
            case "RECTANGLE":
              x = Math.min(x1, x2);
              y = Math.min(y1, y2);
              break;
            case "ELLIPSE":
              x = Math.min(x1, x2) + Math.abs(x2 - x1) / 2;
              y = Math.min(y1, y2) + Math.abs(y2 - y1) / 2;
              break;
          }

          this.selection.setAttrs({
            x: x,
            y: y,
            width: Math.abs(x2 - x1),
            height: Math.abs(y2 - y1),
          });
        }
      }
    );

    this.stage.on(
      "mouseup touchend",
      (e: { evt: { preventDefault: () => void } }) => {
        // do nothing if we didn't start selection
        if (!this.selectedSelectionTool || !this.selection.visible()) {
          return;
        }

        e.evt.preventDefault();
        isSelecting = false;
      }
    );
  }

  get isValidSelection(): boolean {
    return true;

    // if (!this.selectedSelectionTool) return false;

    // if (
    //   this.selectedSelectionTool.type === "RECTANGLE" ||
    //   this.selectedSelectionTool.type === "ELLIPSE"
    // ) {
    //   if (!this.selection.width() || !this.selection.height()) return false;
    // }

    // if (this.selectedSelectionTool.type === "FREE") {
    //   if (!this.selection.points().length) return false;
    // }

    // return true;
  }

  recognise() {
    if (!this.imageObj) {
      this.$message.add({
        severity: "warn",
        summary: "Action needed",
        detail: "Upload an image.",
      });
      return;
    }

    if (
      !this.selectedSelectionTool ||
      ((this.selectedSelectionTool.type === "RECTANGLE" ||
        this.selectedSelectionTool.type === "ELLIPSE") &&
        (!this.selection.width() || !this.selection.height())) ||
      (this.selectedSelectionTool.type === "FREE" &&
        !this.selection.points().length)
    ) {
      this.$message.add({
        severity: "warn",
        summary: "Action needed",
        detail: "Select the area to RECOGNIZE color.",
      });
      return;
    }

    console.log(this.selection);
    this.colorCoverages.length = 0;
    this.recogniseButtonDisabled = true;

    let minx = this.stage.width(),
      maxx = 0,
      miny = this.stage.height(),
      maxy = 0;

    switch (this.selectedSelectionTool?.type) {
      case "RECTANGLE":
        minx = this.selection.x();
        maxx = this.selection.x() + this.selection.width();
        miny = this.selection.y();
        maxy = this.selection.y() + this.selection.height();
        break;

      case "ELLIPSE":
        minx = this.selection.x() - this.selection.width() / 2;
        maxx = this.selection.x() + this.selection.width() / 2;
        miny = this.selection.y() - this.selection.height() / 2;
        maxy = this.selection.y() + this.selection.height() / 2;
        break;

      case "FREE":
        break;
    }

    const coordinates: any[] = [];
    if (this.selectedSelectionTool.type === "FREE") {
      const points = this.selection.points();
      for (let i = 0; i < points.length; i += 2) {
        coordinates.push({
          x: points[i],
          y: points[i + 1],
        });
      }

      coordinates.map((c) => {
        minx = Math.min(minx, c.x || 0);
        maxx = Math.max(maxx, c.x || 0);
        miny = Math.min(miny, c.y || 0);
        maxy = Math.max(maxy, c.y || 0);
      });
    }

    this.selection.visible(false);
    this.layer.draw();

    //create a new canvas
    // const uploadedCanvas = document.getElementById("uploadedCanvas") as any;
    const uploadedCanvas = document.createElement("canvas");
    const context = uploadedCanvas.getContext("2d");

    //set dimensions
    const desiredSize = 300;
    const scale = Math.max(maxx - minx, maxy - miny) / desiredSize;
    uploadedCanvas.width = (maxx - minx) / scale;
    uploadedCanvas.height = (maxy - miny) / scale;

    //apply the old canvas to the new one
    const realImageScale = this.canvas.width / this.stage.width();
    context?.drawImage(
      this.canvas,
      minx * realImageScale,
      miny * realImageScale,
      (maxx - minx) * realImageScale,
      (maxy - miny) * realImageScale,
      0,
      0,
      uploadedCanvas.width,
      uploadedCanvas.height
    );

    uploadedCanvas.toBlob((blob: any) => {
      if (!this.selectedSelectionTool) return;

      const formData: FormData = new FormData();
      formData.append("image", blob);
      formData.append(
        "recogniserRequest",
        JSON.stringify({
          selectionType: this.selectedSelectionTool.type,
          minX: 0,
          maxX: uploadedCanvas.width,
          minY: 0,
          maxY: uploadedCanvas.height,
          points:
            this.selectedSelectionTool.type === "FREE"
              ? coordinates.map((c) => {
                  return {
                    x: (c.x - minx) / scale,
                    y: (c.y - miny) / scale,
                  };
                })
              : [],
          numColors: this.numColors,
        })
      );

      this.selection.visible(true);
      this.$http
        .post<RecogniserResponse>(
          `${environment.apiUrl}/api/recognise`,
          formData,
          {
            responseType: "json",
          }
        )
        .pipe(
          map((res) => {
            this.colorCoverages = res.colorCoverages || [];
            this.colorCoverages = this.colorCoverages.sort(
              (a, b) =>
                (b.coveragePercentage || 0) - (a.coveragePercentage || 0)
            );

            if (this.colorCoverages[0]?.color) {
              this.$backgroundChange.setColor(this.colorCoverages[0].color);
            }

            setTimeout(() => {
              this.matchColorTable.nativeElement.scrollIntoView({
                behavior: "smooth",
              });
            }, 100);
          }),
          catchError((e: Error) => {
            throw e;
          }),
          finalize(() => {
            this.recogniseButtonDisabled = false;
          })
        )
        .subscribe();
    });
  }

  showHowToMix(color: any) {
    if (!color) return;

    this.$dialog.open(HowToMixComponent, {
      header: `How to mix color ${color.name}`,
      draggable: true,
      data: {
        color: color,
      },
    });
  }
}
