import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { Slider } from "primeng/slider";
import { CMYKColor, Color } from "src/app/shared/auto-generated/apis";
import { ColorUtils } from "src/app/shared/utils";
import { ColorPickerChangeService } from "../color-picker-change.service";

@Component({
  selector: "app-cmyk-picker",
  templateUrl: "./cmyk-picker.component.html",
  styleUrls: ["./cmyk-picker.component.scss"],
})
export class CmykPickerComponent implements AfterViewInit {
  @ViewChild("cmykCyanSlider") cmykCyanSlider!: Slider;
  @ViewChild("cmykMagentaSlider") cmykMagentaSlider!: Slider;
  @ViewChild("cmykYellowSlider") cmykYellowSlider!: Slider;
  @ViewChild("cmykBlackSlider") cmykBlackSlider!: Slider;
  @Input() hex!: string;
  @Output() hexChange = new EventEmitter<string>();

  @Input() model: any;

  constructor(private $colorPickerChange: ColorPickerChangeService) {}

  get isBlack() {
    return this.hex === "#000000";
  }

  ngAfterViewInit(): void {
    this.cmykCyanSlider.el.nativeElement.firstElementChild.style.height =
      this.cmykMagentaSlider.el.nativeElement.firstElementChild.style.height =
      this.cmykYellowSlider.el.nativeElement.firstElementChild.style.height =
      this.cmykBlackSlider.el.nativeElement.firstElementChild.style.height =
        "1rem";

    this.cmykCyanSlider.el.nativeElement.firstElementChild.style.background =
      "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(0,255,255,1) 100%)";
    this.cmykMagentaSlider.el.nativeElement.firstElementChild.style.background =
      "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,0,255,1) 100%)";
    this.cmykYellowSlider.el.nativeElement.firstElementChild.style.background =
      "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,0,1) 100%)";
    this.cmykBlackSlider.el.nativeElement.firstElementChild.style.background =
      "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 100%)";

    this.cmykCyanSlider.el.nativeElement.firstElementChild.firstElementChild.style.borderRadius =
      this.cmykMagentaSlider.el.nativeElement.firstElementChild.firstElementChild.style.borderRadius =
      this.cmykYellowSlider.el.nativeElement.firstElementChild.firstElementChild.style.borderRadius =
      this.cmykBlackSlider.el.nativeElement.firstElementChild.firstElementChild.style.borderRadius =
        "4px";

    this.cmykCyanSlider.el.nativeElement.firstElementChild.firstElementChild.style.background =
      this.cmykMagentaSlider.el.nativeElement.firstElementChild.firstElementChild.style.background =
      this.cmykYellowSlider.el.nativeElement.firstElementChild.firstElementChild.style.background =
      this.cmykBlackSlider.el.nativeElement.firstElementChild.firstElementChild.style.background =
        "none";

    this.cmykCyanSlider.el.nativeElement.firstElementChild.lastElementChild.addEventListener(
      "focus",
      () => {
        this.cmykCyanSlider.el.nativeElement.firstElementChild.lastElementChild.style.boxShadow =
          "none";
      }
    );

    this.cmykMagentaSlider.el.nativeElement.firstElementChild.lastElementChild.addEventListener(
      "focus",
      () => {
        this.cmykMagentaSlider.el.nativeElement.firstElementChild.lastElementChild.style.boxShadow =
          "none";
      }
    );

    this.cmykYellowSlider.el.nativeElement.firstElementChild.lastElementChild.addEventListener(
      "focus",
      () => {
        this.cmykYellowSlider.el.nativeElement.firstElementChild.lastElementChild.style.boxShadow =
          "none";
      }
    );

    this.cmykBlackSlider.el.nativeElement.firstElementChild.lastElementChild.addEventListener(
      "focus",
      () => {
        this.cmykBlackSlider.el.nativeElement.firstElementChild.lastElementChild.style.boxShadow =
          "none";
      }
    );

    this.$colorPickerChange.colorSubject.subscribe(() => {
      const color = new Color({
        red: this.model.color.r,
        green: this.model.color.g,
        blue: this.model.color.b,
      });

      const cmyk = ColorUtils.toCMYK(color);
      this.cmykCyanSlider.el.nativeElement.firstElementChild.lastElementChild.style.background =
        ColorUtils.toHex(
          "cmyk",
          new CMYKColor({
            cyan: cmyk.cyan,
            magenta: 0,
            yellow: 0,
            black: 0,
          })
        );
      this.cmykCyanSlider.el.nativeElement.firstElementChild.lastElementChild.style.borderColor =
        "#5BBDBC";

      this.cmykMagentaSlider.el.nativeElement.firstElementChild.lastElementChild.style.background =
        ColorUtils.toHex(
          "cmyk",
          new CMYKColor({
            cyan: 0,
            magenta: cmyk.magenta,
            yellow: 0,
            black: 0,
          })
        );
      this.cmykMagentaSlider.el.nativeElement.firstElementChild.lastElementChild.style.borderColor =
        "#7C5079";

      this.cmykYellowSlider.el.nativeElement.firstElementChild.lastElementChild.style.background =
        ColorUtils.toHex(
          "cmyk",
          new CMYKColor({
            cyan: 0,
            magenta: 0,
            yellow: cmyk.yellow,
            black: 0,
          })
        );
      this.cmykYellowSlider.el.nativeElement.firstElementChild.lastElementChild.style.borderColor =
        "#C6C188";

      this.cmykBlackSlider.el.nativeElement.firstElementChild.lastElementChild.style.background =
        ColorUtils.toHex(
          "cmyk",
          new CMYKColor({
            cyan: 0,
            magenta: 0,
            yellow: 0,
            black: cmyk.black,
          })
        );
      this.cmykBlackSlider.el.nativeElement.firstElementChild.lastElementChild.style.borderColor =
        "#303030";
    });
  }

