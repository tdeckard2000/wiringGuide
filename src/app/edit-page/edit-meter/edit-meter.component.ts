import { Component, OnInit } from '@angular/core';
import { EditPageService, MeterData, ModalData } from '../edit-page.service';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MainService } from 'src/app/main.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SavingModalComponent } from '../saving-modal/saving-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-edit-meter',
  templateUrl: './edit-meter.component.html',
  styleUrls: ['./edit-meter.component.css', '../edit-page.component.css']
})
export class EditMeterComponent implements OnInit {

  constructor(public editPageService: EditPageService, private mainService: MainService, public dialog: MatDialog) { }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.manufacturerNames.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  };

  canClickNext: boolean = false;
  canClickSave: boolean = false;
  editMeterForm: FormGroup = {} as FormGroup;
  filteredDropdownOptions: Observable<string[]> | undefined;
  findMeterForm: FormGroup = {} as FormGroup;
  manufacturerNames: Array<string> = [];
  meterBeingEditedObj: MeterData = {} as MeterData;
  meterDropdownOptions: Array<string> = [];
  meterOptionsData: Array<MeterData> = [];
  modalData: ModalData = {showLoadingAnimation: true, showSuccessText: false, showErrorText: false, errorPreview: "error info"};
  sectionNameDropdownOptions: Array<string> = [];
  showEditDiv: boolean = false;
  utilityTypeOptions: Array<string> = this.editPageService.utilityTypeOptions;
  utilityTypeSelection: string = "";

  getArrayOfManufacturers(){
    this.mainService.getArrayOfManufacturersByUtility(this.utilityTypeSelection)
    .subscribe((data:object)=>{
      this.manufacturerNames = data as Array<string>;
      this.populateManufacturerDropdownList();
    });
    //clear input field
    this.findMeterForm.patchValue({'manufacturerName': ""});
  };

  onClearManufacturerName(){
    this.findMeterForm.get('manufacturer')?.setValue('');
  };

  onClickNext(){
    this.storeSelectedMeterObj();
    this.populateEditForm();
    this.canClickSave = false;
    this.showEditDiv = true;
  };

  onDeleteMeter(){
    this.modalData.showLoadingAnimation = false;
    this.modalData.errorPreview = "";
    this.modalData.showErrorText = false;
    this.modalData.showSuccessText = false;
    // const ref = this.dialog.open(DeleteModalComponent, {
    //   data: {manufacturerData: this.manufacturerData, modalData: this.modalData},
    //   disableClose: true
    // });
    const meterLocation = this.findMeterForm.value;
    this.mainService.deleteMeter(meterLocation).subscribe((data)=>{
      console.log(data);
    });
  };

  onHideEditDiv(){
    this.showEditDiv = false;
  };

  openSaveModal(){
    let ref = this.dialog.open(SavingModalComponent, {
      data: this.modalData,
      disableClose: true
    });
    ref.componentInstance.clickedDone.subscribe(()=>{
      this.findMeterForm.reset();
      this.showEditDiv = false;
    });
  };

  onReturnHome(){
    this.editPageService.visibleTile$.next('Home');
  };

  onSubmit(){
    this.modalData.showErrorText = false;
    this.modalData.showSuccessText = false;
    this.modalData.showLoadingAnimation = true;
    this.openSaveModal();
    const updatedMeterInfo = this.editMeterForm.value;
    const meterLocation = this.findMeterForm.value;
    this.mainService.postUpdatedMeter(meterLocation, updatedMeterInfo).subscribe((data: any)=>{
      if(data.nModified && data.nModified > 0){
        setTimeout(()=>{
          this.modalData.showLoadingAnimation = false;
          this.modalData.showSuccessText = true;
        }, 1000);
      }else{
        this.modalData.showLoadingAnimation = false;
        this.modalData.showErrorText = true;
        this.modalData.errorPreview = data;
      };
    })
  };

  onUtilityType(data:{value: string}){
    this.findMeterForm.get('manufacturer')?.patchValue('');
    this.findMeterForm.get('seriesAndModelsName')?.patchValue('');
    this.findMeterForm.get('meter')?.patchValue('');
    this.utilityTypeSelection = data.value;
    this.getArrayOfManufacturers();
  };

  onUpdateMeterDropdownOptions(){
    const manufacturer = this.findMeterForm.get('manufacturer')?.value;
    const selection = this.findMeterForm.get('seriesAndModelsName')?.value;
    const utilityType = this.findMeterForm.get('utilityType')?.value;
    this.findMeterForm.get('meter')?.patchValue('');
    this.meterDropdownOptions = [];
    this.meterOptionsData = [];
    let seriesName: string | null = "";
    let modelsName: string | null = "";
    if(selection === "NA"){
      seriesName = null;
      modelsName = null;
    }else{
      seriesName = selection.split(' / ')[0];
      modelsName = selection.split(' / ')[1];
    };

    this.mainService.getArrayOfMetersWithinSection(utilityType, manufacturer, seriesName, modelsName).subscribe((data:any)=>{
      if(data.error){
        console.warn(data.error);
        this.meterDropdownOptions.push('No Meters')
      }else{
        this.meterOptionsData = data;
        data.forEach((meter:any)=>{
          this.meterDropdownOptions.push(meter.meterName);
        });
      };
    });
  };

  onUpdateSectionNameDropdownOptions(){
    const utilityType = this.findMeterForm.get('utilityType')?.value;
    const manufacturerName = this.findMeterForm.get('manufacturer')?.value;
    this.findMeterForm.get('seriesAndModelsName')?.patchValue("");
    this.findMeterForm.get('meter')?.patchValue('');
    let arrayOfOptions:Array<string> = ["NA"];
    this.mainService.getArrayOfSectionNamesByUtilityAndManufacturer(utilityType, manufacturerName).subscribe((data)=>{

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

  populateEditForm(){
    const meter = this.meterBeingEditedObj;
    this.editMeterForm.setValue({
      'meterName': meter.meterName,
      'wiringProtocol': meter.wiringProtocol,
      'compatibleTR201': meter.compatibleWith.TR201,
      'compatibleTR4': meter.compatibleWith.TR4,
      'compatibleTR4X': meter.compatibleWith.TR4X,
      'compatibleRR4': meter.compatibleWith.RR4,
      'publicNotes': meter.publicNotes,
      'internalNotes': meter.internalNotes,
    });
  };

  populateManufacturerDropdownList(){
    this.filteredDropdownOptions = this.findMeterForm.get("manufacturer")?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  };

  storeSelectedMeterObj(){
    const filterResults = this.meterOptionsData.filter((m)=>{
      return m.meterName === this.findMeterForm.get('meterName')?.value;
    });
    this.meterBeingEditedObj = filterResults[0];
  };

  forbiddenNameValidator(control: FormControl):{[s:string]:boolean} | null{
    const forbiddenName = 'No Meters';
    if(control.value === forbiddenName){
      return {'forbidden': true}
    }else{
      return null
    };
  };


  ngOnInit(): void {
    this.findMeterForm = new FormGroup({
      'utilityType': new FormControl(null, Validators.required),
      'manufacturer': new FormControl(null, Validators.required),
      'seriesAndModelsName': new FormControl(null, Validators.required),
      'meterName': new FormControl(null, [Validators.required, this.forbiddenNameValidator])
    });
    this.editMeterForm = new FormGroup({
        'meterName': new FormControl(null, Validators.required),
        'wiringProtocol': new FormControl(null, Validators.required),
        'compatibleTR201': new FormControl(null),
        'compatibleTR4': new FormControl(null),
        'compatibleTR4X': new FormControl(null),
        'compatibleRR4': new FormControl(null),
        'publicNotes': new FormControl(null),
        'internalNotes': new FormControl(null)
    });

    this.findMeterForm.valueChanges.subscribe(()=>{
      this.canClickNext = this.findMeterForm.valid? true : false;
    });

    this.editMeterForm.valueChanges.subscribe(()=>{
      this.canClickSave = this.editMeterForm.valid? true : false;
    });
  }
}
