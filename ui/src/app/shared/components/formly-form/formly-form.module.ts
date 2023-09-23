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
import { InputNumberModule } from "primeng/inputnumber";
import { CmykPickerComponent } from "./color-picker-type/cmyk-picker/cmyk-picker.component";
import { ColorPickerChangeService } from "./color-picker-type/color-picker-change.service";
import { HsvPickerComponent } from "./color-picker-type/hsv-picker/hsv-picker.component";
import { CopyToClipboardButtonModule } from "../copy-to-clipboard-button/copy-to-clipboard-button.module";
import { HslPickerComponent } from "./color-picker-type/hsl-picker/hsl-picker.component";

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
  declarations: [
    ColorPickerTypeComponent,
    RgbPickerComponent,
    CmykPickerComponent,
    HsvPickerComponent,
    HslPickerComponent,
  ],
  imports: [
    ...modules,
    InputTextModule,
    FormsModule,
    FieldsetModule,
    SliderModule,
    InputNumberModule,
    CopyToClipboardButtonModule,
  ],
  exports: [...modules, ColorPickerTypeComponent],
  providers: [ColorPickerChangeService],
})
export class FormlyFormModule {}
