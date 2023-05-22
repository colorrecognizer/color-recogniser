import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ColorManagementRoutingModule } from "./color-management-routing.module";
import { ColorManagementComponent } from "./color-management.component";
import { FormlyFormModule } from "src/app/shared/modules/formly-form/formly-form.module";
import { SubmitButtonModule } from "src/app/shared/components/submit-button/submit-button.module";
import { FormsModule } from "@angular/forms";
import { ColorPickerModule } from "primeng/colorpicker";
import { RegularlyUsedPrimengModule } from "src/app/shared/modules/regularly-used-primeng.module";
import { ColorComponent } from './color/color.component';

@NgModule({
  declarations: [ColorManagementComponent, ColorComponent],
  imports: [
    CommonModule,
    ColorManagementRoutingModule,
    FormlyFormModule,
    SubmitButtonModule,
    FormsModule,
    ColorPickerModule,
    RegularlyUsedPrimengModule,
  ],
})
export class ColorManagementModule {}
