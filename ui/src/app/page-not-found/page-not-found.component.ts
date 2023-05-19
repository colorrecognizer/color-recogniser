import { Component } from "@angular/core";
import { RouteEnum } from "../shared/utils";

@Component({
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.scss"],
})
export class PageNotFoundComponent {
  homePageUrl = RouteEnum.HomePage;
}
