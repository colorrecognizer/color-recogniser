import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, OnInit } from "@angular/core";
import { NgForage } from "ngforage";

const THEME_KEY = "theme";
type ThemeType = "light-theme" | "dark-theme";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private theme: ThemeType = "light-theme";
  constructor(
    @Inject(DOCUMENT) private $document: Document,
    private $ngf: NgForage
  ) {
    $ngf.getItem<ThemeType>(THEME_KEY).then((theme) => {
      this.theme = theme || "light-theme";
      this.setTheme();
    });
  }

  async switchTheme() {
    if (this.theme === "light-theme") {
      this.theme = "dark-theme";
    } else {
      this.theme = "light-theme";
    }

    await this.$ngf.setItem(THEME_KEY, this.theme);
    this.setTheme();
  }

  private setTheme() {
    const themeLink = this.$document.getElementById(
      "app-theme"
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = this.theme + ".css";
    }
  }

  getTheme(): ThemeType {
    return this.theme;
  }
}
