import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxClickselectModule } from "ngx-clickselect";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxClickselectModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
