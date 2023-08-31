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

  constructor() {
    this._colorSubject.subscribe((color) => {
      document.documentElement.style.setProperty(
        "--background-line-color",
        color
      );
    });
  }

  setColor(color: Color) {
    this._colorSubject.next(`${ColorUtils.getColorHex(color)}4d`);
  }

  clear() {
    this._colorSubject.next(this._color);
  }
}
