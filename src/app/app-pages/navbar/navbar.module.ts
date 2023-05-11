import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar.component";
import { RegularlyUsedPrimengModule } from "src/app/shared/regularly-used-primeng/regularly-used-primeng.module";

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RegularlyUsedPrimengModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
