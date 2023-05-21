import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map } from "rxjs";
import { User } from "src/app/shared/auto-generated/apis";
import { AuthService } from "src/app/shared/services/auth.service";
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

  constructor(private $theme: ThemeService, private $auth: AuthService) {
    $auth
      .getCurrentUser()
      .pipe(map((user) => (this.currentUser = user)))
      .subscribe();
  }

  toggleTheme() {
    this.$theme.switchTheme();
  }

  get themeIcon(): string {
    return `pi ${
      this.$theme.theme === "light-theme" ? "pi pi-sun" : "pi pi-moon"
    }`;
  }

  get systemThemeUsed(): boolean {
    return this.$theme.systemThemeUsed;
  }

  toggleSystemThemeUsed() {
    this.$theme.toggleSystemThemeUsed();
  }
}
