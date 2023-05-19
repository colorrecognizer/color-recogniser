import { Component } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { ThemeService } from "./shared/services/theme.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "color-recogniser";

  constructor(
    private $primengConfig: PrimeNGConfig,
    private $theme: ThemeService,
    private $title: Title
  ) {
    this.$primengConfig.ripple = true;
    $title.setTitle("Color Recogniser");
  }
}
