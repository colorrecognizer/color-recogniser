import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { MessageService } from "primeng/api";
import { finalize } from "rxjs";
import { ApiApi } from "src/app/shared/auto-generated/apis";

@Component({
  selector: "app-tfn-generator",
  templateUrl: "./tfn-generator.component.html",
  styleUrls: ["./tfn-generator.component.scss"],
})
export class TfnGeneratorComponent {
  selectedDigits = ["9"];
  tfns: string[] = [];
  generateButtonDisabled = false;

  // Methods
  constructor(private $api: ApiApi, private $message: MessageService) {
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
      .generateTfn(this.selectedDigits)
      .pipe(
        finalize(() => {
          this.generateButtonDisabled = false;
        })
      )
      .subscribe((tfns) => {
        const tfn = tfns[0];
        this.tfns.unshift(tfn);
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
