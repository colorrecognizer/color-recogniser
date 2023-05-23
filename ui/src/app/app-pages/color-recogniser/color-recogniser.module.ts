import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ColorRecogniserRoutingModule } from "./color-recogniser-routing.module";
import { ColorRecogniserComponent } from "./color-recogniser.component";
import { AngularResizeEventModule } from "angular-resize-event";
import { RegularlyUsedPrimengModule } from "src/app/shared/modules/regularly-used-primeng.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [ColorRecogniserComponent],
  imports: [
    CommonModule,
    ColorRecogniserRoutingModule,
    AngularResizeEventModule,
    RegularlyUsedPrimengModule,
    FormsModule,
  ],
})
export class ColorRecogniserModule {}
