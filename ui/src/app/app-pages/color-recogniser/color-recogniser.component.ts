import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { ThemeService } from "src/app/shared/services/theme.service";
import { SelectionTool } from "./selection-tool";
import { DropdownChangeEvent } from "primeng/dropdown";

declare let Konva: any;

const BORDER_WIDTH = 4;
const SCROLL_SCALE_DELTA = 1.05;
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
export class ColorRecogniserComponent implements AfterViewInit {
  stage: any;
  layer = new Konva.Layer();
  imageObj = new Image();
  konvaImage: any;
  @ViewChild("canvas") canvas!: ElementRef<HTMLDivElement>;
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
      type: "rectangle",
    },
    {
      icon: "pi pi-circle",
      label: "Ellipse selection",
      type: "ellipse",
    },
    {
      label: "Free selection",
      svgPath: "/assets/svgs/free-drawing.svg",
      type: "free",
    },
  ];

  selectedSelectionTool?: SelectionTool;
  canModifyImage = true;
  selection: any;
  freeDrawingGroup: any;

  get imageZoom(): number {
    if (!this.konvaImage) return 1;

    return Math.round(this.konvaImage.scaleX() * 100);
  }

  set imageZoom(value: number) {
    if (!this.konvaImage) return;
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
    return this.canvas.nativeElement.offsetWidth;
  }

  constructor(private $theme: ThemeService) {
    $theme.theme.subscribe((theme) => {
      this.border.stroke(theme === "light-theme" ? "black" : "white");
    });
  }

  ngAfterViewInit(): void {
    // by default Konva prevent some events when node is dragging
    // it improve the performance and work well for 95% of cases
    // we need to enable all events on Konva, even when we are dragging a node
    // so it triggers touchmove correctly
    Konva.hitOnDragEnabled = true;

    this.stage = new Konva.Stage({
      container: "canvas",
    });

    this.stage.add(this.layer);
    this.setStageZoom();

    this.imageObj.onload = () => {
      this.konvaImage = new Konva.Image({
        image: this.imageObj,
        draggable: true,
      });

      this.onCanvasResized();
      this.setToDefault();
      this.setImageDragLimit();

      // add the shape to the layer
      this.layer.add(this.konvaImage);
      this.layer.add(this.border);
    };

    this.imageObj.src = "/assets/images/andrew.jpeg";
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
        if (!this.canModifyImage) return;

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

        e.evt.preventDefault();
        const touch1 = e.evt.touches[0];
        const touch2 = e.evt.touches[1];

        if (touch1 && touch2) {
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
      !this.imageObj?.width ||
      !this.imageObj?.height ||
      !this.stage?.width ||
      !this.stage?.height ||
      !this.konvaImage?.width ||
      !this.konvaImage?.height
    ) {
      return;
    }

    const imageWidth = this.imageObj.width;
    const imageHeight = this.imageObj.height;

    // canvasWidth / canvasHeight = imageWidth / imageHeight
    // canvasHeight = canvasWidth / (imageWidth / imageHeight)
    const stageWidth = this.canvasWidth;
    const stageHeight = this.canvasWidth / (imageWidth / imageHeight);
    const oldStageWidth = this.stage.width();
    this.stage.width(stageWidth);
    const scale = oldStageWidth ? this.stage.width() / oldStageWidth : 1;

    this.stage.height(stageHeight);
    this.konvaImage.x(this.konvaImage.x() * scale);
    this.konvaImage.y(this.konvaImage.y() * scale);
    this.konvaImage.width(stageWidth - BORDER_WIDTH);
    this.konvaImage.height(stageHeight - BORDER_WIDTH);
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
  }

  setToDefault() {
    this.konvaImage.x(BORDER_WIDTH / 2);
    this.konvaImage.y(BORDER_WIDTH / 2);
    this.konvaImage.scale({ x: 1, y: 1 });
  }

  onSelectionToolChanged() {
    this.stage.off("mousedown touchstart mousemove touchmove mouseup touchend");

    this.selection?.destroy();

    if (!this.selectedSelectionTool) {
      this.canModifyImage = true;
      this.konvaImage.draggable(true);

      // Turn on zoom back because it is off in the first line of the function
      this.setStageZoom();
      return;
    }

    this.canModifyImage = false;
    this.konvaImage.draggable(false);

    switch (this.selectedSelectionTool.type) {
      case "rectangle":
        this.selection = new Konva.Rect();
        break;
      case "ellipse":
        this.selection = new Konva.Ellipse();
        break;
      case "free":
        this.selection = new Konva.Line({
          points: [],
          closed: true,
        });

        break;
    }

    this.selection.fill("rgba(0,0,255,0.5)");
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

        if (this.selectedSelectionTool.type === "free") {
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

        if (this.selectedSelectionTool.type === "free") {
          this.selection.points(this.selection.points().concat([x2, y2]));
        } else {
          let x = 0,
            y = 0;
          switch (this.selectedSelectionTool.type) {
            case "rectangle":
              x = Math.min(x1, x2);
              y = Math.min(y1, y2);
              break;
            case "ellipse":
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
}
