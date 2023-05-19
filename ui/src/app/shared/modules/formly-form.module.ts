import { NgModule } from "@angular/core";
import {
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { FormlyPrimeNGModule } from "@ngx-formly/primeng";
import { FormlyModule } from "@ngx-formly/core";

const modules = [
  ReactiveFormsModule,
  FormlyModule.forRoot({
    validators: [{ name: "email", validation: Validators.email }],
    validationMessages: [
      { name: "email", message: "Invalid email address" },
      { name: "required", message: "This field is required" },
    ],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any,
  FormlyPrimeNGModule,
];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
})
export class FormlyFormModule {}
