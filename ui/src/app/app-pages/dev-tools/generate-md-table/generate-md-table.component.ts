import { Component } from "@angular/core";
import { CheckboxChangeEvent } from "primeng/checkbox";

@Component({
  selector: "app-generate-md-table",
  templateUrl: "./generate-md-table.component.html",
  styleUrls: ["./generate-md-table.component.scss"],
})
export class GenerateMdTableComponent {
  addColumnAfter(_colIndex: number) {
    if (_colIndex >= 0 && _colIndex <= this.data[0].length) {
      this.data.forEach((row) => {
        row.splice(_colIndex + 1, 0, new MyString());
      });
    }
  }

  addColumnPrevious(_colIndex1: number) {
    this.data.forEach((row) => {
      row.splice(_colIndex1, 0, new MyString());
    });
  }

  addRowAbove(rowIndex: number): void {
    const newRow = [];
    for (let i = 0; i < this.data[0].length; i++) {
      newRow.push(new MyString());
    }

    this.data.splice(rowIndex, 0, newRow);
  }

  addRowBelow(rowIndex: number): void {
    const newRow = [];
    for (let i = 0; i < this.data[0].length; i++) {
      newRow.push(new MyString());
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
        arr.push(new MyString());
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

  alignSelectedCells(align: Alignment): void {
    const selectedCells = this.getSelectedCells();

    selectedCells.forEach((cell) => {
      cell.alignment = align;
    });
  }

  getSelectedCells(): MyString[] {
    const selectedCells: MyString[] = [];

    this.data.forEach((rowData) => {
      rowData.forEach((cell) => {
        if (cell.selected) {
          selectedCells.push(cell);
        }
      });
    });

    return selectedCells;
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

    // temporary function (lambda function)
    const getMaxLengthOfColumn = (colIndex: number) => {
      // str?.length
      // TH1: str = "abc" -> str.length = 3
      // TH2: str = undefined -> str.length = undefined || 0 = 0
      return Math.max(
        ...this.data.map((row) => row[colIndex].str?.length || 0)
      );
    };

    this.data.forEach((rowData, rowIndex) => {
      const row: string[] = [];
      rowData.forEach((cell, colIndex) => {
        if (cell.alignment === "left") {
          row.push(`| ${cell.str} `.padEnd(columnWidths[colIndex] + 3));
        } else if (cell.alignment === "right") {
          row.push("|" + `${cell.str} `.padStart(columnWidths[colIndex] + 2));
        } else {
          // TH1: maxLength even, currentLength even
          // | 12345678 | (8 - 2) / 2 + 1
          // |    12    |

          // TH2: maxLength even, currentLength odd
          // | 12345678 | (8 - 3) / 2 + 1
          // |   123    | (8 - 3) / 2 + 2

          // TH3: maxLength odd, currentLength even
          // | 123456789 | (9 - 4) / 2 + 1
          // |   1234    | (9 - 4) / 2 + 2

          // TH4: maxLength odd, currentLength odd
          // | 123456789 | (9 - 3) / 2 + 1
          // |    123    | (9 - 3) / 2 + 1
          const maxLength = getMaxLengthOfColumn(colIndex);
          const curLength = cell.str.length;
          if ((maxLength - curLength) % 2 === 0) {
            const numSpaces = (maxLength - curLength) / 2 + 1;
            const spaces = new Array(numSpaces + 1).join(" ");
            row.push("|" + spaces + cell.str + spaces);
          } else {
            const numSpaces = Math.floor((maxLength - curLength) / 2) + 1;
            const spaces = new Array(numSpaces + 1).join(" ");
            row.push("|" + spaces + cell.str + spaces + " ");
          }
        }
      });

      markdownTable.push(row.join("") + "|");
    });

    this.markdownTable = markdownTable.join("\n");
  }

  get allSelected(): boolean {
    return this.data.every((row) => row.every((cell) => cell.selected));
  }

  set allSelected(checked: boolean) {
    this.data.forEach((row) =>
      row.forEach((cell) => (cell.selected = checked))
    );
  }

  isColumnSelected(colIndex: number) {
    return this.data.every((row) => row[colIndex].selected);
  }

  toggleColumnSelected(colIndex: number, event: CheckboxChangeEvent) {
    this.data.forEach((row) => (row[colIndex].selected = !!event.checked));
  }

  isRowSelected(rowIndex: number) {
    return this.data[rowIndex].every((cell) => cell.selected);
  }

  toggleRowSelected(rowIndex: number, event: CheckboxChangeEvent) {
    this.data[rowIndex].forEach((cell) => (cell.selected = !!event.checked));
  }
}

type Alignment = "left" | "center" | "right";

class MyString {
  str = "";
  selected = false;
  alignment: Alignment = "left";
}
