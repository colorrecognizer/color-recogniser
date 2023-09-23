import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { Slider } from "primeng/slider";
import { Color } from "src/app/shared/auto-generated/apis";
import { ColorUtils } from "src/app/shared/utils";
import { ColorPickerChangeService } from "../color-picker-change.service";

@Component({
  selector: "app-hsl-picker",
  templateUrl: "./hsl-picker.component.html",
  styleUrls: ["./hsl-picker.component.scss"],
})
export class HslPickerComponent implements AfterViewInit {
  @ViewChild("hueSlider") hueSlider!: Slider;
  @ViewChild("saturationSlider") saturationSlider!: Slider;
  @ViewChild("hslValueSlider") hslValueSlider!: Slider;
  @Input() hex!: string;
  @Output() hexChange = new EventEmitter<string>();

  @Input() model: any;

  constructor(private $colorPickerChange: ColorPickerChangeService) {}

  get isBlack() {
    return this.hex === "#000000";
  }

  ngAfterViewInit(): void {
    this.hueSlider.el.nativeElement.firstElementChild.style.height =
      this.saturationSlider.el.nativeElement.firstElementChild.style.height =
      this.hslValueSlider.el.nativeElement.firstElementChild.style.height =
        "1rem";

    this.hueSlider.el.nativeElement.firstElementChild.style.background =
      "linear-gradient(90deg,red,#ff2b00,#f50,#ff8000,#fa0,#ffd500,#ff0,#d4ff00,#af0,#80ff00,#5f0,#2bff00,#0f0,#00ff2b,#0f5,#00ff80,#0fa,#00ffd5,#0ff,#00d4ff,#0af,#007fff,#05f,#002bff,#00f,#2a00ff,#50f,#7f00ff,#a0f,#d400ff,#f0f,#ff00d4,#f0a,#ff0080,#f05,#ff002b)";

    this.hueSlider.el.nativeElement.firstElementChild.firstElementChild.style.borderRadius =
      this.saturationSlider.el.nativeElement.firstElementChild.firstElementChild.style.borderRadius =
      this.hslValueSlider.el.nativeElement.firstElementChild.firstElementChild.style.borderRadius =
        "4px";

    this.hueSlider.el.nativeElement.firstElementChild.firstElementChild.style.background =
      this.saturationSlider.el.nativeElement.firstElementChild.firstElementChild.style.background =
      this.hslValueSlider.el.nativeElement.firstElementChild.firstElementChild.style.background =
        "none";

    this.hueSlider.el.nativeElement.firstElementChild.lastElementChild.addEventListener(
      "focus",
      () => {
        this.hueSlider.el.nativeElement.firstElementChild.lastElementChild.style.boxShadow =
          "none";
      }
    );

    this.saturationSlider.el.nativeElement.firstElementChild.lastElementChild.addEventListener(
      "focus",
      () => {
        this.saturationSlider.el.nativeElement.firstElementChild.lastElementChild.style.boxShadow =
          "none";
      }
    );

    this.hslValueSlider.el.nativeElement.firstElementChild.lastElementChild.addEventListener(
      "focus",
      () => {
        this.hslValueSlider.el.nativeElement.firstElementChild.lastElementChild.style.boxShadow =
          "none";
      }
    );

    this.$colorPickerChange.colorSubject.subscribe(() => {
      const color = new Color({
        red: this.model.color.r,
        green: this.model.color.g,
        blue: this.model.color.b,
      });

      const hsl = ColorUtils.toHSL(color);
      const borderColor = ColorUtils.toHex("hsl", {
        h: (hsl.h + 180) % 360,
        s: 100,
        l: 50,
      });

      this.hueSlider.el.nativeElement.firstElementChild.lastElementChild.style.background =
        ColorUtils.toHex("hsl", {
          h: hsl.h,
          s: 100,
          l: 50,
        });
      this.hueSlider.el.nativeElement.firstElementChild.lastElementChild.style.borderColor =
        borderColor;

      const sLow = ColorUtils.toHex("hsl", {
        h: hsl.h,
        s: 0,
        l: hsl.l,
      });
      const sHigh = ColorUtils.toHex("hsl", {
        h: hsl.h,
        s: 100,
        l: hsl.l,
      });
      this.saturationSlider.el.nativeElement.firstElementChild.style.background = `linear-gradient(90deg,${sLow}, ${sHigh})`;
      this.saturationSlider.el.nativeElement.firstElementChild.lastElementChild.style.background =
        ColorUtils.getColorHex(color);
      this.saturationSlider.el.nativeElement.firstElementChild.lastElementChild.style.borderColor =
        borderColor;

      const lLow = ColorUtils.toHex("hsl", {
        h: hsl.h,
        s: 100,
        l: 0,
      });
      const lHigh = ColorUtils.toHex("hsl", {
        h: hsl.h,
        s: 100,
        l: 100,
      });
      this.hslValueSlider.el.nativeElement.firstElementChild.style.background = `linear-gradient(90deg,${lLow}, ${lHigh})`;
      this.hslValueSlider.el.nativeElement.firstElementChild.lastElementChild.style.background =
        ColorUtils.toHex("hsl", {
          h: 0,
          s: 0,
          l: hsl.l,
        });

      this.hslValueSlider.el.nativeElement.firstElementChild.lastElementChild.style.borderColor =
        borderColor;
    });
  }

  get hue(): number {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const hsl = ColorUtils.toHSL(color);
    return Math.floor(hsl.h);
  }
  set hue(value: number) {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const hsl = ColorUtils.toHSL(color);
    let s = hsl.s,
      l = hsl.l;
    if (hsl.s === 0) s = 100;
    if (hsl.l === 0) l = 50;

    const newHsl = {
      h: value,
      s: s,
      l: l,
    };

    this.hexChange.emit(ColorUtils.toHex("hsl", newHsl));
  }

  get saturation(): number {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const hsl = ColorUtils.toHSL(color);
    return hsl.s;
  }
  set saturation(value: number) {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const hsl = ColorUtils.toHSL(color);
    if (value && hsl.l === 0) {
      hsl.l = 50;
    }

    const newHsl = {
      h: hsl.h,
      s: value,
      l: hsl.l,
    };

    this.hexChange.emit(ColorUtils.toHex("hsl", newHsl));
  }

  get hslValue(): number {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const hsl = ColorUtils.toHSL(color);
    return hsl.l;
  }
  set hslValue(value: number) {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const hsl = ColorUtils.toHSL(color);
    const newHsl = {
      h: hsl.h,
      s: hsl.s,
      l: value,
    };

    this.hexChange.emit(ColorUtils.toHex("hsl", newHsl));
  }

  get clipboardContent(): string {
    return `${this.hue + String.fromCharCode(176)}, ${this.saturation}%, ${
      this.hslValue
    }%`;
  }
}
