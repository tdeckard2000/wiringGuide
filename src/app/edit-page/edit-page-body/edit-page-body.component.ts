import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-page-body',
  templateUrl: './edit-page-body.component.html',
  styleUrls: ['./edit-page-body.component.css']
})
export class EditPageBodyComponent implements OnInit {
  radioSelection = "";
  radioOptions= ["1", "2", "3", "4", "5"]
  constructor() { }

  ngOnInit(): void {
  }

}
