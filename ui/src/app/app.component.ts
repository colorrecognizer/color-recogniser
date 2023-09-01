import {
  AfterViewInit,
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
import { delay, map, tap } from "rxjs";
import { DOCUMENT } from "@angular/common";
import { BackgroundChangeService } from "./shared/services/background-change.service";
import anime from "animejs";

const CookieConsentAcceptedDate = "CookieConsentAcceptedDate";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit {
  title = "color-recogniser";
  cookieDialogVisible = false;
  privacyPolicyUrl = RouteEnum.PrivacyPolicy;
  @ViewChildren("cursor1,cursor2,cursor3,cursor4,cursor5")
  cursorDivs!: QueryList<ElementRef<HTMLDivElement>>;
  container: Element | null = null;

  constructor(
    private $primengConfig: PrimeNGConfig,
    $title: Title,
    private $localForage: LocalforageService,
    @Inject(DOCUMENT) private $document: Document,
    private $zone: NgZone,
    private $backgroundChange: BackgroundChangeService
  ) {
    this.$primengConfig.ripple = true;
    $title.setTitle("Color Recognizer");
  }

  ngAfterViewInit(): void {
    this.container = document.querySelector("body>div.background-container");
    for (let i = 0; i < 100; ++i) {
      const blocks = document.createElement("div");
      blocks.classList.add("background-block");
      this.container?.appendChild(blocks);
    }

    this.$backgroundChange.colorSubject
      .pipe(
        delay(100),
        tap(() => {
          this.container?.classList.toggle("circle");
          const h = this.container?.clientHeight || 0;
          const w = this.container?.clientWidth || 0;
          anime({
            targets: ".background-block",
            translateX: () => anime.random(-w / 2 + 250 / 2, w / 2 - 250 / 2),
            translateY: () => anime.random(-h / 2 + 250 / 2, h / 2 - 250 / 2),
            scale: () => anime.random(1, 5),
          });
        })
      )
      .subscribe();
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
