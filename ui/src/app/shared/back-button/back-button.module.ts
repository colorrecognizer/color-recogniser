import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BackButtonComponent } from "./back-button.component";
import { RegularlyUsedPrimengModule } from "../regularly-used-primeng/regularly-used-primeng.module";

@NgModule({
  declarations: [
    BackButtonComponent
  ],
  imports: [
    CommonModule,
    RegularlyUsedPrimengModule
  ],
  exports: [
    BackButtonComponent
  ]
})
export class BackButtonModule { }
