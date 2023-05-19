import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment.prod";
import { enableProdMode } from "@angular/core";

if (environment.production) {
  enableProdMode();

  const disFunc = () => "Console has been disabled in production mode.";

  console.log = disFunc;
  console.error = disFunc;
  console.warn = disFunc;

  Object.freeze(console);
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
