import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EditPageService } from '../edit-page.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MainService } from 'src/app/main.service';
import { map, startWith } from 'rxjs/operators';

interface NewMeterForm {
  manufacturerUtilityType: string,
  manufacturerName: string,
  seriesName: string,
  modelsName: string,
  meterName: string,
  signalType: string,
  wiringProtocol: string,
  compatibleWithTR201: boolean,
  compatibleWithTR4: boolean,
  compatibleWithRR4: boolean,
  notes?: string
}

@Component({
  selector: 'app-new-meter',
  templateUrl: './new-meter.component.html',
  styleUrls: ['./new-meter.component.css', '../edit-page.component.css']
})
export class NewMeterComponent implements OnInit {

  constructor(private editPageService: EditPageService, public mainService: MainService, public dialog: MatDialog) { }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.manufacturerNames.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  };

  canClickSave = false;
  filteredDropdownOptions: Observable<string[]> | undefined;
  manufacturerNames = [""];
  selectedManufacturerName = new FormControl
  utilityTypeOptions = this.editPageService.utilityTypeOptions;
  utilityTypeSelection = "";

  onClickSave(){

  };

  onReturnHome(){
    this.editPageService.visibleTile$.next('Home');
  };

  onUtilityType(data:{value: string}){
    this.utilityTypeSelection = data.value;
    this.setManufacturerList();
  };

  setManufacturerList(){
    //define array for manufacturer drop down list
    this.mainService.getArrayOfManufacturersByUtility(this.utilityTypeSelection)
    .subscribe((data:object)=>{
      this.manufacturerNames = data as Array<string>;
      this.updateManufacturerDropdownList();
    });
    //clear input field
    this.selectedManufacturerName.setValue("");
  };

  updateManufacturerDropdownList(){
    //update manufacturer dropdown list with new options
    this.filteredDropdownOptions = this.selectedManufacturerName.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  };

  ngOnInit(): void {
  }

}
