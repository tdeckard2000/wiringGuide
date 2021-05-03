import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { MeterDropdownItemComponent } from './meter-dropdown-item/meter-dropdown-item.component';
import { FormsModule } from '@angular/forms';
import { FilterMetersPipe } from './filter-meters.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { WiringModalComponent } from './wiring-modal/wiring-modal.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HomePageComponent } from './home-page/home-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { HttpClientModule } from '@angular/common/http';
import { EditPageTitleComponent } from './edit-page/edit-page-title/edit-page-title.component';
import { EditPageBodyComponent } from './edit-page/edit-page-body/edit-page-body.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    PageTitleComponent,
    MeterDropdownItemComponent,
    FilterMetersPipe,
    WiringModalComponent,
    HomePageComponent,
    EditPageComponent,
    EditPageTitleComponent,
    EditPageBodyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatTabsModule,
    HttpClientModule,
    MatRadioModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
