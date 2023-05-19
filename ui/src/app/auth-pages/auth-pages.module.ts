import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthPagesRoutingModule } from "./auth-pages-routing.module";
import { AuthPagesComponent } from "./auth-pages.component";
import { RegularlyUsedPrimengModule } from "../shared/modules/regularly-used-primeng.module";
import { BackButtonModule } from "../shared/back-button/back-button.module";
import { FormlyFormModule } from "../shared/modules/formly-form.module";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
  declarations: [AuthPagesComponent, RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthPagesRoutingModule,
    RegularlyUsedPrimengModule,
    BackButtonModule,
    FormlyFormModule,
  ],
})
export class AuthPagesModule {}
