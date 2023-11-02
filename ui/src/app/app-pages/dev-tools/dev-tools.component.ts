import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { TabViewChangeEvent } from "primeng/tabview";
import { BackgroundChangeService } from "src/app/shared/services/background-change.service";
import { environment } from "src/environments/environment";
import { tabs } from "./tabs";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-dev-tools",
  templateUrl: "./dev-tools.component.html",
  styleUrls: ["./dev-tools.component.scss"],
})
export class DevToolsComponent implements AfterViewInit, OnDestroy {
  activeIndex = 0;
  pathSub: Subscription;

  get tabs() {
    return tabs;
  }

  constructor(
    private $title: Title,
    $meta: Meta,
    private $backgroundChange: BackgroundChangeService,
    private $activatedRoute: ActivatedRoute,
    private $router: Router,
  ) {

    $meta.updateTag(
      {
        name: "og:description",
        content: "All-in-one tools for developers.",
      },
      "property='og:description'"
    );

    this.pathSub = $activatedRoute.data.subscribe((data: any) => {
      const index = this.getTabIndex(data.path);
      $title.setTitle(tabs[index].name);
      this.activeIndex = index;
    })
  }

  ngAfterViewInit(): void {
    this.$backgroundChange.randomize();
  }

  ngOnDestroy() {
    this.pathSub.unsubscribe();
  }

  getTabIndex(path: string) {
    return tabs.findIndex(x => x.path === path);
  }

  onTabChange(event: TabViewChangeEvent) {
    this.$router.navigate(["..", tabs[event.index].path], {
      relativeTo: this.$activatedRoute
    })
  }
}
