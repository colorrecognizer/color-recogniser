import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-back-button",
  templateUrl: "./back-button.component.html",
  styleUrls: ["./back-button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent {
  constructor(private $router: Router, private $route: ActivatedRoute) {}

  @Input() label = "Back";
  @Input() url?: string;

  click() {
    if (!this.url) {
      this.$router.navigate([".."], { relativeTo: this.$route });
    } else {
      this.$router.navigateByUrl(this.url);
    }
  }
}
