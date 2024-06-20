import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { finalize, map } from "rxjs";
import { BackgroundChangeService } from "src/app/shared/services/background-change.service";
import { environment } from "src/environments";

@Component({
  selector: "app-file-diff",
  templateUrl: "./file-diff.component.html",
  styleUrls: ["./file-diff.component.scss"],
})
export class FileDiffComponent {
  diffButtonDisabled = false;
  file1 = "";
  file2 = "";
  diffs: any[] = [];

  constructor(
    private $backgroundChange: BackgroundChangeService,
    private $http: HttpClient
  ) {}

  diff() {
    this.diffButtonDisabled = true;
    this.$http
      .post<any[]>(`${environment.serverlessUrl}/diff`, [
        this.file1,
        this.file2,
      ])
      .pipe(
        map((items) => {
          this.diffs = items;
          this.$backgroundChange.randomize();
        }),
        finalize(() => {
          this.diffButtonDisabled = false;
        })
      )
      .subscribe();
  }

  getClass(diff: any) {
    switch (diff[0]) {
      case -1:
        return "bg-red-200";
      case 0:
        break;
      case 1:
        return "bg-green-200";
    }

    return "";
  }
}
