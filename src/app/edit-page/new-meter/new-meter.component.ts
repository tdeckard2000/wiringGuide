import { Component, OnInit } from '@angular/core';
import { EditPageService } from '../edit-page.service';

@Component({
  selector: 'app-new-meter',
  templateUrl: './new-meter.component.html',
  styleUrls: ['./new-meter.component.css', '../edit-page.component.css']
})
export class NewMeterComponent implements OnInit {

  constructor(private editPageService: EditPageService) { }

  onReturnHome(){
    this.editPageService.visibleTile$.next('Home');
  };

  ngOnInit(): void {
  }

}
