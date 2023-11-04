import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegularlyUsedPrimengModule } from "./shared/modules/regularly-used-primeng.module";
import { DEFAULT_CONFIG, Driver, NgForageOptions } from "ngforage";
import { FormsModule } from "@angular/forms";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { BackButtonModule } from "./shared/components/back-button/back-button.module";
import { ConfirmationService, MessageService } from "primeng/api";
import { HttpErrorHandlerService } from "./shared/services/http-error-handler.service";
import { ToastModule } from "primeng/toast";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthService } from "./shared/services/auth.service";
import { AuthGuard } from "./shared/services/auth.guard";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./shared/services/token.interceptor";
import { API_BASE_URL } from "./shared/auto-generated/apis";
import { environment } from "src/environments/environment";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { AngularFireAnalyticsModule } from "@angular/fire/compat/analytics";
import { ScrollTopModule } from "primeng/scrolltop";
import { FormlyFormModule } from "./shared/components/formly-form/formly-form.module";
import { HowToMixModule } from "./shared/components/how-to-mix/how-to-mix.module";
import { RouteReuseStrategy } from "@angular/router";
import { CustomReuseStrategy } from "./shared/utils/custom-reuse-strategy";

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RegularlyUsedPrimengModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAnalyticsModule,
    BackButtonModule,
    ToastModule,
    FormlyFormModule,
    HttpClientModule,
    ConfirmPopupModule,
    HowToMixModule,
    ScrollTopModule,
    ConfirmDialogModule,
    DialogModule,
  ],
  providers: [
    // One way of configuring ngForage
    {
      provide: DEFAULT_CONFIG,
      useValue: {
        name: "ColorRecognizer",
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
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: API_BASE_URL,
      useValue: environment.apiUrl,
    },
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
