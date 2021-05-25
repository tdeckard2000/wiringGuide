import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeterManufacturer } from 'src/app/main.service';
import { ModalData } from '../edit-page.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA) public data:{manufacturerData: MeterManufacturer, modalData: ModalData}) { }

  onConfirmDelete = new EventEmitter();
  onDone = new EventEmitter();

  onDeleteClick(){
    this.onConfirmDelete.emit();
  };

  onDoneClick(){
    this.onDone.emit();
  };

  ngOnInit(): void {
  }

};
