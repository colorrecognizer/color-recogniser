import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DevToolsRoutingModule } from "./dev-tools-routing.module";
import { DevToolsComponent } from "./dev-tools.component";
import { RegularlyUsedPrimengModule } from "src/app/shared/modules/regularly-used-primeng.module";
import { TabViewModule } from "primeng/tabview";
import { TfnGeneratorComponent } from "./tfn-generator/tfn-generator.component";
import { FormsModule } from "@angular/forms";
import { ChipModule } from "primeng/chip";
import { FileDiffComponent } from "./file-diff/file-diff.component";
import { JsonEscapeUnescapeComponent } from "./json-escape-unescape/json-escape-unescape.component";
import { HighlightModule } from "ngx-highlightjs";
import { CopyToClipboardButtonModule } from "src/app/shared/components/copy-to-clipboard-button/copy-to-clipboard-button.module";
import { AdCarouselModule } from "src/app/shared/components/ad-carousel/ad-carousel.module";

@NgModule({
  declarations: [
    DevToolsComponent,
    TfnGeneratorComponent,
    FileDiffComponent,
    JsonEscapeUnescapeComponent,
  ],
  imports: [
    CommonModule,
    DevToolsRoutingModule,
    RegularlyUsedPrimengModule,
    TabViewModule,
    FormsModule,
    ChipModule,
    HighlightModule,
    CopyToClipboardButtonModule,
    AdCarouselModule,
  ],
})
export class DevToolsModule {}
