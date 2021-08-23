import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MeterData } from '../main.service';

@Component({
  selector: 'app-wiring-modal',
  templateUrl: './wiring-modal.component.html',
  styleUrls: ['./wiring-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WiringModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data:any) { }

  meterData: MeterData = this.data; //used for displaying data in modal

  ngOnInit(): void {
  }

}
