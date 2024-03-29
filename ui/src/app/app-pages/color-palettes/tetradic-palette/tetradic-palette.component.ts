import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { Color } from "src/app/shared/auto-generated/apis";
import { ColorUtils } from "src/app/shared/utils";

@Component({
  selector: "app-tetradic-palette",
  templateUrl: "./tetradic-palette.component.html",
  styleUrls: ["./tetradic-palette.component.scss"],
})
export class TetradicPaletteComponent {
  @Input() cardCss = "";
  colors: Color[] = [];
  @Input() label = "Analogous";

  private _color: Color = new Color({
    red: 0,
    green: 0,
    blue: 0,
  });

  @Input() set color(value: Color) {
    this._color = value;
    this.refresh();
  }

  get color(): Color {
    return this._color;
  }

  private _hueVariation = 90;
  @Input() set hueVariation(value: number) {
    this._hueVariation = value;
    this.refresh();
  }

  get hueVariation(): number {
    return this._hueVariation;
  }

  @ViewChild("card") card!: ElementRef<HTMLDivElement>;

  /// Methods
  constructor() {}

  refresh() {
    this.colors.length = 0;

    for (let i = 0; i < 4; ++i) {
      const hsl = ColorUtils.toHSL(this.color);

      let delta = 0;
      if (i === 1) delta = this.hueVariation;
      else if (i === 2) delta = 180;
      else if (i === 3) delta = 180 + this.hueVariation;

      const hex = ColorUtils.toHex("hsl", {
        h: (360 + ((hsl.h + delta) % 360)) % 360,
        s: hsl.s,
        l: hsl.l,
      });

      this.colors.push(ColorUtils.toColor(hex));
    }
  }
}
