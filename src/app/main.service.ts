import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry, toArray } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface MeterManufacturer{
  manufacturer: string,
  utilityType: string,
  sections: [{
    seriesName: string,
    modelsName: string,
    meters?:Array<object>
    deleted?: boolean
  }];
};

interface NewSectionsArrayObject{
  seriesName:string,
  modelsName:string
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

    return this.http.post('http://localhost:3000/api/newMeterManufacturer', manufacturerObject, this.httpOptions
    );
  }

  postUpdatedMeterManufacturer(meterManufacturerData:MeterManufacturer){
    console.log(meterManufacturerData);
  }

}
