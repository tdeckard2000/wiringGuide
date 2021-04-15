import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-meter-dropdown-item',
  templateUrl: './meter-dropdown-item.component.html',
  styleUrls: ['./meter-dropdown-item.component.css']
})

export class MeterDropdownItemComponent implements OnInit {
  dropdownOpen = false;
  panelOpenState = true;

  constructor() { }

  ngOnInit(): void {
  }

  onMeterItemClick(){
    this.dropdownOpen = this.dropdownOpen === false ? true : false;
    console.log('dropdown clicked: ' + this.dropdownOpen)
  }

}
