import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar.component";
import { RegularlyUsedPrimengModule } from "src/app/shared/modules/regularly-used-primeng.module";
import { FormsModule } from "@angular/forms";
import { AccountActionsComponent } from "./account-actions/account-actions.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [NavbarComponent, AccountActionsComponent],
  imports: [
    CommonModule,
    RegularlyUsedPrimengModule,
    FormsModule,
    RouterModule,
  ],
  exports: [NavbarComponent],
})
export class NavbarModule {}
