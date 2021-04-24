import { Component, OnInit} from '@angular/core';
import { MainService } from '../main.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-meter-dropdown-item',
  templateUrl: './meter-dropdown-item.component.html',
  styleUrls: ['./meter-dropdown-item.component.css']
})

export class MeterDropdownItemComponent implements OnInit {
  dropdownOpen: {[k:number]:boolean} = {};
  panelOpenState = true;
  searchBarText = '';

  constructor(private mainService : MainService,  public dialog: MatDialog){}

  // All meter data stored here
  meterDataWater = this.mainService.meterData;

  ngOnInit(): void {
    this.mainService.searchBarText$.subscribe(data =>{
      this.searchBarText = data;
    });
    // this.testString = this.mainService.typedString$;
  }

  //Hide meter manufacturer underline when tile is open
  onMeterItemClick(i:any){
    this.dropdownOpen[i] = this.dropdownOpen[i] === true ? false : true;
  }

  //Open Wiring Guide Modal
  openWiringModal() {
    const dialogRef = this.dialog.open(WiringModalBody);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

// ************************************
//       Wiring Modal/Dialog
// ************************************

@Component({
  selector: 'app-wiring-modal-body',
  templateUrl: 'wiring-modal-body.html',
  styleUrls: ['wiring-modal-body.css']
})
export class WiringModalBody {}