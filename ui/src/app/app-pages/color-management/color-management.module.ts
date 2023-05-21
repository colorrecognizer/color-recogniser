import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ColorManagementRoutingModule } from "./color-management-routing.module";
import { ColorManagementComponent } from "./color-management.component";
import { FormlyFormModule } from "src/app/shared/modules/formly-form/formly-form.module";
import { SubmitButtonModule } from "src/app/shared/components/submit-button/submit-button.module";
import { FormsModule } from "@angular/forms";
import { ColorPickerModule } from "primeng/colorpicker";

@NgModule({
  declarations: [ColorManagementComponent],
  imports: [
    CommonModule,
    ColorManagementRoutingModule,
    FormlyFormModule,
    SubmitButtonModule,
    FormsModule,
    ColorPickerModule
  ],
})
export class ColorManagementModule {}
