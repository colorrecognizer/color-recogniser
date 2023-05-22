import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ColorRecogniserRoutingModule } from "./color-recogniser-routing.module";
import { ColorRecogniserComponent } from "./color-recogniser.component";
import { AngularResizeEventModule } from "angular-resize-event";

@NgModule({
  declarations: [ColorRecogniserComponent],
  imports: [
    CommonModule,
    ColorRecogniserRoutingModule,
    AngularResizeEventModule,
  ],
})
export class ColorRecogniserModule {}
