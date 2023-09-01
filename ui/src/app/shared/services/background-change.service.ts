import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Color } from "../auto-generated/apis";
import { ColorUtils } from "../utils";

@Injectable({
  providedIn: "root",
})
export class BackgroundChangeService {
  private _color = "#fff";

  private _colorSubject = new BehaviorSubject<string>(this._color);
  get colorSubject() {
    return this._colorSubject;
  }

  constructor() {
    this._colorSubject.subscribe((color) => {
      document.documentElement.style.setProperty(
        "--background-line-color-1",
        `${color}4d`
      );

      document.documentElement.style.setProperty(
        "--background-line-color-2",
        `${color}3d`
      );

      document.documentElement.style.setProperty(
        "--background-line-color-3",
        `${color}2d`
      );
    });
  }

  setColor(color: Color) {
    this._colorSubject.next(ColorUtils.getColorHex(color));
  }

  refresh() {
    const value = this._colorSubject.value;
    this._colorSubject.next(value);
  }

  clear() {
    // this._colorSubject.next(this._color);
  }

  randomize() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    this._colorSubject.next(color);
  }
}
