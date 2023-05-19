import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./app-pages/app-pages.module").then((m) => m.AppPagesModule),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth-pages/auth-pages.module").then((m) => m.AuthPagesModule),
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
