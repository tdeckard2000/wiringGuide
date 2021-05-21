import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { EditPageService } from '../edit-page.service';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-new-manufacturer',
  templateUrl: './new-manufacturer.component.html',
  styleUrls: ['./new-manufacturer.component.css', '../edit-page-body/edit-page-body.component.css']
})
export class NewManufacturerComponent implements OnInit {

  constructor(overlayContainer: OverlayContainer,
    private editPageService: EditPageService,
    private mainService: MainService) {
    overlayContainer.getContainerElement().classList.add('angularTheme');
  };

  canAddNewSection = true;
  canSave = false;
  manufacturerName = "";
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
    this.mainService.postNewMeterManufacturer(this.manufacturerName, this.utilityTypeSelected, this.newSectionValues)
    .subscribe((data:any)=>{
      //Add user feedback here
    });
  };

  onNewSection(){
    this.newSectionsCount.length ++;
    this.canAddNewSection = false;
    this.canSave = false;
    this.newSectionValues[this.newSectionsCount.length - 1] = ({"seriesName":"", "modelsName":""});
  };

  onRemoveSection(){
    this.newSectionsCount.length --;
    this.newSectionValues.pop();
    this.canAddNewSection = this.hasSeriesOrModelName();
    this.canClickSave();
  };

  //Store Series and Model Names Together (Add a Meter Manufacturer)
  onSeriesName(seriesName:string, modelsName:string, index:number){
    this.newSectionValues[index] =
      {
        "seriesName": seriesName,
        "modelsName": modelsName
      };

      this.canAddNewSection = this.hasSeriesOrModelName();
      this.canClickSave();
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
