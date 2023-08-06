import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ConfirmationService, PrimeNGConfig } from "primeng/api";
import { Meta, Title } from "@angular/platform-browser";
import { RouteEnum } from "./shared/utils";
import { LocalforageService } from "./shared/services/localforage.service";
import { map } from "rxjs";

const CookieConsentAcceptedDate = "CookieConsentAcceptedDate";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = "color-recogniser";
  cookieDialogVisible = false;
  privacyPolicyUrl = RouteEnum.PrivacyPolicy;

  constructor(
    private $primengConfig: PrimeNGConfig,
    $title: Title,
    private $localForage: LocalforageService
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
    this.$localForage
      .getItem<Date>(CookieConsentAcceptedDate)
      .pipe(
        map((date) => {
          if (!date) {
            this.cookieDialogVisible = true;
          } else {
            date.setDate(date.getDate() + 1);
            if (date.getTime() < new Date().getTime()) {
              this.cookieDialogVisible = true;
            }
          }
        })
      )
      .subscribe();
  }

  acceptCookies() {
    this.cookieDialogVisible = false;
    this.$localForage
      .setItem(CookieConsentAcceptedDate, new Date())
      .subscribe();
  }
}
