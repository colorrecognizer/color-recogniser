import { CMYKColor, Color } from "../auto-generated/apis";

export class ColorUtils {
  static toRGB(cmyk: CMYKColor) {
    if (!cmyk.cyan || !cmyk.magenta || !cmyk.yellow || !cmyk.black) {
      return "#000000";
    }

    const r = Math.round(255 * (1 - cmyk.cyan) * (1 - cmyk.black));
    const g = Math.round(255 * (1 - cmyk.magenta) * (1 - cmyk.black));
    const b = Math.round(255 * (1 - cmyk.yellow) * (1 - cmyk.black));

    return ColorUtils.getColorHex(
      new Color({
        red: r,
        green: g,
        blue: b,
      })
    );
  }

  static getColorHex(color: Color): string {
    const r = color.red?.toString(16).padStart(2, "0");
    const g = color.green?.toString(16).padStart(2, "0");
    const b = color.blue?.toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }
}
