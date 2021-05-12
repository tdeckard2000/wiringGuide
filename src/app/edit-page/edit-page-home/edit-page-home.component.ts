import { Component, OnInit } from '@angular/core';
import { EditPageService } from '../edit-page.service';

@Component({
  selector: 'app-edit-page-home',
  templateUrl: './edit-page-home.component.html',
  styleUrls: ['./edit-page-home.component.css', '../edit-page-body/edit-page-body.component.css']
})
export class EditPageHomeComponent implements OnInit {

  constructor(private editPageService: EditPageService) { }

  radioSelection = "";
  radioOptions = this.editPageService.radioOptions;
  utilityTypeOptions = this.editPageService.radioOptions;

  onClickNext(){
    this.editPageService.visibleTile$.next(this.radioSelection);
  };

  ngOnInit(): void {
  }

}
