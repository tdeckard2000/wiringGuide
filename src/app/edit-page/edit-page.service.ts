import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MainService } from '../main.service';

export interface EditManufacturerFormData{
  editManufacturerName: string,
  editUtilityType: string,
  manufacturerSection: {
  // "editModelsName.0": string,
  // "editSeriesName.0": string,
  [key: string]: string
  };
};

@Injectable({
  providedIn: 'root'
})
export class EditPageService {
  constructor(private mainService: MainService) { }

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
