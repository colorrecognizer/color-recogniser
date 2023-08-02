import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { MessageService } from "primeng/api";
import { finalize, map } from "rxjs";
import {
  ApiApi,
  ContactUs,
  LoginRequest,
} from "src/app/shared/auto-generated/apis";

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.scss"],
})
export class ContactUsComponent {
  form = new FormGroup({});
  model = ContactUs.fromJS({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: "name",
      type: "input",
      props: {
        label: "Name",
        placeholder: "Terminus Jo",
        required: true,
      },
    },
    {
      key: "email",
      type: "input",
      props: {
        label: "Email",
        placeholder: "terminus.jo@email.com",
        required: true,
      },
      validators: {
        validation: ["email"],
      },
    },
    {
      key: "company",
      type: "input",
      props: {
        label: "Company",
        placeholder: "Your company",
      },
    },
    {
      key: "message",
      type: "textarea",
      props: {
        label: "Message",
        placeholder: "What we should improve...",
        required: true,
      },
    },
  ];

  constructor(private $api: ApiApi, private $message: MessageService) {}

  send() {
    this.form.disable();
    this.$api
      .sendContactUs(this.model)
      .pipe(
        map(() => {
          this.$message.add({
            severity: "success",
            summary: "Message sent to our team!",
            detail: "Thank you for your support!",
          });
        }),
        finalize(() => {
          this.form.enable();
        })
      )
      .subscribe();
  }
}
