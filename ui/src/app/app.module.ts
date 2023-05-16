import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegularlyUsedPrimengModule } from "./shared/regularly-used-primeng/regularly-used-primeng.module";
import { DEFAULT_CONFIG, Driver, NgForageOptions } from "ngforage";
import { FormsModule } from "@angular/forms";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { environment } from "src/environments/environment.prod";
import { BackButtonModule } from "./shared/back-button/back-button.module";
import { ThemeService } from "./shared/theme.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { HttpErrorHandlerService } from "./shared/services/http-error-handler.service";
import { ToastModule } from "primeng/toast";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RegularlyUsedPrimengModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BackButtonModule,
    ToastModule,
  ],
  providers: [
    // One way of configuring ngForage
    {
      provide: DEFAULT_CONFIG,
      useValue: {
        name: "ColorRecogniser",
        driver: [
          // defaults to indexedDB -> webSQL -> localStorage
          Driver.INDEXED_DB,
          Driver.LOCAL_STORAGE,
        ],
      } as NgForageOptions,
    },
    MessageService,
    ConfirmationService,
    {
      provide: ErrorHandler,
      useClass: HttpErrorHandlerService,
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
