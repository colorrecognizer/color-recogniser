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
    private $theme: ThemeService,
    private $title: Title,
    private $meta: Meta
  ) {
    this.$primengConfig.ripple = true;
    $title.setTitle("Color Recogniser");
    $meta.addTags([
      {
        name: "description",
        content:
          "Discover a world of vibrant colors with Color Recogniser. Our easy-to-use tool helps you recognize and explore colors in photos, making it perfect for kids, art teachers, artists, photographers, and designers. Unleash your creativity and unlock the palette of possibilities with our accurate color recognition tool.",
      },
    ]);
  }
}
