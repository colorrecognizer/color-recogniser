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
            (m) => m.ColorRecognizerModule
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
      {
        path: "cmyk-animation",
        loadChildren: () =>
          import(
            "./cmyk-color-mixing-animation/cmyk-color-mixing-animation.module"
          ).then((m) => m.CmykColorMixingAnimationModule),
      },
      {
        path: "dev-tools",
        loadChildren: () =>
          import("./dev-tools/dev-tools.module").then((m) => m.DevToolsModule),
      },
      {
        path: "contact-us",
        loadChildren: () =>
          import("./contact-us/contact-us.module").then(
            (m) => m.ContactUsModule
          ),
      },
      {
        path: "privacy-policy",
        loadChildren: () =>
          import("./privacy-policy/privacy-policy.module").then(
            (m) => m.PrivacyPolicyModule
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
