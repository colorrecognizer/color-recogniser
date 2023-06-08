import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { RouteEnum } from "src/app/shared/utils";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
  constructor(private $router: Router) {}

  navigateToColorRecogniser() {
    this.$router.navigate([RouteEnum.HomePage]);
  }
}
