import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { Router } from "@angular/router";
import anime from "animejs";
import { StyleClass } from "primeng/styleclass";
import { map } from "rxjs";
import { User } from "src/app/shared/auto-generated/apis";
import { AuthService } from "src/app/shared/services/auth.service";
import { BackgroundChangeService } from "src/app/shared/services/background-change.service";
import { ThemeService } from "src/app/shared/services/theme.service";
import { RouteEnum } from "src/app/shared/utils";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NavbarComponent {
  currentUser?: User;
  colorManagementUrl = RouteEnum.ColorManagement;
  homeUrl = RouteEnum.HomePage;
  themeIcon?: string;
  @ViewChild("logo") logo!: ElementRef<HTMLImageElement>;
  logoAnimation?: anime.AnimeInstance;
  logoAnimations: anime.AnimeInstance[] = [];
  logoAnimationIndex = 0;
  palettesUrl = RouteEnum.ColorPalettes;
  devToolsUrl = RouteEnum.DevTools;
  contactUsUrl = RouteEnum.ContactUs;
  @ViewChildren(StyleClass) toggleStyleClasses!: QueryList<StyleClass>;
  @ViewChild("kebab") kebab!: ElementRef<HTMLAnchorElement>;

  constructor(
    private $theme: ThemeService,
    private $auth: AuthService,
    private $router: Router,
    private $backgroundChange: BackgroundChangeService
  ) {
    $auth
      .getCurrentUser()
      .pipe(map((user) => (this.currentUser = user)))
      .subscribe();

    this.$theme.theme.subscribe((theme) => {
      this.themeIcon = theme === "light-theme" ? "pi pi-sun" : "pi pi-moon";
    });
  }

  // ngAfterViewInit(): void {
  //   const sharedAnimationSettings: anime.AnimeParams = {
  //     targets: [this.logo.nativeElement],
  //     loop: true,
  //     duration: 5000,
  //     rotate: -360,
  //   };

  //   this.logoAnimations.push(
  //     anime({
  //       ...sharedAnimationSettings,
  //       easing: "cubicBezier(.5, .05, .1, .3)",
  //     }),
  //     anime({
  //       ...sharedAnimationSettings,
  //       easing: "linear",
  //     }),
  //     anime({
  //       ...sharedAnimationSettings,
  //       easing: "easeInOutSine",
  //     }),
  //     anime({
  //       ...sharedAnimationSettings,
  //       easing: "spring(1, 80, 10, 0)",
  //     })
  //   );

  //   this.setLogoAnimation();
  // }

  dropdownOnClick() {
    if (!this.kebab.nativeElement.offsetParent) return;

    const x = this.toggleStyleClasses.get(0);
    if (!x) return;
    x.leave();
  }

  setLogoAnimation() {
    this.logoAnimation?.pause();
    this.logoAnimation = this.logoAnimations[this.logoAnimationIndex];
    this.logoAnimation.play();
    this.logoAnimationIndex =
      (this.logoAnimationIndex + 1) % this.logoAnimations.length;
  }

  toggleTheme() {
    this.$theme.switchTheme();
  }

  get systemThemeUsed(): boolean {
    return this.$theme.systemThemeUsed;
  }

  toggleSystemThemeUsed() {
    this.$theme.toggleSystemThemeUsed();
  }

  navigateToColorRecognizer() {
    this.$router.navigate([RouteEnum.HomePage]);
  }
}
