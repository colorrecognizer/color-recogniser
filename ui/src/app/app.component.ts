import { Component } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { ThemeService } from "./shared/theme.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "color-recogniser";

  constructor(
    private $primengConfig: PrimeNGConfig,
    private $theme: ThemeService
  ) {
    this.$primengConfig.ripple = true;
  }
}
