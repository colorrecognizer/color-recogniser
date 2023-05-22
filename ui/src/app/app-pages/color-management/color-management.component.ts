import { Component, OnDestroy } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { finalize, map } from "rxjs";
import {
  Color,
  ColorApi,
  FilterRequest,
  SortRequest,
} from "src/app/shared/auto-generated/apis";
import { ColorComponent } from "./color/color.component";
import { SearchRequest } from "src/app/shared/auto-generated/apis";
import { TableLazyLoadEvent } from "primeng/table";
import { TableUtils, Utils } from "src/app/shared/utils";

@Component({
  selector: "app-color-management",
  templateUrl: "./color-management.component.html",
  styleUrls: ["./color-management.component.scss"],
})
export class ColorManagementComponent implements OnDestroy {
  colors: Color[] = [];
  colorTableLoading = false;
  colorEditorDialogRef?: DynamicDialogRef;
  totalColors = 0;
  colorTableLazyLoadEvent?: TableLazyLoadEvent;

  constructor(
    private $colorApi: ColorApi,
    private $message: MessageService,
    private $confirmation: ConfirmationService,
    private $dialog: DialogService
  ) {}

  ngOnDestroy(): void {
    if (this.colorEditorDialogRef) this.colorEditorDialogRef.close();
  }

  refresh() {
    if (
      Utils.isNullOrUndefined(this.colorTableLazyLoadEvent) ||
      Utils.isNullOrUndefined(this.colorTableLazyLoadEvent?.first) ||
      Utils.isNullOrUndefined(this.colorTableLazyLoadEvent?.rows)
    ) {
      return;
    }

    this.colorTableLazyLoadEvent.sortField =
      this.colorTableLazyLoadEvent.sortField || "name";

    this.colorTableLazyLoadEvent.sortOrder =
      this.colorTableLazyLoadEvent.sortOrder || 1;

    const filters: FilterRequest[] = [];
    if (this.colorTableLazyLoadEvent.filters?.["name"]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filter = this.colorTableLazyLoadEvent.filters?.["name"] as any;
      if (!Utils.isNullOrUndefined(filter.value)) {
        filters.push(
          new FilterRequest({
            key: "name",
            operator: TableUtils.convertMatchModeToOperator(filter.matchMode),
            fieldType: "STRING",
            value: filter.value,
          })
        );
      }
    }

    this.colorTableLoading = true;
    this.$colorApi
      .search(
        new SearchRequest({
          filters: filters,
          sorts: [
            new SortRequest({
              key: "name",
              direction:
                this.colorTableLazyLoadEvent.sortField === "name" &&
                this.colorTableLazyLoadEvent.sortOrder > 0
                  ? "ASC"
                  : "DESC",
            }),
          ],
          page:
            this.colorTableLazyLoadEvent.first /
            this.colorTableLazyLoadEvent.rows,
          size: this.colorTableLazyLoadEvent.rows || undefined,
        })
      )
      .pipe(
        map((page) => {
          this.colors = page.content || [];
          this.totalColors = page.totalElements || 0;
        }),
        finalize(() => (this.colorTableLoading = false))
      )
      .subscribe();
  }

  loadColors(event: TableLazyLoadEvent) {
    this.colorTableLazyLoadEvent = event;
    setTimeout(() => {
      this.refresh();
    });
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

  openColorEditor(color?: Color) {
    this.colorEditorDialogRef = this.$dialog.open(ColorComponent, {
      header: color ? "Edit color" : "Add color",
      draggable: true,
      data: {
        color: color,
      },
    });

    this.colorEditorDialogRef.onClose.subscribe(() => {
      this.refresh();
    });
  }
}
