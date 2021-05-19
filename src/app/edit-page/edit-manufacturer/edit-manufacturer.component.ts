import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { EditPageService } from '../edit-page.service';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MainService, MeterManufacturer } from '../../main.service';
import { EditManufacturerFormData } from '../edit-page.service';
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

  //Form Data
  @ViewChild('f') public formData: NgForm = {} as NgForm;

  //Declarations
  canClickNext = false;
  filteredDropdownOptions: Observable<string[]> | undefined;
  formIsValid = false;
  manufacturerNames = [""];
  manufacturerData: MeterManufacturer = {manufacturer: "", utilityType: "", sections: [{seriesName:"", modelsName:""}]};
  showEditDiv = false;
  showSeriesModelNameMissingText = false;
  utilityTypeOptions = this.editPageService.utilityTypeOptions;
  utilityTypeSelection = "";
  selectedManufacturerName = new FormControl();

  buildFormObject(formData: EditManufacturerFormData){
    let formObject: MeterManufacturer = {} as MeterManufacturer;
    formObject.manufacturer = formData.editManufacturerName;
    console.log(formObject)

  };

  clearManufacturerData(){
    this.manufacturerData = {manufacturer: "", utilityType: "", sections: [{seriesName:"", modelsName:""}]};
  };

  onCancel(){
    //Return to manufacturer selection div
    this.showEditDiv = false;
    this.selectedManufacturerName.setValue("");
    this.canClickNext = false;
    this.clearManufacturerData();
  };

  onClickNext(){
    //Move to edit div and populate with data from DB
    this.showEditDiv = true;
    this.clearManufacturerData();
    this.mainService.getMeterManufacturerData(this.utilityTypeSelection, this.selectedManufacturerName.value)
    .subscribe((data:object)=>{
      this.manufacturerData = data as MeterManufacturer;
      this.setupManufacturerEditForm();
    });
  };

  onDeleteSection(data:any){
    //Determine which element should be deleted
    let sectionToDelete = (data.toElement.name).split(".")[1];
    //Remove that element from local copy of object (DOM will then update)
    this.manufacturerData.sections[sectionToDelete].deleted = true;
    //Allow DOM to update before validation
    setTimeout(()=>{
      this.validateForm();
    }, 0);
};

  onKeyUp(){
    this.validateForm();
  }

  onNewSection(){
    //Add a new section with empty Series and Model names
    this.manufacturerData.sections.push({seriesName:"", modelsName:""});
    this.formIsValid = false;
    this.validateForm();
  };

  onReturnHome(){
    //go back to home tile
    this.editPageService.visibleTile$.next('Home');
  };

  onSubmit(formData:EditManufacturerFormData){
    this.buildFormObject(formData);
    this.validateForm();
  };

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

  validateForm(){
    let manufacturerName = this.formData.form.value.editManufacturerName;
    let utilityType = this.formData.form.value.editUtilityType;
    let manufacturerSection = this.formData.form.value.manufacturerSection;
    let sectionValues = Object.values(manufacturerSection);

    //Ensure each section contains at least model OR series name
    for(let i=0; i<sectionValues.length; i+=2){
      let seriesName = sectionValues[i] as string;
      let modelsName = sectionValues[i+1] as string;
      if(seriesName.length < 1 && modelsName.length <1){
        this.showSeriesModelNameMissingText = true;
        return this.formIsValid = false;
      }
    }

    //Ensure Manufacturer Name exists
    if(manufacturerName.length<1){
      return this.formIsValid = false;
    }

    //Ensure Utility Type is valid
    if(!this.editPageService.utilityTypeOptions.includes(utilityType)){
      return this.formIsValid = false;
    }

    this.showSeriesModelNameMissingText = false;
    return this.formIsValid = true;
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
