import { Router, UrlCreationOptions } from "@angular/router";

export * from "./routes";
export * from "./regex";
export * from "./table";
export * from "./geometry";
export * from "./color";

export class Utils {
  static isNullOrUndefined(object: unknown): object is null | undefined {
    return object === null || object === undefined;
  }

  static openUrlInNewWindow(
    $router: Router,
    commands: any[],
    navigationExtras?: UrlCreationOptions
  ) {
    const url = $router.serializeUrl(
      $router.createUrlTree(commands, navigationExtras)
    );

    window.open(url, "_blank");
  }
}
