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
import { Color } from "src/app/shared/auto-generated/apis";
import { ColorUtils } from "src/app/shared/utils";

@Component({
  selector: "app-hsv-picker",
  templateUrl: "./hsv-picker.component.html",
  styleUrls: ["./hsv-picker.component.scss"],
})
export class HsvPickerComponent implements AfterViewInit {
  @ViewChild("hueSlider") hueSlider!: Slider;
  @ViewChild("saturationSlider") saturationSlider!: Slider;
  @ViewChild("hsvValueSlider") hsvValueSlider!: Slider;
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
      this.hsvValueSlider.el.nativeElement.firstElementChild.style.height =
        "1rem";

    this.hueSlider.el.nativeElement.firstElementChild.style.background =
      "linear-gradient(90deg,red,#ff2b00,#f50,#ff8000,#fa0,#ffd500,#ff0,#d4ff00,#af0,#80ff00,#5f0,#2bff00,#0f0,#00ff2b,#0f5,#00ff80,#0fa,#00ffd5,#0ff,#00d4ff,#0af,#007fff,#05f,#002bff,#00f,#2a00ff,#50f,#7f00ff,#a0f,#d400ff,#f0f,#ff00d4,#f0a,#ff0080,#f05,#ff002b)";

    this.hueSlider.el.nativeElement.firstElementChild.firstElementChild.style.borderRadius =
      this.saturationSlider.el.nativeElement.firstElementChild.firstElementChild.style.borderRadius =
      this.hsvValueSlider.el.nativeElement.firstElementChild.firstElementChild.style.borderRadius =
        "4px";

    this.hueSlider.el.nativeElement.firstElementChild.firstElementChild.style.background =
      this.saturationSlider.el.nativeElement.firstElementChild.firstElementChild.style.background =
      this.hsvValueSlider.el.nativeElement.firstElementChild.firstElementChild.style.background =
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

    this.hsvValueSlider.el.nativeElement.firstElementChild.lastElementChild.addEventListener(
      "focus",
      () => {
        this.hsvValueSlider.el.nativeElement.firstElementChild.lastElementChild.style.boxShadow =
          "none";
      }
    );

    this.$colorPickerChange.colorSubject.subscribe(() => {
      const color = new Color({
        red: this.model.color.r,
        green: this.model.color.g,
        blue: this.model.color.b,
      });

      const hsv = ColorUtils.toHSV(color);
      this.hueSlider.el.nativeElement.firstElementChild.lastElementChild.style.background =
        ColorUtils.toHex("hsv", {
          h: hsv.h,
          s: 100,
          v: 100,
        });
      this.hueSlider.el.nativeElement.firstElementChild.lastElementChild.style.borderColor =
        "cyan";

      const sLow = ColorUtils.toHex("hsv", {
        h: hsv.h,
        s: 0,
        v: hsv.v,
      });
      const sHigh = ColorUtils.toHex("hsv", {
        h: hsv.h,
        s: 100,
        v: hsv.v,
      });
      this.saturationSlider.el.nativeElement.firstElementChild.style.background = `linear-gradient(90deg,${sLow}, ${sHigh})`;
      this.saturationSlider.el.nativeElement.firstElementChild.lastElementChild.style.background =
        this.hex;
      this.saturationSlider.el.nativeElement.firstElementChild.lastElementChild.style.borderColor =
        "cyan";

      const vLow = ColorUtils.toHex("hsv", {
        h: hsv.h,
        s: hsv.s,
        v: 0,
      });
      const vHigh = ColorUtils.toHex("hsv", {
        h: hsv.h,
        s: hsv.s,
        v: 100,
      });
      this.hsvValueSlider.el.nativeElement.firstElementChild.style.background = `linear-gradient(90deg,${vLow}, ${vHigh})`;
      this.hsvValueSlider.el.nativeElement.firstElementChild.lastElementChild.style.background =
        this.hex;
      this.hsvValueSlider.el.nativeElement.firstElementChild.lastElementChild.style.borderColor =
        "cyan";
    });
  }

  get hue(): number {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const hsv = ColorUtils.toHSV(color);
    return Math.floor(hsv.h);
  }
  set hue(value: number) {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const hsv = ColorUtils.toHSV(color);
    const newHsv = {
      h: value,
      s: hsv.s,
      v: hsv.v,
    };

    this.hexChange.emit(ColorUtils.toHex("hsv", newHsv));
  }

  get saturation(): number {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const hsv = ColorUtils.toHSV(color);
    return hsv.s;
  }
  set saturation(value: number) {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const hsv = ColorUtils.toHSV(color);
    const newHsv = {
      h: hsv.h,
      s: value,
      v: hsv.v,
    };

    this.hexChange.emit(ColorUtils.toHex("hsv", newHsv));
  }

  get hsvValue(): number {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const hsv = ColorUtils.toHSV(color);
    return hsv.v;
  }
  set hsvValue(value: number) {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const hsv = ColorUtils.toHSV(color);
    const newHsv = {
      h: hsv.h,
      s: hsv.s,
      v: value,
    };

    this.hexChange.emit(ColorUtils.toHex("hsv", newHsv));
  }

  get clipboardContent(): string {
    return `${this.hue + String.fromCharCode(176)}, ${this.saturation}%, ${
      this.hsvValue
    }%`;
  }
}
