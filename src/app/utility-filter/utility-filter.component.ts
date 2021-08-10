import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-utility-filter',
  templateUrl: './utility-filter.component.html',
  styleUrls: ['./utility-filter.component.css']
})
export class UtilityFilterComponent implements OnInit {

  activeFilter = 'water'

  onSetFilter(utilityFilter: 'water' | 'gas' | 'electric'){
    this.activeFilter = utilityFilter;
    this.mainService.activeFilter = utilityFilter;
  };

  constructor(private mainService:MainService) { }

  ngOnInit(): void {
  }

}
