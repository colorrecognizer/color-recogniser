import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { StyleClassModule } from "primeng/styleclass";
import { CheckboxModule } from "primeng/checkbox";
import { BadgeModule } from "primeng/badge";
import { TooltipModule } from "primeng/tooltip";
import { TableModule } from "primeng/table";
import { InputTextModule } from "primeng/inputtext";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputNumberModule } from "primeng/inputnumber";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";

const modules = [
  ButtonModule,
  RippleModule,
  StyleClassModule,
  CheckboxModule,
  BadgeModule,
  TooltipModule,
  TableModule,
  InputTextModule,
  RadioButtonModule,
  InputNumberModule,
  DividerModule,
  DropdownModule
];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
})
export class RegularlyUsedPrimengModule {}
