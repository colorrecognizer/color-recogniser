import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { Color } from "src/app/shared/auto-generated/apis";
import { ColorUtils, HSLColor } from "src/app/shared/utils";

@Component({
  selector: "app-universal-gradient-palette",
  templateUrl: "./universal-gradient-palette.component.html",
  styleUrls: ["./universal-gradient-palette.component.scss"],
})
export class UniversalGradientPaletteComponent {
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

  /// Methods
  constructor() {}
}
