import { Component } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
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
    private $meta: Meta
  ) {
    this.$primengConfig.ripple = true;
    $title.setTitle("Color Recognizer");
    // $meta.addTags([
    //   {
    //     name: "og:image",
    //     content: "https://colorrecognizer.io/assets/images/logo.png",
    //   },
    // ]);
  }
}
