import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditPageService } from '../edit-page.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MainService } from 'src/app/main.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-new-meter',
  templateUrl: './new-meter.component.html',
  styleUrls: ['./new-meter.component.css', '../edit-page.component.css']
})
export class NewMeterComponent implements OnInit {

  constructor(public editPageService: EditPageService, public mainService: MainService, public dialog: MatDialog) { }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.manufacturerNames.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  };

  canClickSave = false;
  filteredDropdownOptions: Observable<string[]> | undefined;
  manufacturerNames: Array<string> = [""];
  newMeterForm: FormGroup = {} as FormGroup;
  sectionNameDropdownOptions: Array<string> = [];
  utilityTypeOptions = this.editPageService.utilityTypeOptions;
  utilityTypeSelection = "";

  getArrayOfManufacturers(){
    this.mainService.getArrayOfManufacturersByUtility(this.utilityTypeSelection)
    .subscribe((data:object)=>{
      this.manufacturerNames = data as Array<string>;
      this.populateManufacturerDropdownList();
    });
    //clear input field
    this.newMeterForm.patchValue({'manufacturerName': ""});
  };

  onClickSave(){

  };

  onReturnHome(){
    this.editPageService.visibleTile$.next('Home');
  };

  onUpdateSectionNameDropdownOptions(){
    const utilityType = this.newMeterForm.get('manufacturerUtilityType')?.value;
    const manufacturerName = this.newMeterForm.get('manufacturerName')?.value;
    this.newMeterForm.get('sectionData.seriesAndModelName')?.patchValue("");
    let arrayOfOptions:Array<string> = ["NA"];
    this.mainService.getArrayOfSectionNamesByUtilityAndManufacturer(utilityType, manufacturerName).subscribe((data)=>{
      if(data.sections !== undefined){
        data.sections.forEach((section)=>{
          let modelsName = section.modelsName;
          let seriesName = section.seriesName;
          arrayOfOptions.push(seriesName + ' / ' + modelsName);
        });
      };
      this.sectionNameDropdownOptions = Array.from(arrayOfOptions);
    });
  };

  onUtilityType(data:{value: string}){
    this.utilityTypeSelection = data.value;
    this.getArrayOfManufacturers();
  };

  populateManufacturerDropdownList(){
    this.filteredDropdownOptions = this.newMeterForm.get("manufacturerName")?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  };

  ngOnInit(): void {
    this.newMeterForm = new FormGroup({
      'manufacturerUtilityType': new FormControl(null, Validators.required),
      'manufacturerName': new FormControl(null, Validators.required),
      'sectionData': new FormGroup({
        'seriesAndModelName': new FormControl(null, Validators.required),
      }),
      'meterData': new FormGroup({
        'meterName': new FormControl(null, Validators.required),
        'wiringProtocol': new FormControl(null, Validators.required),
        'compatibleTR201': new FormControl(null),
        'compatibleTR4': new FormControl(null),
        'compatibleTR4X': new FormControl(null),
        'compatibleRR4': new FormControl(null),
        'publicNotes': new FormControl(null),
        'internalNotes': new FormControl(null)
      })
    });

    this.newMeterForm.statusChanges.subscribe((formStatus)=>{
      if(formStatus === "VALID"){
        this.canClickSave = true;
      }else{
        this.canClickSave = false;
      };

    });
  }

}
