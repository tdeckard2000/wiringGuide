import { Component, OnInit} from '@angular/core';
import { MainService } from '../main.service';
import { MatDialog } from '@angular/material/dialog';
import { WiringModalComponent } from '../wiring-modal/wiring-modal.component'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-meter-dropdown-item',
  templateUrl: './meter-dropdown-item.component.html',
  styleUrls: ['./meter-dropdown-item.component.css']
})

export class MeterDropdownItemComponent implements OnInit {
  dropdownOpen:Array<boolean> = [];
  panelOpenState = true;
  searchBarText = '';
  meterData:Array<object> = [];

  constructor(private mainService : MainService,  public dialog: MatDialog){}

  closeAllDropdowns(){
    for(let i = 0; i<this.dropdownOpen.length; i++){
      this.dropdownOpen[i] = false;
    };
  };

  //Hide meter manufacturer underline while tile is open
  onMeterItemClick(i:any){
    this.dropdownOpen[i] = this.dropdownOpen[i] === true ? false : true;
    console.log(this.dropdownOpen)
  }

  //Open Wiring Guide Modal
  openWiringModal(meterData:object) {
    const dialogRef = this.dialog.open(WiringModalComponent, {
      data: meterData,
      autoFocus:false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.warn('Dialog result:' + result);
    });
  }

  populateDropdownOpenArray(meterData:Array<object>){
    meterData.forEach((itemInArray:object)=>{
      this.dropdownOpen.push(false)
    });
  }

  ngOnInit(): void {
    this.mainService.searchBarText$.subscribe(data =>{
      this.searchBarText = data;
      this.closeAllDropdowns();
    });

    this.mainService.getAllMeters().subscribe((res:any)=>{
      this.meterData = res;
      this.populateDropdownOpenArray(this.meterData);
    });
  };

}
