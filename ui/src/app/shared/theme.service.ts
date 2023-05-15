import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { NgForage } from "ngforage";

const THEME_KEY = "settings_theme";
const SYSTEM_THEME_USED_KEY = "settings_systemThemeUsed";
type ThemeType = "light-theme" | "dark-theme";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private _theme: ThemeType = "light-theme";
  private _systemThemeUsed = true;

  constructor(
    @Inject(DOCUMENT) private $document: Document,
    private $ngf: NgForage
  ) {
    $ngf.getItem<boolean>(SYSTEM_THEME_USED_KEY).then((systemThemeUsed) => {
      this._systemThemeUsed = systemThemeUsed !== null ? systemThemeUsed : true;
      this.initTheme();
    });
  }

  private initTheme() {
    if (this._systemThemeUsed) {
      this._theme = window?.matchMedia?.("(prefers-color-scheme:dark)")?.matches
        ? "dark-theme"
        : "light-theme";

      this.setTheme();
    } else {
      this.$ngf.getItem<ThemeType>(THEME_KEY).then((theme) => {
        this._theme = theme || "light-theme";
        this.setTheme();
      });
    }
  }

  async switchTheme() {
    if (this._theme === "light-theme") {
      this._theme = "dark-theme";
    } else {
      this._theme = "light-theme";
    }

    await this.$ngf.setItem(THEME_KEY, this._theme);
    this.setTheme();
  }

  private setTheme() {
    const themeLink = this.$document.getElementById(
      "app-theme"
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = this._theme + ".css";
    }
  }

  get theme(): ThemeType {
    return this._theme;
  }

  get systemThemeUsed(): boolean {
    return this._systemThemeUsed;
  }

  toggleSystemThemeUsed() {
    this._systemThemeUsed = !this._systemThemeUsed;
    this.$ngf.setItem(SYSTEM_THEME_USED_KEY, this._systemThemeUsed);
    this.initTheme();
  }
}
