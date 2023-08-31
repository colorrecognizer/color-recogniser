import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Color } from "../auto-generated/apis";
import { ColorUtils } from "../utils";

@Injectable({
  providedIn: "root",
})
export class BackgroundChangeService {
  private _color = "#ffffff1d";

  private _colorSubject = new BehaviorSubject<string>(this._color);

  constructor() {
    this._colorSubject.subscribe((color) => {
      document.documentElement.style.setProperty(
        "--background-line-color",
        color
      );
    });
  }

  setColor(color: Color) {
    this._colorSubject.next(`${ColorUtils.getColorHex(color)}1d`);
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

    this._colorSubject.next(`${color}1d`);
  }
}
