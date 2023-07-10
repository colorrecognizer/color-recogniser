import { Component, ViewChild } from "@angular/core";
import { finalize, map } from "rxjs";
import { ApiApi } from "src/app/shared/auto-generated/apis";

@Component({
  selector: "app-file-diff",
  templateUrl: "./file-diff.component.html",
  styleUrls: ["./file-diff.component.scss"],
})
export class FileDiffComponent {
  diffButtonDisabled = false;
  file1 = "";
  file2 = "";

  constructor(private $api: ApiApi) {}

  diff() {
    this.diffButtonDisabled = true;
    this.$api
      .diff([this.file1, this.file2])
      .pipe(
        map((items) => {
          console.log(items);
        }),
        finalize(() => {
          this.diffButtonDisabled = false;
        })
      )
      .subscribe();
  }
}
