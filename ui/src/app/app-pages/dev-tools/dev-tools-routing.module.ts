import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DevToolsComponent } from "./dev-tools.component";

const routes: Routes = [{ path: "", component: DevToolsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevToolsRoutingModule { }
