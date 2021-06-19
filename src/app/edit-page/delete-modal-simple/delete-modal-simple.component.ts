import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalData } from '../edit-page.service';

@Component({
  selector: 'app-delete-modal-simple',
  templateUrl: './delete-modal-simple.component.html',
  styleUrls: ['./delete-modal-simple.component.css']
})
export class DeleteModalSimpleComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA) public data:{modalData: ModalData}) { }

  onConfirmDelete = new EventEmitter();
  onDone = new EventEmitter();
  canClickCancel = true;

  onDeleteClick(){
    this.onConfirmDelete.emit();
    this.canClickCancel = false;
  };

  onDoneClick(){
    this.onDone.emit();
    this.canClickCancel = false;
  };

  ngOnInit(): void {
  }

}
