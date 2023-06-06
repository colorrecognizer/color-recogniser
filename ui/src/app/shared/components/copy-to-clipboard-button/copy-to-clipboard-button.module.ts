import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RegularlyUsedPrimengModule } from "../../modules/regularly-used-primeng.module";
import { CopyToClipboardButtonComponent } from "./copy-to-clipboard-button.component";

@NgModule({
  declarations: [CopyToClipboardButtonComponent],
  imports: [CommonModule, RegularlyUsedPrimengModule],
  exports: [CopyToClipboardButtonComponent],
})
export class CopyToClipboardButtonModule {}
