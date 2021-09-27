import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTabBody } from '@angular/material/tabs';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

export interface MeterManufacturer{
  _id: string
  manufacturer: string,
  utilityType: string,
  sections: [{
    seriesName: string,
    modelsName: string,
    meters?:[{
      meterName: string,
      wiringProtocol: string,
      signalType: 'Encoded' | 'Integrated' | 'Pulse',
      compatibleWith: {
        TR201: boolean,
        TR4: boolean,
        TR4X: boolean,
        RR4: boolean
      },
      publicNotes: string,
      internalNotes: string
    }],
    deleted?: boolean
  }];
};

export interface MeterData{
  meterName: string,
  wiringProtocol: string,
  signalType: 'Encoded' | 'Integrated' | 'Pulse',
  compatibleWith: {
    TR201: boolean,
    TR4: boolean,
    TR4X: boolean,
    RR4: boolean
  },
  publicNotes: string,
  internalNotes: string
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

export interface NewSectionsArrayObject{
  seriesName:string | null,
  modelsName:string | null
};

interface SectionNamesArray{
  sections:[
    {
      'seriesName'?: string,
      'modelsName'?: string,
      'deleted'?: boolean
    }
  ]
};

interface MeterLocation{
  'utilityType': string,
  'manufacturer': string,
  'seriesAneModelsName': string,
  'meterName': string
};

interface UpdatedMeterInfo{
  'meterName': string,
  'wiringProtocol': string,
  'compatibleTR201': boolean,
  'compatibleTR4': boolean,
  'compatibleTR4X': boolean,
  'compatibleRR4': boolean,
  'publicNote': string,
  'internalNote': string
};

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
  activeFilter = 'None';
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
    return this.http.patch('/api/deleteManufacturer', manufacturerIdObject, this.httpOptions);
  };

  deleteMeter(meterLocation: MeterLocation){
    //Remove meter data from DB
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: meterLocation
    };

    return this.http.delete('/api/deleteMeter', options)
  }

  getAllMeters(){
    return this.http.get('/api/allmeters', {
      observe: 'body',
      responseType: 'json'
    });
  };

  getArrayOfManufacturersByUtility(utilityType:string){
    return this.http.get('/api/meterManufacturers/' + utilityType, {
      observe: 'body',
      responseType: 'json'
    });
  };

  getArrayOfMetersWithinSection(utilityType:string, manufacturer:string, seriesName:string|null, modelsName:string|null){
    const data = {
      utilityType: utilityType,
      manufacturer: manufacturer,
      seriesName: seriesName,
      modelsName: modelsName
    };

    const dataString = JSON.stringify(data);
    return this.http.get('/api/metersFromSection/' + dataString, {
      observe: 'body',
      responseType: 'json'
    });
  };

  getArrayOfSectionNamesByUtilityAndManufacturer(utilityType: string, manufacturerName: string){
    return this.http.get<SectionNamesArray>('/api/sectionData/' + utilityType + '/' + manufacturerName, {
      observe: 'body',
      responseType: 'json'
    });
  };

  getMeterManufacturerData(utilityType:string, manufacturerName:string){
    return this.http.get('/api/meterManufacturerData/' + utilityType + '/' + manufacturerName, {
      observe: 'body',
      responseType: 'json'
    });
  };

  postNewMeter(newMeterData: NewMeterForm){
    return this.http.post('/api/newMeter', newMeterData, this.httpOptions);
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

    return this.http.post('/api/newMeterManufacturer', manufacturerObject, this.httpOptions);
  };

  postUpdatedMeter(meterLocation:MeterLocation, updatedMeterInfo:UpdatedMeterInfo){
   const data = {
     meterLocation: meterLocation,
     updatedMeterInfo: updatedMeterInfo
   };
    return this.http.patch('/api/updateMeter', data, this.httpOptions);
  };

  postUpdatedMeterManufacturer(meterManufacturerData:MeterManufacturer){
    return this.http.post('/api/updateMeterManufacturer', meterManufacturerData, this.httpOptions);
  };

}
