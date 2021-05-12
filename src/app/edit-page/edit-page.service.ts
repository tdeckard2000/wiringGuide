import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditPageService {
  constructor() { }

  public radioOptions = [
    "Add a Meter",
    "Edit/Delete a Meter",
    "Add a Meter Manufacturer",
    "Edit/Delete a Meter Manufacturer",
  ];

  public utilityTypeOptions = [
    "Electric",
    "Gas",
    "Run Time",
    "Thermal",
    "Water"
  ];

  public visibleTile$ = new BehaviorSubject("Home");

}
