import { CMYKColor, Color } from "../auto-generated/apis";

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export interface HSVColor {
  h: number;
  s: number;
  v: number;
}

type ColorType = "rgb" | "cmyk" | "hsl" | "hsv";

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
        black: 100,
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
      cyan: Math.round(100 * computedC),
      magenta: Math.round(100 * computedM),
      yellow: Math.round(100 * computedY),
      black: Math.round(100 * minCMY),
    });
  }

  static toHex(type: ColorType, source: CMYKColor | HSLColor | HSVColor) {
    if (type === "cmyk") {
      source = <CMYKColor>source;
      source.cyan = (source.cyan || 0) / 100;
      source.magenta = (source.magenta || 0) / 100;
      source.yellow = (source.yellow || 0) / 100;
      source.black = (source.black || 0) / 100;

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

    if (type === "hsv") {
      source = <HSVColor>source;
      let r, g, b;
      const h = source.h / 360;
      const s = source.s / 100;
      const v = source.v / 100;
      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const p = v * (1 - s);
      const q = v * (1 - f * s);
      const t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0:
          (r = v), (g = t), (b = p);
          break;
        case 1:
          (r = q), (g = v), (b = p);
          break;
        case 2:
          (r = p), (g = v), (b = t);
          break;
        case 3:
          (r = p), (g = q), (b = v);
          break;
        case 4:
          (r = t), (g = p), (b = v);
          break;
        case 5:
          (r = v), (g = p), (b = q);
          break;
      }
      return ColorUtils.getColorHex(
        new Color({
          red: Math.round(255 * (r || 0)),
          green: Math.round(255 * (g || 0)),
          blue: Math.round(255 * (b || 0)),
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

  /**
   * The range of the resulting values is H: [0, 360], S: [0, 100], V: [0, 100].
   * @param color The range of all input parameters is [0, 255].
   */
  static toHSV(color: Color): HSVColor {
    if (
      color.red === null ||
      color.red === undefined ||
      color.green === null ||
      color.green === undefined ||
      color.blue === null ||
      color.blue === undefined
    ) {
      throw new Error("Invalid color");
    }

    const r = color.red;
    const g = color.green;
    const b = color.blue;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b),
      d = max - min,
      s = max === 0 ? 0 : d / max,
      v = max / 255;
    let h;

    switch (max) {
      case min:
        h = 0;
        break;
      case r:
        h = g - b + d * (g < b ? 6 : 0);
        h /= 6 * d;
        break;
      case g:
        h = b - r + d * 2;
        h /= 6 * d;
        break;
      case b:
        h = r - g + d * 4;
        h /= 6 * d;
        break;
    }

    return {
      h: Math.round((h || 0) * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100),
    };
  }
}
