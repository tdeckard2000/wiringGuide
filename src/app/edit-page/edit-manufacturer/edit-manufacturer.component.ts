import { Component, OnInit } from '@angular/core';
import { EditPageService } from '../edit-page.service';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MainService, MeterManufacturer } from '../../main.service';
// import { MeterManufacturer } from '../..'

@Component({
  selector: 'app-edit-manufacturer',
  templateUrl: './edit-manufacturer.component.html',
  styleUrls: ['./edit-manufacturer.component.css', '../edit-page-body/edit-page-body.component.css', '../edit-page.component.css']
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
  manufacturerData: MeterManufacturer = {manufacturer: "", utilityType: "", sections: [{seriesName:"", modelsName:""}]};
  showEditDiv = false;
  utilityTypeOptions = this.editPageService.utilityTypeOptions;
  utilityTypeSelection = "";
  selectedManufacturerName = new FormControl();

  clearManufacturerData(){
    this.manufacturerData = {manufacturer: "", utilityType: "", sections: [{seriesName:"", modelsName:""}]};
  }

  onCancel(){
    //Return to manufacturer selection div
    this.showEditDiv = false;
    this.selectedManufacturerName.setValue("");
    this.canClickNext = false;
    this.clearManufacturerData();
  }

  onClickNext(){
    //Move to edit div and populate with data from DB
    this.showEditDiv = true;
    this.clearManufacturerData();
    this.mainService.getMeterManufacturerData(this.utilityTypeSelection, this.selectedManufacturerName.value)
    .subscribe((data:object)=>{
      this.manufacturerData = data as MeterManufacturer;
      console.log(this.manufacturerData)
      this.setupManufacturerEditForm();
    });
  };

  onDeleteSection(data:any){
    //Determine which element should be deleted
    let sectionToDelete = (data.toElement.name).split(".")[1];
    //Remove that element from local copy of object
    this.manufacturerData.sections[sectionToDelete].deleted = true;
  };

  onNewSection(){
    //Add a new section with empty Series and Model names
    this.manufacturerData.sections.push({seriesName:"", modelsName:""});
  };

  onReturnHome(){
    //go back to home tile
    this.editPageService.visibleTile$.next('Home');
  };

  onSubmit(data:NgForm){
    console.log(data)
  }

  onUtilityType(data:{value:string}){
    //track selected utility type
    this.utilityTypeSelection = data.value;
    this.setManufacturerList();
  };

  setupManufacturerEditForm(){
    //populate edit form with current manufacturer values
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
