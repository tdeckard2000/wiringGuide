import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditPageService, ModalData } from '../edit-page.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MainService, NewMeterForm } from 'src/app/main.service';
import { map, startWith } from 'rxjs/operators';
import { SavingModalComponent } from '../saving-modal/saving-modal.component';

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
  modalData: ModalData = {showLoadingAnimation: true, showSuccessText: false, showErrorText: false, errorPreview: "error info"};
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

  onClearManufacturerName(){
    this.newMeterForm.get('manufacturerName')?.setValue('');
  };

  onReturnHome(){
    this.editPageService.visibleTile$.next('Home');
  };

  onSubmit(){
    const formData = this.newMeterForm.value;
    let seriesName = null;
    let modelsName = null;
    const wiringProtocol = formData.meterData.wiringProtocol;
    let signalType = "Encoded";

    if(wiringProtocol.toLowerCase() === "pulse"){
      signalType = "Pulse";
    }else if(wiringProtocol.toLowerCase() === "integrated"){
      signalType = "Integrated"
    };

    if(formData.sectionData.seriesAndModelName.toLowerCase() !== "na"){
      seriesName = formData.sectionData.seriesAndModelName.split(' / ')[0];
      modelsName = formData.sectionData.seriesAndModelName.split(' / ')[1];
    };

    const newMeterData: NewMeterForm = {
      manufacturerName: formData.manufacturerName,
      utilityType: formData.manufacturerUtilityType,
      seriesName: seriesName,
      modelsName: modelsName,
      meterName: formData.meterData.meterName,
      wiringProtocol: wiringProtocol,
      signalType: signalType,
      compatibleTR201: formData.meterData.compatibleTR201 ? true : false,
      compatibleTR4: formData.meterData.compatibleTR4 ? true : false,
      compatibleTR4X: formData.meterData.compatibleTR4X ? true : false,
      compatibleRR4: formData.meterData.compatibleRR4 ? true : false,
      publicNotes: formData.meterData.publicNotes || "",
      internalNotes: formData.meterData.internalNotes || ""
    };


    this.modalData.showErrorText = false;
    this.modalData.showSuccessText = false;
    this.modalData.showLoadingAnimation = true;
    this.openSaveModal();
    this.mainService.postNewMeter(newMeterData).subscribe((data: any)=>{
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
    });
  };

  onUpdateSectionNameDropdownOptions(){
    const utilityType = this.newMeterForm.get('manufacturerUtilityType')?.value;
    const manufacturerName = this.newMeterForm.get('manufacturerName')?.value;
    this.newMeterForm.get('sectionData.seriesAndModelName')?.patchValue("");
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

  onUtilityType(data:{value: string}){
    this.utilityTypeSelection = data.value;
    this.getArrayOfManufacturers();
  };

  openSaveModal(){
    let ref = this.dialog.open(SavingModalComponent, {
      data: this.modalData,
      disableClose: true
    });
    ref.componentInstance.clickedDone.subscribe(()=>{
      this.newMeterForm.get('meterData')?.reset();
    });
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
