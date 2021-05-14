import { Component, OnInit } from '@angular/core';
import { EditPageService } from '../edit-page.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-edit-manufacturer',
  templateUrl: './edit-manufacturer.component.html',
  styleUrls: ['./edit-manufacturer.component.css', '../edit-page-body/edit-page-body.component.css']
})
export class EditManufacturerComponent implements OnInit {

  constructor(private editPageService: EditPageService, private mainService: MainService) { }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.manufacturerNames.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  filteredOptions: Observable<string[]> | undefined;
  myControl = new FormControl();
  manufacturerNames = [""];
  utilityTypeOptions = this.editPageService.utilityTypeOptions;
  utilityTypeSelection = "";

  onReturnHome(){
    //go back to home tile
    this.editPageService.visibleTile$.next('Home');
  };

  onUtilityType(data:{value:string}){
    //track selected utility type
    this.utilityTypeSelection = data.value;
    this.setManufacturerList();
  };

  setManufacturerList(){
    //define array for manufacturer drop down list
    this.mainService.getArrayOfManufacturersByUtility(this.utilityTypeSelection)
    .subscribe((data:object)=>{

      this.manufacturerNames = data as Array<string>;
      this.updateManufacturerDropdownList();
    });
  };

  updateManufacturerDropdownList(){
    //update manufacturer dropdown list with new options
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnInit() {

  }
}
