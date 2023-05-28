import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { CMYKColor, Color } from "../../auto-generated/apis";
import { ThemeService } from "../../services/theme.service";
import { ColorUtils } from "../../utils";

@Component({
  selector: "app-how-to-mix",
  templateUrl: "./how-to-mix.component.html",
  styleUrls: ["./how-to-mix.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowToMixComponent {
  color: Color;
  textColor: "white" | "black" = "black";

  constructor(
    private $dynamicDialogRef: DynamicDialogRef,
    private $dynamicDialogConfig: DynamicDialogConfig,
    private $theme: ThemeService
  ) {
    this.color = $dynamicDialogConfig.data?.color as Color;
    $theme.theme.subscribe((theme) => {
      this.textColor = theme === "dark-theme" ? "white" : "black";
    });
  }

  get rgbRed(): string {
    return `#${this.color.hexValue?.substring(1, 3)}0000`;
  }

  get rgbGreen(): string {
    return `#00${this.color.hexValue?.substring(3, 5)}00`;
  }

  get rgbBlue(): string {
    return `#0000${this.color.hexValue?.substring(5, 7)}`;
  }

  get rgbRedGreen(): string {
    return `#${this.color.hexValue?.substring(
      1,
      3
    )}${this.color.hexValue?.substring(3, 5)}00`;
  }

  get rgbRedBlue(): string {
    return `#${this.color.hexValue?.substring(
      1,
      3
    )}00${this.color.hexValue?.substring(5, 7)}`;
  }

  get rgbGreenBlue(): string {
    return `#00${this.color.hexValue?.substring(
      3,
      5
    )}${this.color.hexValue?.substring(5, 7)}`;
  }

  get cmykCyan(): string {
    return ColorUtils.toRGB(
      new CMYKColor({
        cyan: this.color.cmyk?.cyan,
        magenta: 0,
        yellow: 0,
        black: 0,
      })
    );
  }
}
