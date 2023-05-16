import { ChangeDetectionStrategy, Component } from "@angular/core";
import * as Utils from "src/app/shared/utils";

@Component({
  selector: "app-account-actions",
  templateUrl: "./account-actions.component.html",
  styleUrls: ["./account-actions.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountActionsComponent {
    readonly loginUrl = Utils.routes.auth.login;
}
