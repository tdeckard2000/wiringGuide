import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { EditPageService, ModalData } from '../edit-page.service';
import { MainService } from '../../main.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SavingModalComponent } from '../saving-modal/saving-modal.component';

@Component({
  selector: 'app-new-manufacturer',
  templateUrl: './new-manufacturer.component.html',
  styleUrls: ['./new-manufacturer.component.css', '../edit-page.component.css']
})
export class NewManufacturerComponent implements OnInit {

  constructor(overlayContainer: OverlayContainer,
    private editPageService: EditPageService,
    private mainService: MainService,
    public dialog: MatDialog) {
    overlayContainer.getContainerElement().classList.add('angularTheme');
  };

  canAddNewSection = true;
  canSave = false;
  manufacturerName = "";
  modalData: ModalData = {showLoadingAnimation: true, showSuccessText: false, showErrorText: false, errorPreview: "error info"};
  newSectionsCount = [];
  newSectionValues: [{seriesName:string, modelsName:string }] = [{seriesName: "", modelsName: ""}];
  utilityTypeSelected = "";
  utilityTypeOptions = this.editPageService.utilityTypeOptions;

  canClickSave(){
    if(this.manufacturerName.length > 0 && this.utilityTypeSelected.length > 0 && this.hasSeriesOrModelName()){
        return this.canSave = true;
      }
      return this.canSave = false;
    };

  onManufacturerName(manufacturerName:string){
    this.manufacturerName = manufacturerName;
    this.canClickSave();
  };

  onUtilityType(utilityType:any){
    utilityType = utilityType.value;
    this.utilityTypeSelected = utilityType;
    this.canClickSave();
  }

  onReturnHome(){
    this.editPageService.visibleTile$.next('Home');
  };

  onSave(){
    this.modalData.showErrorText = false;
    this.modalData.showSuccessText = false;
    this.modalData.showLoadingAnimation = true;
    this.openSaveModal();

    if(this.newSectionValues.some(section => section.modelsName !== '' || section.seriesName !== '')){
      this.newSectionValues.push({seriesName: '', modelsName: ''});
    };

    this.mainService.postNewMeterManufacturer(this.manufacturerName, this.utilityTypeSelected, this.newSectionValues)
    .subscribe((data:any)=>{
      if(data.insertedCount && data.insertedCount > 0){
        setTimeout(()=>{
          this.modalData.showLoadingAnimation = false;
          this.modalData.showSuccessText = true;
        }, 1000);
      }else{
        this.modalData.showLoadingAnimation = false;
        this.modalData.showErrorText = true;
        this.modalData.errorPreview = data;
      };
    });
  };

  onNewSection(){
    this.newSectionsCount.length ++;
    this.canAddNewSection = false;
    this.canSave = false;
    console.log(this.newSectionsCount)
    this.newSectionValues[this.newSectionsCount.length - 1] = ({"seriesName":"", "modelsName":""});
    console.log(this.newSectionValues)
  };

  onRemoveSection(){
    this.newSectionsCount.length --;
    this.newSectionValues.pop();
    this.canAddNewSection = this.hasSeriesOrModelName();
    this.canClickSave();
  };

  //Store Series and Model Names Together (Add a Meter Manufacturer)
  onSectionsName(seriesName:string, modelsName:string, index:number){
    console.log(index)
    this.newSectionValues[index] =
      {
        "seriesName": seriesName,
        "modelsName": modelsName
      };

      this.canAddNewSection = this.hasSeriesOrModelName();
      this.canClickSave();
    };

  openSaveModal(){
    //open the "saving" modal & pass data to modal
    let ref = this.dialog.open(SavingModalComponent, {
      data: this.modalData,
      disableClose: true
    });
    ref.componentInstance.clickedDone.subscribe(()=>{
      this.onReturnHome();
    });
  };

  //Check if Series or Model Name is Given for Each Section
  hasSeriesOrModelName(){
    for(let section of this.newSectionValues){
      //if there are no sections, can add a section
      if(this.newSectionsCount.length < 1){
        return true
      }
      if(section.seriesName.length < 1 && section.modelsName.length < 1){
        return false;
      }
    };

    return true;
  };

  ngOnInit(): void {
    interface SeriesModelNames{
      seriesName: string;
      seriesModel: string;
    };
  };

}
