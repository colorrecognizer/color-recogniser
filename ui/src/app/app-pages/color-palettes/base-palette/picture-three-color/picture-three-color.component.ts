import { Component, Input } from "@angular/core";
import { Color } from "src/app/shared/auto-generated/apis";

@Component({
  selector: "app-picture-three-color",
  templateUrl: "./picture-three-color.component.html",
  styleUrls: ["./picture-three-color.component.scss"],
})
export class PictureThreeColorComponent {
  @Input() colors: Color[] = [];
  @Input() reversed = false;

  get firstColor() {
    return this.colors[this.reversed ? 2 : 0];
  }
}
