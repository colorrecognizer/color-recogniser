import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-submit-button",
  templateUrl: "./submit-button.component.html",
  styleUrls: ["./submit-button.component.scss"]
})
export class SubmitButtonComponent {
  @Input() label = "Submit";
  @Input() icon = "pi pi-send";
  @Input() styleClass = "w-full";
  @Input() form!: FormGroup;


}
