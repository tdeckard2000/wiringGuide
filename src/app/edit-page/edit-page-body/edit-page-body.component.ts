import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-page-body',
  templateUrl: './edit-page-body.component.html',
  styleUrls: ['./edit-page-body.component.css']
})
export class EditPageBodyComponent implements OnInit {
  currentPage = "I would like to";
  radioSelection = "";
  radioOptions= [
    "Add a Meter Manufacturer",
    "Edit/Delete a Meter Manufacturer",
    "Add/Edit/Delete a Meter (including series and sections)"
  ];

  onClickNext(){
    this.currentPage = this.radioSelection;
    console.log(this.currentPage)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
