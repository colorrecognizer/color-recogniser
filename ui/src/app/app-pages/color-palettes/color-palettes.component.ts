import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { Color } from "src/app/shared/auto-generated/apis";
import { ColorPickerTypeComponent } from "src/app/shared/modules/formly-form/color-picker-type/color-picker-type.component";

@Component({
  selector: "app-color-palettes",
  templateUrl: "./color-palettes.component.html",
  styleUrls: ["./color-palettes.component.scss"],
})
export class ColorPalettesComponent {
  form = new FormGroup({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any = {
    color: {
      r: 0,
      g: 34,
      b: 238,
    },
  };

  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: "color",
      type: ColorPickerTypeComponent,
      props: {
        required: true,
      },
    },
  ];

  readonly cardCss = "surface-card p-2 lg:p-5 shadow-2 border-round";
  color = new Color({
    red: this.model.color.r,
    green: this.model.color.g,
    blue: this.model.color.b,
  });

  /// Methods
  constructor(private $title: Title) {
    $title.setTitle("Color Palettes");
  }

  submit() {
    this.color = new Color({
      red: this.model.color.r,
      green: this.model.color.g,
      blue: this.model.color.b,
    });
  }
}
