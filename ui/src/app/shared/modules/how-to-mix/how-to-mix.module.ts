import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HowToMixComponent } from "./how-to-mix.component";
import { RegularlyUsedPrimengModule } from "../regularly-used-primeng.module";

@NgModule({
  declarations: [HowToMixComponent],
  imports: [CommonModule, RegularlyUsedPrimengModule],
  exports: [HowToMixComponent],
})
export class HowToMixModule {}
