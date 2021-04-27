import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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
}
