import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { AuthService } from "src/app/shared/services/auth.service";
import { RouteEnum } from "src/app/shared/utils";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: "usernameOrEmail",
      type: "input",
      props: {
        label: "Username or email",
        placeholder: "Username or email",
        required: true,
      },
    },
    {
      key: "password",
      type: "input",
      props: {
        label: "Password",
        placeholder: "Password",
        required: true,
      },
    },
  ];

  registerUrl = RouteEnum.Register;

  constructor(private $auth: AuthService, private $title: Title) {
    $title.setTitle("Login");
  }

  loginWithGoogle() {
    // this.$auth.googleAuth();
  }

  login(model: any) {
    console.log(model);
  }
}
