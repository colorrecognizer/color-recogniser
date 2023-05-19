import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { MessageService } from "primeng/api";
import { ApiException } from "../auto-generated/apis";

@Injectable({
  providedIn: "root",
})
export class HttpErrorHandlerService implements ErrorHandler {
  constructor(private $message: MessageService, private $zone: NgZone) {}

  handleError(error: any): void {
    if (!error) {
      return;
    }

    if(error.isApiException) {
      const response = JSON.parse(error.response);
      error.message = response.reason;
    }

    const errorMessage = error.message || "Undefined error!";
    console.error(errorMessage); // Only show messages on console

    // Don't show messages for some specific errors
    if (
      error.message ===
      "Cannot read properties of null (reading 'offsetParent')"
    ) {
      return;
    }

    this.$zone.run(() => {
      this.$message.add({
        severity: "error",
        summary: "Error occurred",
        detail: errorMessage,
      });
    });
  }
}
