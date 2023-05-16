import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthPagesRoutingModule } from "./auth-pages-routing.module";
import { AuthPagesComponent } from "./auth-pages.component";
import { RegularlyUsedPrimengModule } from "../shared/regularly-used-primeng/regularly-used-primeng.module";
import { BackButtonModule } from "../shared/back-button/back-button.module";

@NgModule({
  declarations: [AuthPagesComponent],
  imports: [
    CommonModule,
    AuthPagesRoutingModule,
    RegularlyUsedPrimengModule,
    BackButtonModule,
  ],
})
export class AuthPagesModule {}
