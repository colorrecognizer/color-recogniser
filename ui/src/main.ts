import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { HIGHLIGHT_OPTIONS } from "ngx-highlightjs";

import { AppModule } from "./app/app.module";

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    providers: [
      {
        provide: HIGHLIGHT_OPTIONS,
        useValue: {
          fullLibraryLoader: () => import("highlight.js"),
        },
      },
    ],
  })
  .catch((err) => console.error(err));
