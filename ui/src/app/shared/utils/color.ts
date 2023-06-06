import { CMYKColor, Color } from "../auto-generated/apis";

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

type ColorType = "rgb" | "cmyk" | "hsl";

export class ColorUtils {
  static toColor(hex: string): Color {
    const color = new Color({
      red: parseInt(hex.substring(1, 3), 16),
      green: parseInt(hex.substring(3, 5), 16),
      blue: parseInt(hex.substring(5, 7), 16),
      hexValue: hex,
    });

    color.cmyk = ColorUtils.toCMYK(color);
    return color;
  }

  static toCMYK(color: Color): CMYKColor {
    if (color.red === 0 && color.green === 0 && color.blue === 0) {
      return new CMYKColor({
        cyan: 0,
        magenta: 0,
        yellow: 0,
        black: 1,
      });
    }

    const red = color.red || 0;
    const green = color.green || 0;
    const blue = color.blue || 0;

    let computedC = 1 - (red * 1.0) / 255;
    let computedM = 1 - (green * 1.0) / 255;
    let computedY = 1 - (blue * 1.0) / 255;

    const minCMY = Math.min(computedC, Math.min(computedM, computedY));
    computedC = (computedC - minCMY) / (1 - minCMY);
    computedM = (computedM - minCMY) / (1 - minCMY);
    computedY = (computedY - minCMY) / (1 - minCMY);

    return new CMYKColor({
      cyan: computedC,
      magenta: computedM,
      yellow: computedY,
      black: minCMY,
    });
  }

  static toHex(type: ColorType, source: CMYKColor | HSLColor) {
    if (type === "cmyk") {
      source = <CMYKColor>source;
      source.cyan = source.cyan || 0;
      source.magenta = source.magenta || 0;
      source.yellow = source.yellow || 0;
      source.black = source.black || 0;

      const r = Math.round(255 * (1 - source.cyan) * (1 - source.black));
      const g = Math.round(255 * (1 - source.magenta) * (1 - source.black));
      const b = Math.round(255 * (1 - source.yellow) * (1 - source.black));

      return ColorUtils.getColorHex(
        new Color({
          red: r,
          green: g,
          blue: b,
        })
      );
    }

    if (type === "hsl") {
      source = <HSLColor>source;
      const s = source.s / 100;
      const l = source.l / 100;
      const h = source.h;
      const k = (n: number) => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = (n: number) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

      return ColorUtils.getColorHex(
        new Color({
          red: Math.round(255 * f(0)),
          green: Math.round(255 * f(8)),
          blue: Math.round(255 * f(4)),
        })
      );
    }

    return ColorUtils.getColorHex(
      new Color({
        red: 0,
        green: 0,
        blue: 0,
      })
    );
  }

  static getColorHex(color: Color): string {
    const r = color.red?.toString(16).padStart(2, "0");
    const g = color.green?.toString(16).padStart(2, "0");
    const b = color.blue?.toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }

  /**
   * The range of the resulting values is H: [0, 360], S: [0, 100], L: [0, 100].
   * @param color The range of all input parameters is [0, 255].
   */
  static toHSL(color: Color): HSLColor {
    if (
      color.red === null ||
      color.red === undefined ||
      color.green === null ||
      color.green === undefined ||
      color.blue === null ||
      color.blue === undefined
    )
      throw new Error("Invalid color");

    const r = color.red / 255;
    const g = color.green / 255;
    const b = color.blue / 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;

    return {
      h: 60 * h < 0 ? 60 * h + 360 : 60 * h,
      s: 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      l: (100 * (2 * l - s)) / 2,
    };
  }
}
