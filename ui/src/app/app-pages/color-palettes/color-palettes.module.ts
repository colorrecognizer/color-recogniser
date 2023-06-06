import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ColorPalettesRoutingModule } from "./color-palettes-routing.module";
import { ColorPalettesComponent } from "./color-palettes.component";
import { SubmitButtonModule } from "src/app/shared/components/submit-button/submit-button.module";
import { FormlyFormModule } from "src/app/shared/modules/formly-form/formly-form.module";
import { LighteningMonochromaticPaletteComponent } from "./lightening-monochromatic-palette/lightening-monochromatic-palette.component";
import { RegularlyUsedPrimengModule } from "src/app/shared/modules/regularly-used-primeng.module";
import { FormsModule } from "@angular/forms";
import { SliderModule } from "primeng/slider";

@NgModule({
  declarations: [
    ColorPalettesComponent,
    LighteningMonochromaticPaletteComponent,
  ],
  imports: [
    CommonModule,
    ColorPalettesRoutingModule,
    FormlyFormModule,
    SubmitButtonModule,
    RegularlyUsedPrimengModule,
    FormsModule,
    SliderModule,
  ],
})
export class ColorPalettesModule {}
