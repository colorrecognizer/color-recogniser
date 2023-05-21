import { Component } from "@angular/core";
import { FieldType, FieldTypeConfig } from "@ngx-formly/core";

@Component({
  selector: "app-color-picker-type",
  templateUrl: "./color-picker-type.component.html",
  styleUrls: ["./color-picker-type.component.scss"],
})
export class ColorPickerTypeComponent extends FieldType<FieldTypeConfig> {
  get hex(): string {
    const r = this.model.color.r.toString(16).padStart(2, "0");
    const g = this.model.color.g.toString(16).padStart(2, "0");
    const b = this.model.color.b.toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeColor(event: any) {
    if (!event.value) return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onHexValueEntered(event: any) {
    if (!event.target?.value) return;

    let hex = event.target.value as string;
    if (hex.match("^#{0,1}(?:[0-9a-fA-F]{3}){2}$")) {
      if (hex.length === 4 || hex.length === 7) hex = hex.substring(1);

      let r, g, b;
      if (hex.length === 3) {
        r = parseInt(hex.substring(0, 1), 16);
        g = parseInt(hex.substring(1, 2), 16);
        b = parseInt(hex.substring(2, 3), 16);
      } else {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      }

      this.model.color = {
        r: r,
        g: g,
        b: b,
      };
    }
  }
}
