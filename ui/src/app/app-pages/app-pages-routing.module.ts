import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppPagesComponent } from "./app-pages.component";
import { AuthGuard } from "../shared/services/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: AppPagesComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./color-recogniser/color-recogniser.module").then(
            (m) => m.ColorRecogniserModule
          ),
      },
      {
        path: "color-management",
        loadChildren: () =>
          import("./color-management/color-management.module").then(
            (m) => m.ColorManagementModule
          ),
        canActivate: [AuthGuard],
        data: {
          roles: ["ADMIN"],
        },
      },
      {
        path: "palettes",
        loadChildren: () =>
          import("./color-palettes/color-palettes.module").then(
            (m) => m.ColorPalettesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppPagesRoutingModule {}
