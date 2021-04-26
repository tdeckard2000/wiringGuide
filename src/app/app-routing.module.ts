import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { WiringModalComponent } from './wiring-modal/wiring-modal.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    
  },
  {
    path: 'edit',
    component: EditPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
