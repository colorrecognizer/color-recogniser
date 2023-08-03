import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdCarouselComponent } from "./ad-carousel.component";
import { CarouselModule } from "primeng/carousel";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [AdCarouselComponent],
  imports: [CommonModule, CarouselModule, RouterModule],
  exports: [AdCarouselComponent],
})
export class AdCarouselModule {}
