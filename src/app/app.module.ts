import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { MeterDropdownItemComponent } from './meter-dropdown-item/meter-dropdown-item.component';
import { MainService} from './main.service';
import { FormsModule } from '@angular/forms';
import { FilterMetersPipe } from './filter-meters.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { WiringModalComponent } from './wiring-modal/wiring-modal.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    PageTitleComponent,
    MeterDropdownItemComponent,
    FilterMetersPipe,
    WiringModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatTabsModule
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
