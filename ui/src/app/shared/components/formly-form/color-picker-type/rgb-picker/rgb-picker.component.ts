import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { Slider } from "primeng/slider";

@Component({
  selector: "app-rgb-picker",
  templateUrl: "./rgb-picker.component.html",
  styleUrls: ["./rgb-picker.component.scss"],
})
export class RgbPickerComponent implements AfterViewInit {
  @ViewChild("rgbRedSlider") rgbRedSlider!: Slider;
  @ViewChild("rgbGreenSlider") rgbGreenSlider!: Slider;
  @ViewChild("rgbBlueSlider") rgbBlueSlider!: Slider;
  @Input() hex!: string;
  @Output() hexChange = new EventEmitter<string>();

  @Input() model: any;

  ngAfterViewInit(): void {
    this.rgbRedSlider.el.nativeElement.firstElementChild.style.height =
      this.rgbGreenSlider.el.nativeElement.firstElementChild.style.height =
      this.rgbBlueSlider.el.nativeElement.firstElementChild.style.height =
        "1rem";

    this.rgbRedSlider.el.nativeElement.firstElementChild.style.background =
      "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,0,0,1) 100%)";
    this.rgbGreenSlider.el.nativeElement.firstElementChild.style.background =
      "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,255,0,1) 100%)";
    this.rgbBlueSlider.el.nativeElement.firstElementChild.style.background =
      "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,255,1) 100%)";

    this.rgbRedSlider.el.nativeElement.firstElementChild.firstElementChild.style.borderRadius =
      this.rgbGreenSlider.el.nativeElement.firstElementChild.firstElementChild.style.borderRadius =
      this.rgbBlueSlider.el.nativeElement.firstElementChild.firstElementChild.style.borderRadius =
        "4px";

    this.rgbRedSlider.el.nativeElement.firstElementChild.firstElementChild.style.background =
      this.rgbGreenSlider.el.nativeElement.firstElementChild.firstElementChild.style.background =
      this.rgbBlueSlider.el.nativeElement.firstElementChild.firstElementChild.style.background =
        "none";

    this.rgbRedSlider.el.nativeElement.firstElementChild.lastElementChild.addEventListener(
      "focus",
      () => {
        this.rgbRedSlider.el.nativeElement.firstElementChild.lastElementChild.style.boxShadow =
          "none";
      }
    );

    this.rgbGreenSlider.el.nativeElement.firstElementChild.lastElementChild.addEventListener(
      "focus",
      () => {
        this.rgbGreenSlider.el.nativeElement.firstElementChild.lastElementChild.style.boxShadow =
          "none";
      }
    );

    this.rgbBlueSlider.el.nativeElement.firstElementChild.lastElementChild.addEventListener(
      "focus",
      () => {
        this.rgbBlueSlider.el.nativeElement.firstElementChild.lastElementChild.style.boxShadow =
          "none";
      }
    );

    this.rgbRedSlider.el.nativeElement.firstElementChild.lastElementChild.style.background = `#${this.model.color.r
      .toString(16)
      .padStart(2, "0")}0000`;
    this.rgbGreenSlider.el.nativeElement.firstElementChild.lastElementChild.style.background = `#00${this.model.color.r
      .toString(16)
      .padStart(2, "0")}00`;
    this.rgbBlueSlider.el.nativeElement.firstElementChild.lastElementChild.style.background = `#0000${this.model.color.r
      .toString(16)
      .padStart(2, "0")}`;

    this.rgbRedSlider.el.nativeElement.firstElementChild.lastElementChild.style.borderColor =
      "red";
    this.rgbGreenSlider.el.nativeElement.firstElementChild.lastElementChild.style.borderColor =
      "green";
    this.rgbBlueSlider.el.nativeElement.firstElementChild.lastElementChild.style.borderColor =
      "blue";
  }

  get rgbRed(): number {
    return this.model.color.r;
  }
  set rgbRed(value: number) {
    const r = value.toString(16).padStart(2, "0");
    const g = this.model.color.g.toString(16).padStart(2, "0");
    const b = this.model.color.b.toString(16).padStart(2, "0");
    this.hexChange.emit(`#${r}${g}${b}`);

    this.rgbRedSlider.el.nativeElement.firstElementChild.lastElementChild.style.background = `#${this.model.color.r
      .toString(16)
      .padStart(2, "0")}0000`;
    this.rgbRedSlider.el.nativeElement.firstElementChild.lastElementChild.style.borderColor =
      "red";
  }

  get rgbGreen(): number {
    return this.model.color.g;
  }
  set rgbGreen(value: number) {
    const r = this.model.color.r.toString(16).padStart(2, "0");
    const g = value.toString(16).padStart(2, "0");
    const b = this.model.color.b.toString(16).padStart(2, "0");
    this.hexChange.emit(`#${r}${g}${b}`);

    this.rgbGreenSlider.el.nativeElement.firstElementChild.lastElementChild.style.background = `#00${this.model.color.g
      .toString(16)
      .padStart(2, "0")}00`;
    this.rgbGreenSlider.el.nativeElement.firstElementChild.lastElementChild.style.borderColor =
      "green";
  }

  get rgbBlue(): number {
    return this.model.color.b;
  }
  set rgbBlue(value: number) {
    const r = this.model.color.r.toString(16).padStart(2, "0");
    const g = this.model.color.g.toString(16).padStart(2, "0");
    const b = value.toString(16).padStart(2, "0");
    this.hexChange.emit(`#${r}${g}${b}`);

    this.rgbBlueSlider.el.nativeElement.firstElementChild.lastElementChild.style.background = `#0000${this.model.color.r
      .toString(16)
      .padStart(2, "0")}`;
    this.rgbBlueSlider.el.nativeElement.firstElementChild.lastElementChild.style.borderColor =
      "blue";
  }
}
