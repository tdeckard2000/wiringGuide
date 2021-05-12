import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { EditPageService } from '../edit-page.service';

@Component({
  selector: 'app-new-manufacturer',
  templateUrl: './new-manufacturer.component.html',
  styleUrls: ['./new-manufacturer.component.css', '../edit-page-body/edit-page-body.component.css']
})
export class NewManufacturerComponent implements OnInit {

  constructor(overlayContainer: OverlayContainer, private editPageService: EditPageService) {
    overlayContainer.getContainerElement().classList.add('angularTheme');
  };

  canAddNewSection = true;
  newSectionsCount = [];
  newSectionValues: [{seriesName:string, modelsName:string }] = [{seriesName: "", modelsName: ""}];
  utilityTypeOptions = this.editPageService.utilityTypeOptions;

  onReturnHome(){
    this.editPageService.visibleTile$.next('Home');
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

    //Can't add new section unless series or model name is given
    for(let section of this.newSectionValues){
      if(section.seriesName.length < 1 && section.modelsName.length < 1){
        this.canAddNewSection = false;
        break
      }else{
        this.canAddNewSection = true;
      };
    };
  };

  ngOnInit(): void {
    interface SeriesModelNames{
      seriesName: string,
      modelsName: string
    };
  };

}
