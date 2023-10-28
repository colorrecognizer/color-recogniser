import { Component } from "@angular/core";

@Component({
  selector: "app-generate-md-table",
  templateUrl: "./generate-md-table.component.html",
  styleUrls: ["./generate-md-table.component.scss"],
})
export class GenerateMdTableComponent {
  data = [
    { id: 1, name: " ", price: " ", description: " ", detail: " ", abc: " "},
    { id: 2, name: " ", price: " ", description: " ", detail: " ", abc: " " },
    { id: 3, name: " ", price: " ", description: " ", detail: " ", abc: " " },
    { id: 4, name: " ", price: " ", description: " ", detail: " ", abc: " " },
    { id: 5, name: " ", price: " ", description: " ", detail: " ", abc: " " },
  ];
}
