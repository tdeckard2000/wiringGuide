import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { MainService } from '../main.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  constructor(private mainService : MainService){}
  focusSearchBar = false;
  searchBarText= '';

  onTextInput(){
    this.mainService.updateString(this.searchBarText);
  }

  ngOnInit(): void {
  }

}
