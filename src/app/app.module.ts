import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegularlyUsedPrimengModule } from "./shared/regularly-used-primeng/regularly-used-primeng.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RegularlyUsedPrimengModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
