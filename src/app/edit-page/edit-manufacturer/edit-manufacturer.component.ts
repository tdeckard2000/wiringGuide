import { Component, OnInit } from '@angular/core';
import { EditPageService } from '../edit-page.service';

@Component({
  selector: 'app-edit-manufacturer',
  templateUrl: './edit-manufacturer.component.html',
  styleUrls: ['./edit-manufacturer.component.css', '../edit-page-body/edit-page-body.component.css']
})
export class EditManufacturerComponent implements OnInit {

  constructor(private editPageService: EditPageService) { }

  onReturnHome(){
    this.editPageService.visibleTile$.next('Home');
  };

  ngOnInit(): void {
  }

}
