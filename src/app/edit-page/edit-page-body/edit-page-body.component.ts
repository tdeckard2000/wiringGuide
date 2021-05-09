import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-edit-page-body',
  templateUrl: './edit-page-body.component.html',
  styleUrls: ['./edit-page-body.component.css']
})
export class EditPageBodyComponent implements OnInit {
  newSectionsCount = [];
  newSectionValues : Object[] = [];
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
  }

  onNewSection(){
    this.newSectionsCount.length ++;
  };

  onRemoveSection(){
    this.newSectionsCount.length --;
  }

  //Store Series and Model Names Together
  onSeriesName(seriesName:string, modelsName:string, index:number){
    this.newSectionValues[index] =
      {
        "seriesName": seriesName,
        "modelsName": modelsName
      };

    // Track if at least one of the two newest Series/Model fields has a value
    // if(this.newSectionValues[index].seriesName)
    console.log(this.newSectionValues)
  }

  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('angularTheme');
  };

  ngOnInit(): void {
  };

}
