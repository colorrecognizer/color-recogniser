import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ConfirmationService, PrimeNGConfig } from "primeng/api";
import { Meta, Title } from "@angular/platform-browser";
import { RouteEnum } from "./shared/utils";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = "color-recogniser";
  cookieDialogVisible = true;
  privacyPolicyUrl = RouteEnum.PrivacyPolicy;

  constructor(
    private $primengConfig: PrimeNGConfig,
    $title: Title,
    private $meta: Meta,
    private $confirmation: ConfirmationService
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

  ngOnInit(): void {
    this.$confirmation.confirm({
      message:
        "This website uses cookies to enhance your experience. By continuing to use this site, you consent to our use of cookies.",
      header: "Cookie Consent",
      icon: "pi pi-info-circle",
      key: "cookieDialog",
      rejectVisible: false,
      closeOnEscape: true,
      dismissableMask: true,
    });
  }
}
