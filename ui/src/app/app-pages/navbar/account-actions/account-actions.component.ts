import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouteEnum } from "src/app/shared/utils";

@Component({
  selector: "app-account-actions",
  templateUrl: "./account-actions.component.html",
  styleUrls: ["./account-actions.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountActionsComponent {
  readonly loginUrl = RouteEnum.AuthPage;
}
