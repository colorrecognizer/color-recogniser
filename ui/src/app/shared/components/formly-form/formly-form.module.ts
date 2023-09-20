import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormlyPrimeNGModule } from "@ngx-formly/primeng";
import { FormlyModule } from "@ngx-formly/core";
import { ColorPickerTypeComponent } from "./color-picker-type/color-picker-type.component";
import { ColorPickerModule } from "primeng/colorpicker";
import { InputTextModule } from "primeng/inputtext";
import { FieldsetModule } from "primeng/fieldset";
import { SliderModule } from "primeng/slider";
import { RgbPickerComponent } from "./color-picker-type/rgb-picker/rgb-picker.component";

const modules = [
  ReactiveFormsModule,
  FormlyModule.forRoot({
    validators: [
      {
        name: "email",
        validation: Validators.email,
      },
    ],
    validationMessages: [
      { name: "email", message: "Invalid email address" },
      { name: "required", message: "This field is required" },
    ],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any,
  FormlyPrimeNGModule,
  ColorPickerModule,
];

@NgModule({
  declarations: [ColorPickerTypeComponent, RgbPickerComponent],
  imports: [
    ...modules,
    InputTextModule,
    FormsModule,
    FieldsetModule,
    SliderModule,
  ],
  exports: [...modules, ColorPickerTypeComponent],
})
export class FormlyFormModule {}
