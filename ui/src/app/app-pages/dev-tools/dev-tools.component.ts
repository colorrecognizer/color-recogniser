import { AfterViewInit, Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { TabViewChangeEvent } from "primeng/tabview";
import { BackgroundChangeService } from "src/app/shared/services/background-change.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-dev-tools",
  templateUrl: "./dev-tools.component.html",
  styleUrls: ["./dev-tools.component.scss"],
})
export class DevToolsComponent implements AfterViewInit {
  tabs = [
    {
      name: "TFN Generator",
    },
    {
      name: "File Diff",
    },
    {
      name: "JSON Escape / Unescape / Beautify",
    },
    {
      name: "Generate MD Table",
    },
  ];

  activeIndex = environment.production ? 0 : 3;

  constructor(
    private $title: Title,
    $meta: Meta,
    private $backgroundChange: BackgroundChangeService
  ) {
    $title.setTitle(this.tabs[0].name);

    $meta.updateTag(
      {
        name: "og:description",
        content: "All-in-one tools for developers.",
      },
      "property='og:description'"
    );
  }

  ngAfterViewInit(): void {
    this.$backgroundChange.randomize();
  }

  onTabChange(event: TabViewChangeEvent) {
    this.$backgroundChange.randomize();
    this.$title.setTitle(this.tabs[event.index].name);
  }
}
