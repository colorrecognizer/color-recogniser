import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-back-button",
  templateUrl: "./back-button.component.html",
  styleUrls: ["./back-button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent {
  constructor(private $location: Location) {}

  @Input() label = "Back";
  @Input() url?: string;

  click() {
    this.$location.back();
  }
}
