import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { EditPageService } from '../edit-page.service';

@Component({
  selector: 'app-edit-page-body',
  templateUrl: './edit-page-body.component.html',
  styleUrls: ['./edit-page-body.component.css', '../edit-page-body/edit-page-body.component.css']
})
export class EditPageBodyComponent implements OnInit {
  constructor(overlayContainer: OverlayContainer, private editPageService: EditPageService) {
    overlayContainer.getContainerElement().classList.add('angularTheme');
  };

  //Track which tile to show the user
  visibleTile = "";

  ngOnInit(): void {
    this.editPageService.visibleTile$.subscribe((visibleTile: string)=>{
      this.visibleTile = visibleTile;
    });
  };

}
