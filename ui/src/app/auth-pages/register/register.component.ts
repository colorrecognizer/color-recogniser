import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { finalize, of, switchMap } from "rxjs";
import { RegisterRequest, UserApi } from "src/app/shared/auto-generated/apis";
import { AuthService } from "src/app/shared/services/auth.service";
import { RegexUtils, RouteEnum } from "src/app/shared/utils";

@Component({
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  form = new FormGroup({});
  model = new RegisterRequest({
    username: "yen_admin",
    email: "yenngo20199@gmail.com",
    password: "Long@123",
  });

  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: "email",
      type: "input",
      props: {
        type: "email",
        label: "Email",
        placeholder: "color@recogniser.com",
        required: true,
      },
      validators: {
        validation: ["email"],
      },
    },
    {
      key: "username",
      type: "input",
      props: {
        label: "Username",
        placeholder: "Username",
        required: true,
        pattern: RegexUtils.USERNAME,
      },
      validation: {
        messages: {
          pattern: () => `The username consists of 8 to 30 characters inclusive.
The username can only contain alphanumeric characters and underscores (_).
The first character of the username must be an alphabetic character.`,
        },
      },
    },

    {
      key: "password",
      type: "input",
      props: {
        type: "password",
        label: "Password",
        placeholder: "Password",
        required: true,
        pattern: RegexUtils.PASSWORD,
      },
      validation: {
        messages: {
          pattern: () => `At least one digit [0-9].
At least one lowercase character [a-z].
At least one uppercase character [A-Z].
At least one special character [*.!@#$%^&(){}[]:;<>,.?/~_+-=|\\].
At least 8 characters in length, but no more than 32.`,
        },
      },
    },
  ];

  registerUrl = RouteEnum.Register;

  constructor(
    private $auth: AuthService,
    private $title: Title,
    private $userApi: UserApi
  ) {
    $title.setTitle("Login");
  }

  loginWithGoogle() {}

  register() {
    this.form.disable();
    this.$userApi
      .register(this.model)
      .pipe(
        switchMap((res) => {
          console.log(res?.token);
          return of(undefined);
        }),
        finalize(() => {
          this.form.enable();
        })
      )
      .subscribe();
  }
}
