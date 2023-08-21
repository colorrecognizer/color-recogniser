import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  NgZone,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { Title } from "@angular/platform-browser";
import { RouteEnum } from "./shared/utils";
import { LocalforageService } from "./shared/services/localforage.service";
import { map } from "rxjs";
import { DOCUMENT } from "@angular/common";

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
  @ViewChildren("cursor1,cursor2,cursor3,cursor4,cursor5")
  cursorDivs!: QueryList<ElementRef<HTMLDivElement>>;

  constructor(
    private $primengConfig: PrimeNGConfig,
    $title: Title,
    private $localForage: LocalforageService,
    @Inject(DOCUMENT) private $document: Document,
    private $zone: NgZone
  ) {
    this.$primengConfig.ripple = true;
    $title.setTitle("Color Recognizer");
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

  @HostListener("document:mousemove", ["$event"])
  onMouseMove(e: MouseEvent) {
    // animate background
    this.$document.body.style.backgroundPositionX = e.pageX / -4 + "px";
    this.$document.body.style.backgroundPositionY = e.pageY / -4 + "px";
  }
}
