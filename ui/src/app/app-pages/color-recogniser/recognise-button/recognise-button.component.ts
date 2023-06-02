import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-recognise-button",
  templateUrl: "./recognise-button.component.html",
  styleUrls: ["./recognise-button.component.scss"],
})
export class RecogniseButtonComponent {
  @Output() clicked = new EventEmitter();

  _disabled = false;
  @Input() set disabled(value: boolean) {
    this._disabled = value;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  click() {
    this.clicked.emit();
  }
}
