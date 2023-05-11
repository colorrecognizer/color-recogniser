import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar.component";
import { RegularlyUsedPrimengModule } from "src/app/shared/regularly-used-primeng/regularly-used-primeng.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RegularlyUsedPrimengModule, FormsModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
