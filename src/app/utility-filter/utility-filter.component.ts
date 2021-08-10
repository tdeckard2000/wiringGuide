import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-utility-filter',
  templateUrl: './utility-filter.component.html',
  styleUrls: ['./utility-filter.component.css']
})
export class UtilityFilterComponent implements OnInit {

  activeFilter = 'water'

  onSetFilter(utilityFilter: 'water' | 'gas' | 'electric'){
    this.activeFilter = utilityFilter;
  };

  constructor() { }

  ngOnInit(): void {
  }

}
