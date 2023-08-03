import { Component } from "@angular/core";
import { RouteEnum } from "../../utils";

@Component({
  selector: "app-ad-carousel",
  templateUrl: "./ad-carousel.component.html",
  styleUrls: ["./ad-carousel.component.scss"],
})
export class AdCarouselComponent {
  images: Image[] = [
    {
      src: "assets/images/ads/ad1.png",
    },
    {
      src: "assets/images/ads/ad2.png",
    },
    {
      src: "assets/images/ads/ad3.png",
    },
  ];

  homeUrl = RouteEnum.HomePage;
}

interface Image {
  src: string;
}
