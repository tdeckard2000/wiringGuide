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
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NewManufacturerComponent } from './edit-page/new-manufacturer/new-manufacturer.component';
import { EditPageHomeComponent } from './edit-page/edit-page-home/edit-page-home.component';
import { NewMeterComponent } from './edit-page/new-meter/new-meter.component';
import { EditMeterComponent } from './edit-page/edit-meter/edit-meter.component';
import { EditManufacturerComponent } from './edit-page/edit-manufacturer/edit-manufacturer.component';
import { HelpDropdownComponent } from './edit-page/help-dropdown/help-dropdown.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { SavingModalComponent } from './edit-page/saving-modal/saving-modal.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DeleteModalComponent } from './edit-page/delete-modal/delete-modal.component';

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
    NewManufacturerComponent,
    EditPageHomeComponent,
    NewMeterComponent,
    EditMeterComponent,
    EditManufacturerComponent,
    HelpDropdownComponent,
    SavingModalComponent,
    DeleteModalComponent,
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
    MatSliderModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: {color: 'primary'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
