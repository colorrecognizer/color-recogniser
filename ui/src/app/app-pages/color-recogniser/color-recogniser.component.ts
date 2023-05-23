import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { ThemeService } from "src/app/shared/services/theme.service";

declare let Konva: any;

const BORDER_WIDTH = 4;
const SCROLL_SCALE_DELTA = 1.05;

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
