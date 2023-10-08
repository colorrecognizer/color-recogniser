import { Component, Input } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { Color } from "src/app/shared/auto-generated/apis";
import { HowToMixComponent } from "src/app/shared/components/how-to-mix/how-to-mix.component";
import { ColorUtils } from "src/app/shared/utils";

@Component({
  selector: "app-base-palette",
  templateUrl: "./base-palette.component.html",
  styleUrls: ["./base-palette.component.scss"],
})
export class BasePaletteComponent {
  @Input() colors: Color[] = [];
  @Input() showColorPalettesHidden = true;
  @Input() showColorName = false;

  constructor(private $dialog: DialogService) {}

  showHowToMix(color: Color) {
    if (!color) return;

    this.$dialog.open(HowToMixComponent, {
      header: `How to mix color ${color.hexValue}`,
      draggable: true,
      data: {
        color: color,
        showColorPalettesHidden: this.showColorPalettesHidden,
      },
      dismissableMask: true,
    });
  }

  get reversedColors() {
    return this.colors.reverse();
  }

  getTextColorByBackground(color: Color): string {
    return ColorUtils.getTextColorByBackground(color);
  }
}
