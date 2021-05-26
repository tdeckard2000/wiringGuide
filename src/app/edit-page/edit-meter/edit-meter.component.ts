import { Component, OnInit } from '@angular/core';
import { EditPageService } from '../edit-page.service';

@Component({
  selector: 'app-edit-meter',
  templateUrl: './edit-meter.component.html',
  styleUrls: ['./edit-meter.component.css', '../edit-page.component.css']
})
export class EditMeterComponent implements OnInit {

  constructor(private editPageService: EditPageService) { }

  onReturnHome(){
    this.editPageService.visibleTile$.next('Home');
  };

  ngOnInit(): void {
  }

}
