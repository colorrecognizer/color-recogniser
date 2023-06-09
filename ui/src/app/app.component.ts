import { Component } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { ThemeService } from "./shared/services/theme.service";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "color-recogniser";

  constructor(
    private $primengConfig: PrimeNGConfig,
    $title: Title,
  ) {
    this.$primengConfig.ripple = true;
    $title.setTitle("Color Recogniser");

  }
}
