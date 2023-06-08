import { Component } from "@angular/core";
import { RouteEnum } from "src/app/shared/utils";

@Component({
  selector: "app-cmyk-color-mixing-animation",
  templateUrl: "./cmyk-color-mixing-animation.component.html",
  styleUrls: ["./cmyk-color-mixing-animation.component.scss"],
})
export class CmykColorMixingAnimationComponent {
  homePageUrl = RouteEnum.HomePage;
}
