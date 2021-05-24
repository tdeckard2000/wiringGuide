import { InterpolationConfig } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MainService } from '../main.service';

export interface EditManufacturerFormData{
  editManufacturerName: string,
  editUtilityType: string,
  manufacturerSection: {
  [key: string]: string
  };
};

export interface ModalData{
  showLoadingAnimation: boolean,
  showSuccessText: boolean,
  showErrorText: boolean,
  errorPreview: string,
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
