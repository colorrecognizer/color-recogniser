import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppPagesRoutingModule } from "./app-pages-routing.module";
import { AppPagesComponent } from "./app-pages.component";
import { NavbarModule } from "./navbar/navbar.module";
import { FooterComponent } from "./footer/footer.component";
import { RegularlyUsedPrimengModule } from "../shared/modules/regularly-used-primeng.module";
import { TableModule } from "primeng/table";
@NgModule({
  declarations: [AppPagesComponent, FooterComponent],
  imports: [
    CommonModule,
    AppPagesRoutingModule,
    NavbarModule,
    RegularlyUsedPrimengModule,
    TableModule,
  ],
})
export class AppPagesModule {}
