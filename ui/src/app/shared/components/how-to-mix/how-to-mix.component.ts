import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { CMYKColor, Color } from "../../auto-generated/apis";
import { ThemeService } from "../../services/theme.service";
import { ColorUtils, RouteEnum, Utils } from "../../utils";
import { Router } from "@angular/router";

@Component({
  selector: "app-how-to-mix",
  templateUrl: "./how-to-mix.component.html",
  styleUrls: ["./how-to-mix.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowToMixComponent {
  color: Color;
  textColor: "white" | "black" = "black";
  showColorPalettesHidden = false;

  constructor(
    $dynamicDialogConfig: DynamicDialogConfig,
    $theme: ThemeService,
    private $router: Router
  ) {
    this.color = $dynamicDialogConfig.data?.color as Color;
    this.showColorPalettesHidden =
      !!$dynamicDialogConfig.data?.showColorPalettesHidden;

    $theme.theme.subscribe((theme) => {
      this.textColor = theme === "dark-theme" ? "white" : "black";
    });
  }

  navigateToCMYK() {
    Utils.openUrlInNewWindow(this.$router, [RouteEnum.CMYKAnimation]);
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
    return ColorUtils.toHex(
      "cmyk",
      new CMYKColor({
        cyan: this.color.cmyk?.cyan,
        magenta: 0,
        yellow: 0,
        black: 0,
      })
    );
  }

  get cmykMagenta(): string {
    return ColorUtils.toHex(
      "cmyk",
      new CMYKColor({
        cyan: 0,
        magenta: this.color.cmyk?.magenta,
        yellow: 0,
        black: 0,
      })
    );
  }

  get cmykYellow(): string {
    return ColorUtils.toHex(
      "cmyk",
      new CMYKColor({
        cyan: 0,
        magenta: 0,
        yellow: this.color.cmyk?.yellow,
        black: 0,
      })
    );
  }

  get cmykBlack(): string {
    return ColorUtils.toHex(
      "cmyk",
      new CMYKColor({
        cyan: 0,
        magenta: 0,
        yellow: 0,
        black: this.color.cmyk?.black,
      })
    );
  }

  get cyanPercentage(): number {
    const color = this.color.cmyk?.cyan || 0;
    return color;
  }

  get magentaPercentage(): number {
    const color = this.color.cmyk?.magenta || 0;
    return color;
  }

  get yellowPercentage(): number {
    const color = this.color.cmyk?.yellow || 0;
    return color;
  }

  get blackPercentage(): number {
    const color = this.color.cmyk?.black || 0;
    return color;
  }

  showColorPalettes() {
    Utils.openUrlInNewWindow(this.$router, [
      RouteEnum.ColorPalettes,
      this.color.hexValue,
    ]);
  }
}
