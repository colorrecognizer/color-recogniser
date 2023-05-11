import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import {RippleModule} from "primeng/ripple";

const modules = [
  ButtonModule,
  RippleModule,
]

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
})
export class RegularlyUsedPrimengModule { }
