import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ContactUsRoutingModule } from "./contact-us-routing.module";
import { ContactUsComponent } from "./contact-us.component";
import { RegularlyUsedPrimengModule } from "src/app/shared/modules/regularly-used-primeng.module";
import { FormlyFormModule } from "src/app/shared/components/formly-form/formly-form.module";
import { SubmitButtonModule } from "src/app/shared/components/submit-button/submit-button.module";
import { AdCarouselModule } from "src/app/shared/components/ad-carousel/ad-carousel.module";

@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    RegularlyUsedPrimengModule,
    FormlyFormModule,
    SubmitButtonModule,
    AdCarouselModule,
  ],
})
export class ContactUsModule {}
