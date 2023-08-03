import { Component } from "@angular/core";
import { RouteEnum } from "src/app/shared/utils";

@Component({
  selector: "app-privacy-policy",
  templateUrl: "./privacy-policy.component.html",
  styleUrls: ["./privacy-policy.component.scss"],
})
export class PrivacyPolicyComponent {
  contactUsUrl = RouteEnum.ContactUs;
}
