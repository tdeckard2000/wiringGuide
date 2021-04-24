import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-wiring-modal',
  templateUrl: './wiring-modal.component.html',
  styleUrls: ['./wiring-modal.component.css']
})
export class WiringModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data:any) { }

  meterData = this.data; //used for displaying data in modal

  ngOnInit(): void {
  }

}
