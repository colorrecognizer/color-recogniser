import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ThemeService } from "src/app/shared/theme.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  constructor(private $theme: ThemeService) {}

  toggleTheme() {
    this.$theme.switchTheme();
  }

  get themeIcon(): string {
    return `pi ${
      this.$theme.getTheme() === "light-theme" ? "pi pi-sun" : "pi pi-moon"
    }`;
  }
}
