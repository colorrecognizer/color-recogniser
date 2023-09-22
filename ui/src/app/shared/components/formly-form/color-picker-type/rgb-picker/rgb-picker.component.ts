import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { Slider } from "primeng/slider";
import { ColorPickerChangeService } from "../color-picker-change.service";

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

  constructor(private $colorPickerChange: ColorPickerChangeService) {}

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

    this.$colorPickerChange.colorSubject.subscribe(() => {
      this.rgbRedSlider.el.nativeElement.firstElementChild.lastElementChild.style.background = `#${this.model.color.r
        .toString(16)
        .padStart(2, "0")}0000`;
      this.rgbRedSlider.el.nativeElement.firstElementChild.lastElementChild.style.borderColor =
        "#E8A392";

      this.rgbGreenSlider.el.nativeElement.firstElementChild.lastElementChild.style.background = `#00${this.model.color.g
        .toString(16)
        .padStart(2, "0")}00`;
      this.rgbGreenSlider.el.nativeElement.firstElementChild.lastElementChild.style.borderColor =
        "#8BAF7F";

      this.rgbBlueSlider.el.nativeElement.firstElementChild.lastElementChild.style.background = `#0000${this.model.color.b
        .toString(16)
        .padStart(2, "0")}`;
      this.rgbBlueSlider.el.nativeElement.firstElementChild.lastElementChild.style.borderColor =
        "#8774A6";
    });
  }

  get rgbRed(): number {
    return this.model.color.r;
  }
  set rgbRed(value: number) {
    const r = value.toString(16).padStart(2, "0");
    const g = this.model.color.g.toString(16).padStart(2, "0");
    const b = this.model.color.b.toString(16).padStart(2, "0");
    this.hexChange.emit(`#${r}${g}${b}`);
  }

  get rgbGreen(): number {
    return this.model.color.g;
  }
  set rgbGreen(value: number) {
    const r = this.model.color.r.toString(16).padStart(2, "0");
    const g = value.toString(16).padStart(2, "0");
    const b = this.model.color.b.toString(16).padStart(2, "0");
    this.hexChange.emit(`#${r}${g}${b}`);
  }

  get rgbBlue(): number {
    return this.model.color.b;
  }
  set rgbBlue(value: number) {
    const r = this.model.color.r.toString(16).padStart(2, "0");
    const g = this.model.color.g.toString(16).padStart(2, "0");
    const b = value.toString(16).padStart(2, "0");
    this.hexChange.emit(`#${r}${g}${b}`);
  }

  get clipboardContent(): string {
    return `${this.rgbRed}, ${this.rgbGreen}, ${this.rgbBlue}`;
  }
}
