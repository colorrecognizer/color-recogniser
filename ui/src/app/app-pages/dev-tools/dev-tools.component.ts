import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { TabViewChangeEvent } from "primeng/tabview";

const tabs = [
  {
    name: "TFN Generator",
  },
  {
    name: "File Diff",
  },
];

@Component({
  selector: "app-dev-tools",
  templateUrl: "./dev-tools.component.html",
  styleUrls: ["./dev-tools.component.scss"],
})
export class DevToolsComponent {
  constructor(private $title: Title, $meta: Meta) {
    $title.setTitle(tabs[0].name);
    $meta.addTags([
        {
          name: "description",
          content:
            "Useful tools for developers.",
        },
      ]);
  }

  onTabChange(event: TabViewChangeEvent) {
    this.$title.setTitle(tabs[event.index].name);   
  }
}
