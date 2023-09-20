import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ColorPalettesRoutingModule } from "./color-palettes-routing.module";
import { ColorPalettesComponent } from "./color-palettes.component";
import { SubmitButtonModule } from "src/app/shared/components/submit-button/submit-button.module";
import { LighteningMonochromaticPaletteComponent } from "./lightening-monochromatic-palette/lightening-monochromatic-palette.component";
import { RegularlyUsedPrimengModule } from "src/app/shared/modules/regularly-used-primeng.module";
import { FormsModule } from "@angular/forms";
import { SliderModule } from "primeng/slider";
import { AnalogousPaletteComponent } from "./analogous-palette/analogous-palette.component";
import { TetradicPaletteComponent } from "./tetradic-palette/tetradic-palette.component";
import { FormlyFormModule } from "src/app/shared/components/formly-form/formly-form.module";
import { UniversalGradientPaletteComponent } from "./universal-gradient-palette/universal-gradient-palette.component";
import { BasePalleteComponent } from "./base-pallete/base-pallete.component";
import { PictureThreeColorComponent } from "./base-pallete/picture-three-color/picture-three-color.component";

@NgModule({
  declarations: [
    ColorPalettesComponent,
    LighteningMonochromaticPaletteComponent,
    AnalogousPaletteComponent,
    TetradicPaletteComponent,
    UniversalGradientPaletteComponent,
    BasePalleteComponent,
    PictureThreeColorComponent,
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
