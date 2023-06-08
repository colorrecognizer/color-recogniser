import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CmykColorMixingAnimationRoutingModule } from "./cmyk-color-mixing-animation-routing.module";
import { CmykColorMixingAnimationComponent } from "./cmyk-color-mixing-animation.component";
import { RegularlyUsedPrimengModule } from "src/app/shared/modules/regularly-used-primeng.module";

@NgModule({
  declarations: [CmykColorMixingAnimationComponent],
  imports: [
    CommonModule,
    CmykColorMixingAnimationRoutingModule,
    RegularlyUsedPrimengModule,
  ],
})
export class CmykColorMixingAnimationModule {}
