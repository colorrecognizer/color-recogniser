import { Component, Input } from "@angular/core";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-copy-to-clipboard-button",
  templateUrl: "./copy-to-clipboard-button.component.html",
  styleUrls: ["./copy-to-clipboard-button.component.scss"],
})
export class CopyToClipboardButtonComponent {
  @Input() content?: string;
  @Input() contentDisplayed = true;

  constructor(private $message: MessageService) {}

  click() {
    if (!this.content) return;
    // Copy the text inside the text field
    navigator.clipboard.writeText(this.content);
    this.$message.add({
      severity: "info",
      summary: "",
      detail:
        "Copied to clipboard" +
        (this.contentDisplayed ? `: ${this.content}` : "") +
        ".",
      icon: "pi pi-copy",
    });
  }
}
