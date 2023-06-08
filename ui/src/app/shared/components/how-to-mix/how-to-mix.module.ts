import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HowToMixComponent } from "./how-to-mix.component";
import { CopyToClipboardButtonModule } from "../../components/copy-to-clipboard-button/copy-to-clipboard-button.module";
import { RegularlyUsedPrimengModule } from "../../modules/regularly-used-primeng.module";

@NgModule({
  declarations: [HowToMixComponent],
  imports: [
    CommonModule,
    RegularlyUsedPrimengModule,
    CopyToClipboardButtonModule,
  ],
  exports: [HowToMixComponent],
})
export class HowToMixModule {}
