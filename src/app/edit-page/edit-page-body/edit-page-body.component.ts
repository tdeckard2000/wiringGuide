import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-edit-page-body',
  templateUrl: './edit-page-body.component.html',
  styleUrls: ['./edit-page-body.component.css']
})
export class EditPageBodyComponent implements OnInit {
  canAddNewSection = true;
  newSectionsCount = [];
  newSectionValues: [{seriesName:string, modelsName:string }] = [{seriesName: "", modelsName: ""}];
  radioSelection = "";
  radioOptions= [
    "Add a Meter",
    "Edit/Delete a Meter",
    "Add a Meter Manufacturer",
    "Edit/Delete a Meter Manufacturer",
  ];
  utilityTypeOptions = [
    "Electric",
    "Gas",
    "Run Time",
    "Thermal",
    "Water"
  ];
  visibleTile = "Home";

  onClickNext(){
    this.visibleTile = this.radioSelection;
  };

  onReturnHome(){
    this.visibleTile = 'Home';
  };

  onNewSection(){
    this.newSectionsCount.length ++;
    this.canAddNewSection = false;
    this.newSectionValues[this.newSectionsCount.length - 1] = ({"seriesName":"", "modelsName":""});
  };

  onRemoveSection(){
    this.newSectionsCount.length --;
    this.canAddNewSection = true;
    this.newSectionValues.pop();
  };

  //Store Series and Model Names Together (Add a Meter Manufacturer)
  onSeriesName(seriesName:string, modelsName:string, index:number){
    this.newSectionValues[index] =
      {
        "seriesName": seriesName,
        "modelsName": modelsName
      };

      console.log(this.newSectionValues)

    //Can't add new section unless series or model name is given
    for(let section of this.newSectionValues){
      if(section.seriesName.length < 1 && section.modelsName.length < 1){
        this.canAddNewSection = false;
        break
      }else{
        this.canAddNewSection = true;
      };
    };

    // if(seriesName.length > 0 || modelsName.length > 0){
    //   this.canAddNewSection = true;
    // }else{
    //   this.canAddNewSection = false;
    // };
  };

  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('angularTheme');
  };

  ngOnInit(): void {
    interface SeriesModelNames{
      seriesName: string,
      modelsName: string
    };
  };

}
