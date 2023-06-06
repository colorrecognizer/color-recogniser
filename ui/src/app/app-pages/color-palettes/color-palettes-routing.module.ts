import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ColorPalettesComponent } from "./color-palettes.component";

const routes: Routes = [
  { path: "", component: ColorPalettesComponent },
  { path: ":hex", component: ColorPalettesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColorPalettesRoutingModule {}
