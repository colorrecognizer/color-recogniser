import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { MessageService } from "primeng/api";
import { finalize, map } from "rxjs";
import {
  Color,
  ColorApi,
} from "src/app/shared/auto-generated/apis";
import { ColorPickerTypeComponent } from "src/app/shared/modules/formly-form/color-picker-type/color-picker-type.component";

@Component({
  selector: "app-color-management",
  templateUrl: "./color-management.component.html",
  styleUrls: ["./color-management.component.scss"],
})
export class ColorManagementComponent implements OnInit {
  form = new FormGroup({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any = {
    color: {
      r: 0,
      g: 0,
      b: 0,
    },
  };

  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: "name",
      type: "input",
      props: {
        label: "Color name",
        placeholder: "Red",
        required: true,
        pattern: "^([A-Z][a-z]*)+( {1}([A-Z][a-z]*))*$",
      },
      validation: {
        messages: {
          pattern: () => "Invalid color name.",
        },
      },
    },
    {
      key: "color",
      type: ColorPickerTypeComponent,
      props: {
        required: true,
      },
    },
  ];

  colors: Color[] = [];

  constructor(private $colorApi: ColorApi, private $message: MessageService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.$colorApi
      .getAll()
      .pipe(map((colors) => (this.colors = colors)))
      .subscribe();
  }

  submit() {
    const color = new Color();
    color.name = this.model.name;
    color.red = this.model.color.r;
    color.green = this.model.color.g;
    color.blue = this.model.color.b;

    this.form.disable();
    this.$colorApi
      .insert(color)
      .pipe(
        map(() => {
          this.$message.add({
            severity: "success",
            summary: "Success",
            detail: `Color [${color.name}] is added successfully!`,
          });
        }),
        finalize(() => {
          this.form.enable();
          this.refresh();
        })
      )
      .subscribe();
  }

  getColorHex(color: Color) {
    const r = color.red?.toString(16).padStart(2, "0");
    const g = color.green?.toString(16).padStart(2, "0");
    const b = color.blue?.toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }
}
