import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DevToolsRoutingModule } from "./dev-tools-routing.module";
import { DevToolsComponent } from "./dev-tools.component";
import { RegularlyUsedPrimengModule } from "src/app/shared/modules/regularly-used-primeng.module";
import { TabViewModule } from "primeng/tabview";
import { TfnGeneratorComponent } from "./tfn-generator/tfn-generator.component";
import { FormsModule } from "@angular/forms";
import { ChipModule } from "primeng/chip";

@NgModule({
  declarations: [DevToolsComponent, TfnGeneratorComponent],
  imports: [
    CommonModule,
    DevToolsRoutingModule,
    RegularlyUsedPrimengModule,
    TabViewModule,
    FormsModule,
    ChipModule,
  ],
})
export class DevToolsModule {}
