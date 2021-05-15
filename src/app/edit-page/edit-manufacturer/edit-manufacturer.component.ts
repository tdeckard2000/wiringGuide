import { Component, OnInit } from '@angular/core';
import { EditPageService } from '../edit-page.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MainService, MeterManufacturer } from '../../main.service';
// import { MeterManufacturer } from '../..'

@Component({
  selector: 'app-edit-manufacturer',
  templateUrl: './edit-manufacturer.component.html',
  styleUrls: ['./edit-manufacturer.component.css', '../edit-page-body/edit-page-body.component.css']
})

export class EditManufacturerComponent implements OnInit {

  constructor(private editPageService: EditPageService, private mainService: MainService) { }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.manufacturerNames.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  };

  //Declarations
  canClickNext = false;
  canSave = false;
  filteredDropdownOptions: Observable<string[]> | undefined;
  manufacturerNames = [""];
  manufacturerData: MeterManufacturer = {manufacturer: "", utilityType: "", sections: []};
  showEditDiv = false;
  utilityTypeOptions = this.editPageService.utilityTypeOptions;
  utilityTypeSelection = "";

  //Form Controls
  manufacturerName = new FormControl;
  selectedManufacturerName = new FormControl();
  utilityType = new FormControl;

  clearManufacturerData(){
    this.manufacturerData = {manufacturer: "", utilityType: "", sections: []};
  }

  onCancel(){
    this.showEditDiv = false;
    this.selectedManufacturerName.setValue("");
    this.canClickNext = false;
    this.clearManufacturerData();
  }

  onClickNext(){
    this.showEditDiv = true;
    this.clearManufacturerData();
    this.mainService.getMeterManufacturerData(this.utilityTypeSelection, this.selectedManufacturerName.value)
    .subscribe((data:object)=>{
      this.manufacturerData = data as MeterManufacturer;
      console.log(this.manufacturerData)
      this.setupManufacturerEditForm();
    });
  };

  onReturnHome(){
    //go back to home tile
    this.editPageService.visibleTile$.next('Home');
  };

  onSave(){

  };

  onUtilityType(data:{value:string}){
    //track selected utility type
    this.utilityTypeSelection = data.value;
    this.setManufacturerList();
  };

  setupManufacturerEditForm(){
    this.manufacturerName.setValue(this.manufacturerData.manufacturer);
    this.utilityType.setValue(this.manufacturerData.utilityType);
  }

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

  validateManufacturerSelection(){
    //ensure manufacturer name inputted exists
    let selectedManufacturerName = this.selectedManufacturerName.value;
    if(this.manufacturerNames.includes(selectedManufacturerName) && selectedManufacturerName.length){
      this.canClickNext = true;
      return
    };
    this.canClickNext = false;
  };

  ngOnInit() {
    //when manufacturer name changes
    this.selectedManufacturerName.valueChanges.subscribe((value:any)=>{
      this.validateManufacturerSelection();
    })
  }
}
