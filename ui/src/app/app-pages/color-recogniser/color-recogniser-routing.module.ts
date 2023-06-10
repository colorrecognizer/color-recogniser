import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ColorRecognizerComponent } from "./color-recogniser.component";

const routes: Routes = [{ path: "", component: ColorRecognizerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColorRecognizerRoutingModule { }
