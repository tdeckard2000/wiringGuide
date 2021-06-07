import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { EditPageService, ModalData } from '../edit-page.service';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MainService, MeterManufacturer } from '../../main.service';
import { EditManufacturerFormData } from '../edit-page.service';
import { MatDialog } from '@angular/material/dialog';
import { SavingModalComponent } from '../saving-modal/saving-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-edit-manufacturer',
  templateUrl: './edit-manufacturer.component.html',
  styleUrls: ['./edit-manufacturer.component.css', '../edit-page.component.css']
})

export class EditManufacturerComponent implements OnInit {

  constructor(private editPageService: EditPageService, private mainService: MainService, public dialog: MatDialog) { }

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
  manufacturerData: MeterManufacturer = {_id: "", manufacturer: "", utilityType: "", sections: [{seriesName:"", modelsName:""}]};
  ModalData: ModalData = {showLoadingAnimation: true, showSuccessText: false, showErrorText: false, errorPreview: "error info"};
  selectedManufacturerName = new FormControl();
  showEditDiv = false;
  showSeriesModelNameMissingTextError = false;
  utilityTypeOptions = this.editPageService.utilityTypeOptions;
  utilityTypeSelection = "";

  buildFormObject(formData: EditManufacturerFormData){
    //Get form data ready for database
    //update manufacturer name
    this.manufacturerData.manufacturer = formData.editManufacturerName;
    //update utility type (checking validity)
    if(this.editPageService.utilityTypeOptions.includes(formData.editUtilityType)){
      this.manufacturerData.utilityType = formData.editUtilityType;
    }else{
      console.warn("invalid utility type selected");
    };
    //update each section with new Series/Model names
    for(const section in formData.manufacturerSection){
      //split identifier (ex: editModelsName.1) into name and number
      let whatToUpdate = section.split(".")[0];
      let indexToUpdate = parseInt(section.split(".")[1]);
      if(whatToUpdate === "editModelsName"){
        this.manufacturerData.sections[indexToUpdate].modelsName = formData.manufacturerSection[section];
      }else if(whatToUpdate === 'editSeriesName'){
        this.manufacturerData.sections[indexToUpdate].seriesName = formData.manufacturerSection[section];
      };
    };
    //remove sections with no meters that have a 'deleted:true' field.
    //no need to archive deleted sections that have no meters associated
    if(this.manufacturerData.sections){
      for(let i = 0; i < this.manufacturerData.sections.length; i++){
        let section = this.manufacturerData.sections[i];
        if(section.deleted && section.deleted === true && (!section.meters || section.meters.length < 1)){
          this.manufacturerData.sections.splice(i,1);
          i--;
        };
      };
    };
    //send final object to DB
    this.sendToDB();
  };

  clearManufacturerData(){
    this.manufacturerData = {_id: "", manufacturer: "", utilityType: "", sections: [{seriesName:"", modelsName:""}]};
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
    this.showSeriesModelNameMissingTextError = false;
    this.mainService.getMeterManufacturerData(this.utilityTypeSelection, this.selectedManufacturerName.value)
    .subscribe((data:object)=>{
      this.manufacturerData = data as MeterManufacturer;
      this.setupManufacturerEditForm();
    });
  };

  onDeleteManufacturer(){
    //prepare modal
    this.ModalData.showLoadingAnimation = false;
    this.ModalData.errorPreview = "";
    this.ModalData.showErrorText = false;
    this.ModalData.showSuccessText = false;
    //open the "are you sure" modal & pass data to modal
    const ref = this.dialog.open(DeleteModalComponent, {
      data: {manufacturerData: this.manufacturerData, modalData: this.ModalData},
      disableClose: true
    });
    //when user clicks 'delete' on modal
    ref.componentInstance.onConfirmDelete.subscribe(()=>{
      this.ModalData.showLoadingAnimation = true;
      this.mainService.deleteManufacturer(this.manufacturerData._id).subscribe((data:any)=>{
        if(data.result && data.result.nModified > 0){
          //show "success" on modal
          setTimeout(()=>{
            this.ModalData.showLoadingAnimation = false;
            this.ModalData.showSuccessText = true;
          }, 1000)
        }else{
          this.ModalData.showLoadingAnimation = false;
          //show "error" on modal
          this.ModalData.showErrorText = true;
          //display error data in modal
          this.ModalData.errorPreview = data;
        };
      });
    });
    //when user clicks 'done' on modal (after successful delete)
    ref.componentInstance.onDone.subscribe(()=>{
      this.selectedManufacturerName.setValue("");
      this.showEditDiv = false;
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
    this.showSeriesModelNameMissingTextError = true;
    setTimeout(()=>{
      this.validateForm();
    }, 0);
  };

  openSaveModal(){
    //open the "saving" modal & pass data to modal
    this.dialog.open(SavingModalComponent, {
      data: this.ModalData,
      disableClose: true
    });
  };

  onReturnHome(){
    //go back to home tile
    this.editPageService.visibleTile$.next('Home');
  };

  onSubmit(formData:EditManufacturerFormData){
    //reset save modal values
    this.ModalData = {
      showLoadingAnimation: true,
      showErrorText: false,
      showSuccessText: false,
      errorPreview: ""
    };
    //open modal to show save progress
    this.openSaveModal();
    //prep object for DB
    this.buildFormObject(formData);
    //disable save button
    this.formIsValid = false;
  };

  onUtilityType(data:{value:string}){
    //track selected utility type
    this.utilityTypeSelection = data.value;
    this.setManufacturerList();
  };

  sendToDB(){
    this.mainService.postUpdatedMeterManufacturer(this.manufacturerData).subscribe((data: any)=>{
      //if save is successful
      if(data.result && data.result.nModified > 0){
        //show "success" on modal
        setTimeout(()=>{
          this.ModalData.showLoadingAnimation = false;
          this.ModalData.showSuccessText = true;
        }, 3000)
      }else{
        this.ModalData.showLoadingAnimation = false;
        //show "error" on modal
        this.ModalData.showErrorText = true;
        //display error data in modal
        this.ModalData.errorPreview = data;
      };
    });
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
    let sectionValues = manufacturerSection? Object.values(manufacturerSection) : [];

    //Ensure each section contains at least model OR series name
    for(let i=0; i<sectionValues.length; i+=2){
      let seriesName = sectionValues[i] as string;
      let modelsName = sectionValues[i+1] as string;
      if(seriesName.length < 1 && modelsName.length < 1){
        this.showSeriesModelNameMissingTextError = true;
        return this.formIsValid = false;
      }else{
        this.showSeriesModelNameMissingTextError = false;
      }
    }

    if(sectionValues.length < 1){
      this.showSeriesModelNameMissingTextError = false;
    }

    //Ensure Manufacturer Name exists
    if(manufacturerName.length<1){
      return this.formIsValid = false;
    }

    //Ensure Utility Type is valid
    if(!this.editPageService.utilityTypeOptions.includes(utilityType)){
      return this.formIsValid = false;
    }

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
