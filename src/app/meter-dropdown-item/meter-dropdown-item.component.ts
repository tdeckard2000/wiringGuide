import { Component, OnInit} from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-meter-dropdown-item',
  templateUrl: './meter-dropdown-item.component.html',
  styleUrls: ['./meter-dropdown-item.component.css']
})

export class MeterDropdownItemComponent implements OnInit {
  dropdownOpen: {[k:number]:boolean} = {};
  panelOpenState = true;
  searchBarText = '';

  constructor(private mainService : MainService){}

  // All meter data stored here
  meterDataWater = this.mainService.meterData;

  ngOnInit(): void {
    this.mainService.searchBarText$.subscribe(data =>{
      this.searchBarText = data;
    });
    // this.testString = this.mainService.typedString$;
  }

  onMeterItemClick(i:any){
    //hide meter manufacturer underline when tile is open
    //note: removing element from DOM causes page to 'jump'
    //so set opacity to 0
    this.dropdownOpen[i] = this.dropdownOpen[i] === true ? false : true;
  }
}
