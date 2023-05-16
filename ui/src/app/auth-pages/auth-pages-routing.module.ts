import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthPagesComponent } from "./auth-pages.component";

const routes: Routes = [{ path: "", component: AuthPagesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPagesRoutingModule {}
