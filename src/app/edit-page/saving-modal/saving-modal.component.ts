import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-saving-modal',
  templateUrl: './saving-modal.component.html',
  styleUrls: ['./saving-modal.component.css']
})
export class SavingModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    showLoadingAnimation: boolean,
    showSuccessText: boolean,
    showErrorText: boolean,
    errorPreview: string
  }) { }


  ngOnInit(): void {

  }

}
