import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ColorPickerChangeService {
  colorSubject = new BehaviorSubject<string>("#000000");

  constructor() {}

  setColor(color: string) {
    this.colorSubject.next(color);
  }
}
