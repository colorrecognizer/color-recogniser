import { Component } from "@angular/core";
@Component({
  selector: "app-generate-md-table",
  templateUrl: "./generate-md-table.component.html",
  styleUrls: ["./generate-md-table.component.scss"],
})
export class GenerateMdTableComponent {
  // no primitive types
  data: MyString[][] = [];

  constructor() {
    // rows
    for (let i = 0; i < 4; i++) {
      // cols
      const arr = [];
      for (let j = 0; j < 4; j++) {
        arr.push({
          str: "",
        });
      }

      // arr = ["", "", "", ""]

      this.data.push(arr);
    }

    /**
     * data = [
     * ["", "", "", ""],
     * ["", "", "", ""],
     * ["", "", "", ""],
     * ["", "", "", ""]
     * ]
     */
  }

  // num rows = num of elements in data
  getNumRows() {
    return this.data.length;
  }

  // num cols = number of elements in the first row
  getNumCols() {
    return this.data[0].length;
  }

  addNewColumn() {
    this.data.forEach((row) => row.push({ str: "" }));
  }

  // this.data = [
  //   ["hello", "mu"],
  //   ["hi", "mc"],
  //   ["bye", "ars"],
  // ];

  // this.data = [
  //   ["hello", "mu"],
  //   ["hi", "mc"],
  //   ["bye", "ars"],
  //   ["", ""]
  // ];
  addNewRow() {
    const newRow = [];
    for (let j = 0; j < this.getNumCols(); j++) {
      newRow.push({ str: "" });
    }
    this.data.push(newRow);
  }

  deleteLastColumn() {
    if (this.getNumCols() > 1) {
      this.data.forEach((row) => row.pop());
    }
  }

  deleteLastRow() {
    if (this.getNumRows() > 1) {
      this.data.pop();
    }
  }
}

interface MyString {
  str: string;
}
