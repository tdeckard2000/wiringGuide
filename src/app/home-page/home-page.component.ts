import { ThrowStmt } from '@angular/compiler';
import { chainedInstruction } from '@angular/compiler/src/render3/view/util';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MainService, MeterManufacturer } from '../main.service';
import { MeterDropdownItemComponent } from '../meter-dropdown-item/meter-dropdown-item.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomePageComponent implements OnInit {

  constructor(public mainService:MainService, private _change: ChangeDetectorRef) { }

  dropdownOpen:Array<boolean> = [];
  meterData: Array<MeterManufacturer> = [];
  searchBarText = '';
  manufacturersElectric: Array<MeterManufacturer> = [];
  manufacturersGas: Array<MeterManufacturer> = [];
  manufacturersRuntime: Array<MeterManufacturer> = [];
  manufacturersThermal: Array<MeterManufacturer> = [];
  manufacturersWater: Array<MeterManufacturer> = [];

  groupManufacturersByUtilityType(meterData: Array<MeterManufacturer>){
    meterData.forEach((manufacturer: MeterManufacturer) => {
      if(manufacturer.utilityType === 'Electric'){
        this.manufacturersElectric.push(manufacturer)
      }else if(manufacturer.utilityType === 'Gas'){
        this.manufacturersGas.push(manufacturer)
      }else if(manufacturer.utilityType === 'Runtime'){
        this.manufacturersRuntime.push(manufacturer)
      }else if(manufacturer.utilityType === 'Thermal'){
        this.manufacturersThermal.push(manufacturer)
      }else if(manufacturer.utilityType === 'Water'){
        this.manufacturersWater.push(manufacturer)
      }
    });
  };

  populateDropdownOpenArray(meterData:Array<object>){
    meterData.forEach((itemInArray:object)=>{
      this.dropdownOpen.push(false)
    });
  }

  ngOnInit(): void {
    this.mainService.getAllMeters().subscribe((res:any)=>{
      this.meterData = res;
      this.populateDropdownOpenArray(this.meterData);
      this.groupManufacturersByUtilityType(this.meterData);
      this._change.markForCheck();
    });


    this.mainService.searchBarText$.subscribe(data =>{
      this.searchBarText = data;
      this._change.markForCheck();
    });
  }

}
