import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeterManufacturer } from 'src/app/main.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA) public data:MeterManufacturer) { }

  ngOnInit(): void {
  }

}
