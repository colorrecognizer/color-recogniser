import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Color } from "src/app/shared/auto-generated/apis";
import { ColorUtils, HSLColor } from "src/app/shared/utils";

@Component({
  selector: "app-lightening-monochromatic-palette",
  templateUrl: "./lightening-monochromatic-palette.component.html",
  styleUrls: ["./lightening-monochromatic-palette.component.scss"],
})
export class LighteningMonochromaticPaletteComponent implements OnInit{
  @Input() cardCss = "";
  @Input() isDarkening = false;

  private _color: Color = new Color({
    red: 0,
    green: 0,
    blue: 0,
  });

  private hsl: HSLColor = ColorUtils.toHSL(this._color);
  @Input() set color(value: Color) {
    this._color = value;
    this.hsl = ColorUtils.toHSL(value);
  }

  get color(): Color {
    return this._color;
  }

  steps = 5;
  @ViewChild("card") card!: ElementRef<HTMLDivElement>;
  colors: Color[] = [];

  /// Methods
  constructor() {
  }

  ngOnInit(): void {
    this.changeSteps();
  }

  private getColor(step: number) {
    const result = ColorUtils.toHex("hsl", {
      h: this.hsl.h,
      s: this.hsl.s,
      l: this.isDarkening
        ? this.hsl.l - (this.hsl.l * step) / this.steps
        : this.hsl.l + ((100 - this.hsl.l) * step) / this.steps,
    });

    return result;
  }

  changeSteps() {
    const res = [];
    for (let i = 0; i < this.steps; ++i) {
      res.push(ColorUtils.toColor(this.getColor(i)));
    }

    this.colors = res;
  }
}
