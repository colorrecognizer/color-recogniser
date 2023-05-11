import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppPagesRoutingModule } from "./app-pages-routing.module";
import { AppPagesComponent } from "./app-pages.component";
import { NavbarModule } from "./navbar/navbar.module";

@NgModule({
  declarations: [AppPagesComponent],
  imports: [CommonModule, AppPagesRoutingModule, NavbarModule],
})
export class AppPagesModule {}
