import { Component, Input } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { Color } from "src/app/shared/auto-generated/apis";
import { HowToMixComponent } from "src/app/shared/modules/how-to-mix/how-to-mix.component";
import { ColorUtils, HSLColor } from "src/app/shared/utils";

@Component({
  selector: "app-lightening-monochromatic-palette",
  templateUrl: "./lightening-monochromatic-palette.component.html",
  styleUrls: ["./lightening-monochromatic-palette.component.scss"],
})
export class LighteningMonochromaticPaletteComponent {
  @Input() cardCss = "";

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

  /// Methods
  constructor(private $dialog: DialogService) {}

  getColor(step: number) {
    const result = ColorUtils.toHex("hsl", {
      h: this.hsl.h,
      s: this.hsl.s,
      l: this.hsl.l + ((100 - this.hsl.l) * step) / this.steps,
    });

    return result;
  }

  showHowToMix(hex: any) {
    if (!hex) return;
    const color = ColorUtils.toColor(hex);

    this.$dialog.open(HowToMixComponent, {
      header: `How to mix color ${hex}`,
      draggable: true,
      data: {
        color: color,
      },
    });
  }
}
