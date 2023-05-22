import { Component, EventEmitter, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { map, finalize } from "rxjs";
import { Color, ColorApi } from "src/app/shared/auto-generated/apis";
import { ColorPickerTypeComponent } from "src/app/shared/modules/formly-form/color-picker-type/color-picker-type.component";

@Component({
  selector: "app-color",
  templateUrl: "./color.component.html",
  styleUrls: ["./color.component.scss"],
})
export class ColorComponent {
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

  @Output() finalized = new EventEmitter<void>();

  constructor(
    private $colorApi: ColorApi,
    private $message: MessageService,
    private $dynamicDialogRef: DynamicDialogRef,
    private $dynamicDialogConfig: DynamicDialogConfig
  ) {
    const color = $dynamicDialogConfig.data?.color as Color;
    if (color) {
      this.model = color;
      this.model.color = {
        r: color.red,
        g: color.green,
        b: color.blue,
      };
    }
  }

  submit() {
    this.model.red = this.model.color.r;
    this.model.green = this.model.color.g;
    this.model.blue = this.model.color.b;

    this.form.disable();

    const api = this.model.id
      ? this.$colorApi.update(this.model)
      : this.$colorApi.insert(this.model);

    api
      .pipe(
        map(() => {
          this.$message.add({
            severity: "success",
            summary: "Success",
            detail: `Color [${this.model.name}] is added successfully!`,
          });
        }),
        finalize(() => {
          this.form.enable();
          this.finalized.emit();
          this.$dynamicDialogRef.close();
        })
      )
      .subscribe();
  }
}
