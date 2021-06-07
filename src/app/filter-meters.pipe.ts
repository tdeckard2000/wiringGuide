import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMeters'
})
export class FilterMetersPipe implements PipeTransform {
  transform(meterData:Array<object> , searchBarText: string) {
    let filteredMeterData:any;
    //Begin filtering only if 3 characters are entered
    if(searchBarText && searchBarText.length >= 3){
      searchBarText = searchBarText.toLowerCase();
      filteredMeterData = meterData.filter((meter: any) => {

        //Include meter if manufacturer name matches
        let manufacturer = meter.manufacturer.toLowerCase();
        if(manufacturer.includes(searchBarText)){
          return true;
        };

        //Include meter if seriesName, seriesModel, or meterName matches
        let keepMeter = false;

        //Check Series Name
        if(meter.sections){
          meter.sections.forEach((section:any)=>{
            if(section.seriesName){
              let seriesName = section.seriesName.toLowerCase();
              if(seriesName.includes(searchBarText)){
                keepMeter = true;
              };
            };
          });
        };

        //Check Series Model
        if(meter.sections){
          meter.sections.forEach((section:any)=>{
            if(section.modelsName){
              let modelsName = section.modelsName.toLowerCase();
              if(modelsName.includes(searchBarText)){
                keepMeter = true;
              };
            };
          });
        };

        //Check Individual Meter Names
        if(meter.sections){
          meter.sections.forEach((section:any) => {
            if(!section.meters){return}
            section.meters.forEach((meter:any)=>{
              let meterName = meter.meterName;
              if(!meterName){return};
              meterName = meter.meterName.toLowerCase();
              if(meterName.includes(searchBarText)){
                keepMeter = true;
              };
            })
          });
        };
        return keepMeter;
      });

    }else{
      //If 3 characters are not enters, return all meters
      return meterData;
    };

    //Finally, return filtered results
    return filteredMeterData;
  };
};
