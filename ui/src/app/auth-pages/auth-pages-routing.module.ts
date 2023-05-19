import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthPagesComponent } from "./auth-pages.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {
    path: "",
    component: AuthPagesComponent,
    children: [
      {
        path: "",
        component: LoginComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPagesRoutingModule {}
