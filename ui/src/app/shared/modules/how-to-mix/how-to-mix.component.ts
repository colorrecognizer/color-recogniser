import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { Color } from "../../auto-generated/apis";

@Component({
  selector: "app-how-to-mix",
  templateUrl: "./how-to-mix.component.html",
  styleUrls: ["./how-to-mix.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowToMixComponent {
  color: Color;

  constructor(
    private $dynamicDialogRef: DynamicDialogRef,
    private $dynamicDialogConfig: DynamicDialogConfig
  ) {
    this.color = $dynamicDialogConfig.data?.color as Color;
  }
}
