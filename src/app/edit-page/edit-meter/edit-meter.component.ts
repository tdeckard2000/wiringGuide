import { Component, OnInit } from '@angular/core';
import { EditPageService } from '../edit-page.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/main.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-meter',
  templateUrl: './edit-meter.component.html',
  styleUrls: ['./edit-meter.component.css', '../edit-page.component.css']
})
export class EditMeterComponent implements OnInit {

  constructor(public editPageService: EditPageService, private mainService: MainService) { }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.manufacturerNames.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  };

  canClickSave: boolean = false;
  editMeterForm: FormGroup = {} as FormGroup;
  filteredDropdownOptions: Observable<string[]> | undefined;
  findMeterForm: FormGroup = {} as FormGroup;
  manufacturerNames: Array<string> = [];
  sectionNameDropdownOptions: Array<string> = [];
  showEditDiv: boolean = false;
  utilityTypeOptions: Array<string> = this.editPageService.utilityTypeOptions;
  utilityTypeSelection: string = "";

  getArrayOfManufacturers(){
    this.mainService.getArrayOfManufacturersByUtility(this.utilityTypeSelection)
    .subscribe((data:object)=>{
      console.log(data)
      this.manufacturerNames = data as Array<string>;
      this.populateManufacturerDropdownList();
    });
    //clear input field
    this.findMeterForm.patchValue({'manufacturerName': ""});
  };

  onNext(){
    console.log(this.findMeterForm.value);
  }

  onReturnHome(){
    this.editPageService.visibleTile$.next('Home');
  };

  onSubmit(){
    console.log(this.editMeterForm.value);
  };

  onUtilityType(data:{value: string}){
    this.findMeterForm.get('manufacturer')?.patchValue('');
    this.findMeterForm.get('seriesAndModelName')?.patchValue('');
    this.utilityTypeSelection = data.value;
    this.getArrayOfManufacturers();
  };

  onUpdateMeterDropdownOptions(){

  };

  onUpdateSectionNameDropdownOptions(){
    const utilityType = this.findMeterForm.get('utilityType')?.value;
    const manufacturerName = this.findMeterForm.get('manufacturer')?.value;
    this.findMeterForm.get('sectionData.seriesAndModelName')?.patchValue("");
    let arrayOfOptions:Array<string> = ["NA"];
    this.mainService.getArrayOfSectionNamesByUtilityAndManufacturer(utilityType, manufacturerName).subscribe((data)=>{
      console.log(data)
      if(data.sections !== undefined){
        data.sections.forEach((section)=>{
          if((section.modelsName !== null || section.seriesName !== null) && !section.deleted){
            let modelsName = section.modelsName;
            let seriesName = section.seriesName;
            arrayOfOptions.push(seriesName + ' / ' + modelsName);
          };
        });
      };
      this.sectionNameDropdownOptions = Array.from(arrayOfOptions);
    });
  };

  populateManufacturerDropdownList(){
    this.filteredDropdownOptions = this.findMeterForm.get("manufacturer")?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  };

  ngOnInit(): void {
    this.findMeterForm = new FormGroup({
      'utilityType': new FormControl(null, Validators.required),
      'manufacturer': new FormControl(null, Validators.required),
      'seriesAndModelName': new FormControl(null, Validators.required),
      'meter': new FormControl(null, Validators.required)
    });
    this.editMeterForm = new FormGroup({
        'meterName': new FormControl(null, Validators.required),
        'wiringProtocol': new FormControl(null, Validators.required),
        'compatibleTR201': new FormControl(null),
        'compatibleTR4': new FormControl(null),
        'compatibleTR4X': new FormControl(null),
        'compatibleRR4': new FormControl(null),
        'publicNote': new FormControl(null),
        'internalNote': new FormControl(null)
    });
  }
}
