import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SubmitButtonComponent } from "./submit-button.component";
import { RegularlyUsedPrimengModule } from "../../modules/regularly-used-primeng.module";
import { ProgressBarModule } from "primeng/progressbar";

@NgModule({
  declarations: [SubmitButtonComponent],
  imports: [CommonModule, RegularlyUsedPrimengModule, ProgressBarModule],
  exports: [SubmitButtonComponent],
})
export class SubmitButtonModule {}
