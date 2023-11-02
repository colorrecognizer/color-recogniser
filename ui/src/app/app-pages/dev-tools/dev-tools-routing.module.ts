import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DevToolsComponent } from "./dev-tools.component";
import { tabs } from "./tabs";

const routes: Routes = [
  { path: "", redirectTo: tabs[0].path, pathMatch: "full" },
  ...tabs.map(tab => ({
    path: tab.path,
    component: DevToolsComponent,
    data: {
      path: tab.path
    }
  }))
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevToolsRoutingModule { }
