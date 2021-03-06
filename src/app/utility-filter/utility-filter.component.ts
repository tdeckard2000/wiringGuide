import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-utility-filter',
  templateUrl: './utility-filter.component.html',
  styleUrls: ['./utility-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UtilityFilterComponent implements OnInit {

  activeFilter = 'None'

  onSetFilter(utilityFilter: 'Water' | 'Gas' | 'Electric' | 'Runtime' | 'Thermal'){
    if(this.activeFilter == utilityFilter){
      this.activeFilter = 'None';
      this.mainService.activeFilter = 'None';
    }else{
      this.activeFilter = utilityFilter;
      this.mainService.activeFilter = utilityFilter;
    }

  };

  constructor(private mainService:MainService) { }

  ngOnInit(): void {
  }

}
