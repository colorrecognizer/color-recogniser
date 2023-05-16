import { Component } from "@angular/core";
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: "app-auth-pages",
  templateUrl: "./auth-pages.component.html",
  styleUrls: ["./auth-pages.component.scss"],
})
export class AuthPagesComponent {
  constructor(private $auth: AuthService) {}

  loginWithGoogle() {
    this.$auth.googleAuth();
  }
}
