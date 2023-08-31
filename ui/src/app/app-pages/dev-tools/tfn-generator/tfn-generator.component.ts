import { Component } from "@angular/core";
import { MessageService } from "primeng/api";
import { finalize } from "rxjs";
import { ApiApi } from "src/app/shared/auto-generated/apis";
import { BackgroundChangeService } from "src/app/shared/services/background-change.service";

@Component({
  selector: "app-tfn-generator",
  templateUrl: "./tfn-generator.component.html",
  styleUrls: ["./tfn-generator.component.scss"],
})
export class TfnGeneratorComponent {
  selectedDigits = ["9"];
  tfns: string[] = [];
  generateButtonDisabled = false;
  startedWithZero = false;

  // Methods
  constructor(
    private $api: ApiApi,
    private $message: MessageService,
    private $backgroundChange: BackgroundChangeService
  ) {
    // $title.setTitle("TFN Generator");
  }

  selectDigit(digit: string) {
    if (this.selectedDigits.length) return;

    if (digit === "8") {
      this.selectedDigits.push("9");
      return;
    }

    this.selectedDigits.push("8");
  }

  generate() {
    this.generateButtonDisabled = true;
    this.$api
      .generateTfn(this.startedWithZero, this.selectedDigits)
      .pipe(
        finalize(() => {
          this.generateButtonDisabled = false;
        })
      )
      .subscribe((tfns) => {
        const tfn = tfns[0];
        this.tfns.unshift(tfn);
        this.$backgroundChange.randomize();
      });
  }

  copyToClipboard(tfn: string) {
    navigator.clipboard.writeText(tfn);
    this.$message.add({
      severity: "info",
      summary: "",
      detail: `Copied to clipboard: ${tfn}`,
      icon: "pi pi-copy",
    });
  }
}
