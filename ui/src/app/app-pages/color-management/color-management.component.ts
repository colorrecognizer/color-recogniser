import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { finalize, map, switchMap } from "rxjs";
import { Color, ColorApi } from "src/app/shared/auto-generated/apis";
import { ColorPickerTypeComponent } from "src/app/shared/modules/formly-form/color-picker-type/color-picker-type.component";
import { ColorComponent } from "./color/color.component";

@Component({
  selector: "app-color-management",
  templateUrl: "./color-management.component.html",
  styleUrls: ["./color-management.component.scss"],
})
export class ColorManagementComponent implements OnInit, OnDestroy {
  colors: Color[] = [];
  colorTableLoading = false;
  colorEditorDialogRef?: DynamicDialogRef;

  constructor(
    private $colorApi: ColorApi,
    private $message: MessageService,
    private $confirmation: ConfirmationService,
    private $dialog: DialogService
  ) {}

  ngOnDestroy(): void {
    if (this.colorEditorDialogRef) this.colorEditorDialogRef.close();
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.colorTableLoading = true;
    this.$colorApi
      .getAll()
      .pipe(
        map((colors) => (this.colors = colors)),
        finalize(() => (this.colorTableLoading = false))
      )
      .subscribe();
  }

  getColorHex(color: Color) {
    const r = color.red?.toString(16).padStart(2, "0");
    const g = color.green?.toString(16).padStart(2, "0");
    const b = color.blue?.toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }

  deleteColor(event: Event, color: Color) {
    this.$confirmation.confirm({
      target: event.target || undefined,
      message: `Delete color [${color.name}]?`,
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        if (!color.id) return;

        this.$colorApi
          .deleteById(color.id)
          .pipe(
            map(() => {
              this.$message.add({
                severity: "success",
                summary: "Success",
                detail: `Color ${color.name} is deleted successfully!`,
              });

              this.refresh();
            })
          )
          .subscribe();
      },
    });
  }

  openColorEditor(color: Color) {
    this.colorEditorDialogRef = this.$dialog.open(ColorComponent, {
      header: "Edit color",
      draggable: true,
      data: {
        color: color,
      },
    });
  }
}
