import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BasePaletteComponent } from "./base-palette.component";

@NgModule({
  declarations: [BasePaletteComponent],
  imports: [CommonModule],
  exports: [BasePaletteComponent],
})
export class BasePaletteModule {}