  get cmykCyan(): number {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const cmyk = ColorUtils.toCMYK(color);
    return cmyk.cyan || 0;
  }
  set cmykCyan(value: number) {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const cmyk = ColorUtils.toCMYK(color);

    let m = cmyk.magenta,
      y = cmyk.yellow;

    if (value && cmyk.magenta && cmyk.yellow) {
      if (cmyk.magenta > cmyk.yellow) {
        m = cmyk.magenta;
        y = 0;
      } else {
        m = 0;
        y = cmyk.yellow;
      }
    }

    const newCmyk = new CMYKColor({
      cyan: value,
      magenta: m,
      yellow: y,
      black: cmyk.black === 100 ? 50 : cmyk.black,
    });

    this.hexChange.emit(ColorUtils.toHex("cmyk", newCmyk));
  }

  get cmykMagenta(): number {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const cmyk = ColorUtils.toCMYK(color);
    return cmyk.magenta || 0;
  }
  set cmykMagenta(value: number) {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const cmyk = ColorUtils.toCMYK(color);
    let c = cmyk.cyan,
      y = cmyk.yellow;

    if (value && cmyk.cyan && cmyk.yellow) {
      if (cmyk.cyan > cmyk.yellow) {
        c = cmyk.cyan;
        y = 0;
      } else {
        c = 0;
        y = cmyk.yellow;
      }
    }

    const newCmyk = new CMYKColor({
      cyan: c,
      magenta: value,
      yellow: y,
      black: cmyk.black === 100 ? 50 : cmyk.black,
    });

    this.hexChange.emit(ColorUtils.toHex("cmyk", newCmyk));
  }

  get cmykYellow(): number {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const cmyk = ColorUtils.toCMYK(color);
    return cmyk.yellow || 0;
  }
  set cmykYellow(value: number) {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const cmyk = ColorUtils.toCMYK(color);
    let c = cmyk.cyan,
      m = cmyk.magenta;

    if (value && cmyk.cyan && cmyk.magenta) {
      if (cmyk.cyan > cmyk.magenta) {
        c = cmyk.cyan;
        m = 0;
      } else {
        c = 0;
        m = cmyk.magenta;
      }
    }

    const newCmyk = new CMYKColor({
      cyan: c,
      magenta: m,
      yellow: value,
      black: cmyk.black === 100 ? 50 : cmyk.black,
    });

    this.hexChange.emit(ColorUtils.toHex("cmyk", newCmyk));
  }

  get cmykBlack(): number {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const cmyk = ColorUtils.toCMYK(color);
    return cmyk.black || 0;
  }
  set cmykBlack(value: number) {
    const color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });

    const cmyk = ColorUtils.toCMYK(color);
    const newCmyk = new CMYKColor({
      cyan: cmyk.cyan,
      magenta: cmyk.magenta,
      yellow: cmyk.yellow,
      black: value,
    });

    this.hexChange.emit(ColorUtils.toHex("cmyk", newCmyk));
  }

  get clipboardContent(): string {
    return `${this.cmykCyan}%, ${this.cmykMagenta}%, ${this.cmykYellow}%, ${this.cmykBlack}%`;
  }
}
