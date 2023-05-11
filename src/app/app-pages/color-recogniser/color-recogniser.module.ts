import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ColorRecogniserRoutingModule } from "./color-recogniser-routing.module";
import { ColorRecogniserComponent } from "./color-recogniser.component";


@NgModule({
  declarations: [
    ColorRecogniserComponent
  ],
  imports: [
    CommonModule,
    ColorRecogniserRoutingModule
  ]
})
export class ColorRecogniserModule { }
