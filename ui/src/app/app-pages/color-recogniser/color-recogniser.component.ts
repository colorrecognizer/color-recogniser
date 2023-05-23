import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { ThemeService } from "src/app/shared/services/theme.service";

declare let Konva: any;

const BORDER_WIDTH = 4;
const SCROLL_SCALE_DELTA = 1.05;

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

      // add the shape to the layer
      this.layer.add(this.konvaImage);
      this.layer.add(this.border);
    };

    this.imageObj.src = "/assets/images/andrew.jpeg";
  }

  private setStageZoom() {
    this.stage.on(
      "wheel",
      (e: {
        evt: { preventDefault: () => void; deltaY: number; ctrlKey: any };
      }) => {
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
      }
    );

    this.stage.on(
      "touchmove",
      (e: { evt: { preventDefault: () => void; touches: any[] } }) => {
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
        }
      }
    );

    this.stage.on("touchend", () => {
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
    this.stage.width(stageWidth);
    this.stage.height(stageHeight);
    this.konvaImage.width(stageWidth - 2 * BORDER_WIDTH);
    this.konvaImage.height(stageHeight - 2 * BORDER_WIDTH);
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
    this.konvaImage.x(BORDER_WIDTH);
    this.konvaImage.y(BORDER_WIDTH);
    this.konvaImage.scale({ x: 1, y: 1 });
  }
}
