import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ColorRecogniserRoutingModule } from "./color-recogniser-routing.module";
import { ColorRecogniserComponent } from "./color-recogniser.component";
import { AngularResizeEventModule } from "angular-resize-event";
import { RegularlyUsedPrimengModule } from "src/app/shared/modules/regularly-used-primeng.module";
import { FormsModule } from "@angular/forms";
import { ColorPickerModule } from "primeng/colorpicker";
import { FileUploadModule } from "primeng/fileupload";
import { RecogniseButtonComponent } from "./recognise-button/recognise-button.component";
import { HowToMixModule } from "src/app/shared/components/how-to-mix/how-to-mix.module";

@NgModule({
  declarations: [ColorRecogniserComponent, RecogniseButtonComponent],
  imports: [
    CommonModule,
    ColorRecogniserRoutingModule,
    AngularResizeEventModule,
    RegularlyUsedPrimengModule,
    FormsModule,
    ColorPickerModule,
    FileUploadModule,
    HowToMixModule,
  ],
})
export class ColorRecogniserModule {}
