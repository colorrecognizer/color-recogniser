import { Component, Input } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { Color } from "src/app/shared/auto-generated/apis";
import { HowToMixComponent } from "src/app/shared/components/how-to-mix/how-to-mix.component";

@Component({
  selector: "app-base-pallete",
  templateUrl: "./base-pallete.component.html",
  styleUrls: ["./base-pallete.component.scss"],
})
export class BasePalleteComponent {
  @Input() colors: Color[] = [];

  constructor(private $dialog: DialogService) {}

  showHowToMix(color: Color) {
    if (!color) return;

    this.$dialog.open(HowToMixComponent, {
      header: `How to mix color ${color.hexValue}`,
      draggable: true,
      data: {
        color: color,
        showColorPalettesHidden: true,
      },
    });
  }
}
