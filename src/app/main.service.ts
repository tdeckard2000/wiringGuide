import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTabBody } from '@angular/material/tabs';

export interface MeterManufacturer{
  _id: string
  manufacturer: string,
  utilityType: string,
  sections: [{
    seriesName: string,
    modelsName: string,
    meters?:[{
      meterName?:string
    }],
    deleted?: boolean
  }];
};

export interface NewMeterForm{
  manufacturerName: string,
  utilityType: string,
  seriesName: string,
  modelsName: string,
  meterName: string,
  wiringProtocol: string,
  signalType: string,
  compatibleTR201: boolean,
  compatibleTR4: boolean,
  compatibleTR4X: boolean,
  compatibleRR4: boolean,
  publicNotes: string,
  internalNotes: string
};

interface NewSectionsArrayObject{
  seriesName:string,
  modelsName:string
}

interface SectionNamesArray{
  sections:[
    {
      'seriesName'?: string,
      'modelsName'?: string
    }
  ]
}

@Injectable({
  providedIn: 'root',

})


export class MainService {
  constructor(private http:HttpClient) {
    this.searchBarText$ = new BehaviorSubject(this.searchBarText);
  }

// ************************************
//       Track Search Bar Input
// ************************************

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  searchBarText = '';
  searchBarText$: BehaviorSubject<string>;

  updateString(newString:string){
    this.searchBarText$.next(newString);
  };

// ************************************
//          Server Requests
// ************************************

  deleteManufacturer(manufacturerId:string){
    //Set manufacturer "deleted" field to "true" (object is not actually deleted)
    const manufacturerIdObject = {manufacturerId : manufacturerId}
    return this.http.patch('http://localhost:3000/api/deleteManufacturer', manufacturerIdObject, this.httpOptions);
  };

  getAllMeters(){
    return this.http.get('http://localhost:3000/api/allmeters', {
      observe: 'body',
      responseType: 'json'
    });
  };

  getArrayOfManufacturersByUtility(utilityType:string){
    return this.http.get('http://localhost:3000/api/meterManufacturers/' + utilityType, {
      observe: 'body',
      responseType: 'json'
    });
  };

  getArrayOfSectionNamesByUtilityAndManufacturer(utilityType: string, manufacturerName: string){
    return this.http.get<SectionNamesArray>('http://localhost:3000/api/sectionData/' + utilityType + '/' + manufacturerName, {
      observe: 'body',
      responseType: 'json'
    });
  };

  getMeterManufacturerData(utilityType:string, manufacturerName:string){
    return this.http.get('http://localhost:3000/api/meterManufacturerData/' + utilityType + '/' + manufacturerName, {
      observe: 'body',
      responseType: 'json'
    });
  };

  postNewMeterManufacturer(manufacturerName: string, utilityTypeSelected: string, newSectionsArray: Array<NewSectionsArrayObject>){
    //Create object for DB
    let manufacturerObject = {
      manufacturer: manufacturerName,
      utilityType: utilityTypeSelected,
      sections: [] as Array<NewSectionsArrayObject>
    };

    //Add user defined sections to object
    newSectionsArray.forEach(element => {
      manufacturerObject.sections.push(element);
    });

    //If no user defined sections, add blank section (for storing meters within)
    if(newSectionsArray.length < 1){
      manufacturerObject.sections.push({
        seriesName: "",
        modelsName: "",
      });
    };

    return this.http.post('http://localhost:3000/api/newMeterManufacturer', manufacturerObject, this.httpOptions);
  }

  postUpdatedMeterManufacturer(meterManufacturerData:MeterManufacturer){
    return this.http.post('http://localhost:3000/api/updateMeterManufacturer', meterManufacturerData, this.httpOptions);
  }

}
