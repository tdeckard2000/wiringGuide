import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-edit-page-body',
  templateUrl: './edit-page-body.component.html',
  styleUrls: ['./edit-page-body.component.css']
})
export class EditPageBodyComponent implements OnInit {
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
  ]
  visibleTile = "Home";

  onClickNext(){
    this.visibleTile = this.radioSelection;
  }

  onReturnHome(){
    this.visibleTile = 'Home';
  }

  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('angularTheme');
  }

  ngOnInit(): void {
  }

}
