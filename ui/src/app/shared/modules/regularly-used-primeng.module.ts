import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { StyleClassModule } from "primeng/styleclass";
import { CheckboxModule } from "primeng/checkbox";
import { BadgeModule } from "primeng/badge";
import { TooltipModule } from "primeng/tooltip";
import { TableModule } from "primeng/table";

const modules = [
  ButtonModule,
  RippleModule,
  StyleClassModule,
  CheckboxModule,
  BadgeModule,
  TooltipModule,
  TableModule,
];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
})
export class RegularlyUsedPrimengModule {}
