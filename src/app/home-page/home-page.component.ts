import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { MeterDropdownItemComponent } from '../meter-dropdown-item/meter-dropdown-item.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(public mainService:MainService) { }

  dropdownOpen:Array<boolean> = [];
  meterData: Array<object> = [];
  searchBarText = '';

  populateDropdownOpenArray(meterData:Array<object>){
    meterData.forEach((itemInArray:object)=>{
      this.dropdownOpen.push(false)
    });
  }

  ngOnInit(): void {
    this.mainService.getAllMeters().subscribe((res:any)=>{
      this.meterData = res;
      this.populateDropdownOpenArray(this.meterData);
    });

    this.mainService.searchBarText$.subscribe(data =>{
      this.searchBarText = data;
    });
  }

}
