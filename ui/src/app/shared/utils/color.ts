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

      const c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2;

      let r = 0,
        g = 0,
        b = 0;

      if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
      } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
      } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
      } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
      } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
      } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
      }
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);

      return ColorUtils.getColorHex(
        new Color({
          red: r,
          green: g,
          blue: b,
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
    // Find greatest and smallest channel values
    const cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin;

    let h = 0,
      s = 0,
      l = 0;

    // Calculate hue
    // No difference
    if (delta == 0) h = 0;
    // Red is max
    else if (cmax == r) h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g) h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return {
      h: h,
      s: Math.round(s),
      l: Math.round(l),
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

  static getTextColorByBackground(backgroundColor: Color): string {
    // Counting the perceptive luminance - human eye favors green color...
    const luminance =
      (0.299 * (backgroundColor.red || 0) +
        0.587 * (backgroundColor.green || 0) +
        0.114 * (backgroundColor.blue || 0)) /
      255;

    if (luminance > 0.5) return "#212529"; // bright colors - black font
    else return "rgba(255, 255, 255, 0.87)"; // dark colors - white font
  }
}
