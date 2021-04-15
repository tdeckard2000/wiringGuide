import { Component, OnInit, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-meter-dropdown-item',
  templateUrl: './meter-dropdown-item.component.html',
  styleUrls: ['./meter-dropdown-item.component.css']
})
export class MeterDropdownItemComponent implements OnInit {
  @ViewChild(MatAccordion, { static: true }) accordion: MatAccordion = new MatAccordion;

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
