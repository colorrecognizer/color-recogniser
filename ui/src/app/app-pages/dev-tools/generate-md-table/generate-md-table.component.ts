import { Component } from "@angular/core";
@Component({
  selector: "app-generate-md-table",
  templateUrl: "./generate-md-table.component.html",
  styleUrls: ["./generate-md-table.component.scss"],
})
export class GenerateMdTableComponent {
  addColumnAfter(_colIndex: number) {
    if (_colIndex >= 0 && _colIndex <= this.data[0].length) {
      this.data.forEach((row) => {
        row.splice(_colIndex + 1, 0, { str: "" });
      });
    }
  }

  addColumnPrevious(_colIndex1: number) {
    this.data.forEach((row) => {
      row.splice(_colIndex1, 0, { str: "" });
    });
  }

  addRowAbove(rowIndex: number): void {
    const newRow = [];
    for (let i = 0; i < this.data[0].length; i++) {
      newRow.push({ str: "" });
    }

    this.data.splice(rowIndex, 0, newRow);
  }

  addRowBelow(rowIndex: number): void {
    const newRow = [];
    for (let i = 0; i < this.data[0].length; i++) {
      newRow.push({ str: "" });
    }
    this.data.splice(rowIndex + 1, 0, newRow);
  }

  deleteRow(rowIndex: number): void {
    this.data.splice(rowIndex, 1);
  }

  deleteColumn(colIndex: number): void {
    for (let i = 0; i < this.data.length; i++) {
      this.data[i].splice(colIndex, 1);
    }
  }

  // no primitive types
  data: MyString[][] = [];

  markdownTable = "";

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

  generateMarkdownTable() {
    const markdownTable: string[] = [];
    const columnWidths: any[] = [];

    this.data.forEach((rowData) => {
      rowData.forEach((cell, columnIndex) => {
        if (
          !columnWidths[columnIndex] ||
          cell.str.length > columnWidths[columnIndex]
        ) {
          columnWidths[columnIndex] = cell.str.length;
        }
      });
    });

    this.data.forEach((rowData) => {
      const row: string[] = [];
      rowData.forEach((cell, colIndex) => {
        row.push(`| ${cell.str} `.padEnd(columnWidths[colIndex] + 3));
      });
      markdownTable.push(row.join("") + "|");
    });

    this.markdownTable = markdownTable.join("\n");
  }
}

interface MyString {
  str: string;
}
