import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { MeterDropdownItemComponent } from './meter-dropdown-item/meter-dropdown-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    PageTitleComponent,
    MeterDropdownItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
