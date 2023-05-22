import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

declare let Konva: any;

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

  get canvasWidth(): number {
    return this.canvas.nativeElement.offsetWidth;
  }

  ngAfterViewInit(): void {
    this.stage = new Konva.Stage({
      container: "canvas",
    });

    this.stage.add(this.layer);

    this.imageObj.onload = () => {
      this.konvaImage = new Konva.Image({
        image: this.imageObj,
      });

      this.onCanvasResized();

      // add the shape to the layer
      this.layer.add(this.konvaImage);
    };

    this.imageObj.src = "/assets/images/andrew.jpeg";
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
    this.konvaImage.width(stageWidth);
    this.konvaImage.height(stageHeight);
  }
}
