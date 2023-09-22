import { AfterViewInit, Component, ViewEncapsulation } from "@angular/core";
import { FieldType, FieldTypeConfig } from "@ngx-formly/core";
import { ColorPickerChangeService } from "./color-picker-change.service";

@Component({
  selector: "app-color-picker-type",
  templateUrl: "./color-picker-type.component.html",
  styleUrls: ["./color-picker-type.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ColorPickerTypeComponent
  extends FieldType<FieldTypeConfig>
  implements AfterViewInit
{
  constructor(private $colorPickerChange: ColorPickerChangeService) {
    super();
  }

  ngAfterViewInit(): void {
    this.$colorPickerChange.colorSubject.subscribe(() => {
      let textColor: string;

      // Counting the perceptive luminance - human eye favors green color...
      const luminance =
        (0.299 * this.model.color.r +
          0.587 * this.model.color.g +
          0.114 * this.model.color.b) /
        255;

      if (luminance > 0.5) textColor = "#212529"; // bright colors - black font
      else textColor = "rgba(255, 255, 255, 0.87)"; // dark colors - white font

      document
        .querySelectorAll("app-color-picker-type p-fieldset legend")
        .forEach((x) => {
          (x as any).style.background = this.hex;

          if ((x as any).firstElementChild)
            (x as any).firstElementChild.style.color = textColor;
        });
    });
  }

  get hex(): string {
    const r = this.model.color.r.toString(16).padStart(2, "0");
    const g = this.model.color.g.toString(16).padStart(2, "0");
    const b = this.model.color.b.toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }

  set hex(value: string) {
    if (!value) return;

    if (value.match("^#{0,1}(?:[0-9a-fA-F]{3}){2}$")) {
      if (value.length === 7) value = value.substring(1);
      this.model.color = {
        r: parseInt(value.substring(0, 2), 16),
        g: parseInt(value.substring(2, 4), 16),
        b: parseInt(value.substring(4, 6), 16),
      };
    }

    this.$colorPickerChange.setColor(value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeColor(event: any) {
    if (!event.value) return;
  }
}
