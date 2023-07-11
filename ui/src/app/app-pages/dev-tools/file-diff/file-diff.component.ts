import { Component } from "@angular/core";
import { finalize, map } from "rxjs";
import { ApiApi, Diff } from "src/app/shared/auto-generated/apis";

@Component({
  selector: "app-file-diff",
  templateUrl: "./file-diff.component.html",
  styleUrls: ["./file-diff.component.scss"],
})
export class FileDiffComponent {
  diffButtonDisabled = false;
  file1 = "";
  file2 = "";
  diffs: Diff[] = [];

  constructor(private $api: ApiApi) {}

  diff() {
    this.diffButtonDisabled = true;
    this.$api
      .diff([this.file1, this.file2])
      .pipe(
        map((items) => {
          this.diffs = items;
        }),
        finalize(() => {
          this.diffButtonDisabled = false;
        })
      )
      .subscribe();
  }

  getClass(diff: Diff) {
    switch (diff.operation) {
      case "DELETE":
        return "bg-red-200";
      case "EQUAL":
        break;
      case "INSERT":
        return "bg-green-200";
    }

    return "";
  }
}
