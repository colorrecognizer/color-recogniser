import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CmykColorMixingAnimationComponent } from "./cmyk-color-mixing-animation.component";

const routes: Routes = [{ path: "", component: CmykColorMixingAnimationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmykColorMixingAnimationRoutingModule { }
