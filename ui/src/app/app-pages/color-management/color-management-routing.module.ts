import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ColorManagementComponent } from "./color-management.component";

const routes: Routes = [{ path: "", component: ColorManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColorManagementRoutingModule { }
