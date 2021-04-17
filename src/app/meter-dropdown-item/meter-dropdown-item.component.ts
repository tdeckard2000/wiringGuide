import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-meter-dropdown-item',
  templateUrl: './meter-dropdown-item.component.html',
  styleUrls: ['./meter-dropdown-item.component.css']
})

export class MeterDropdownItemComponent implements OnInit {
  dropdownOpen: {[k:number]:boolean} = {};
  panelOpenState = true;

// All meter data stored here
  meterDataWater = [
    {
      manufacturer: 'ABB',
      sections: [
        {
          seriesName: '',
          seriesModel: 'C700 & InsideR',
          meters: [
            {
              meterName: 'Inovonics/ABB Integrated',
              signalType: 'Integrated',
              wiringProtocol: 'Integrated',
              compatibleTR201: false,
              compatibleTR4: false,
              compatibleRR4: false,
              notes: 'This is a third party meter.'
            },
            {
              meterName: 'Pulse Register',
              signalType: 'Pulse',
              wiringProtocol: 'Pulse',
              compatibleTR201: true,
              compatibleTR4: true,
              compatibleRR4: true,
            },
            {
              meterName: 'Scancoder',
              signalType: 'Encoded',
              wiringProtocol: 'sensus',
              compatibleTR201: false,
              compatibleTR4: true,
              compatibleRR4: true
            }
          ]
        }]
    },
    {
      manufacturer: 'Actaris'
    },
    {
      manufacturer: 'AMCO'
    },
    {
      manufacturer: 'Assured Automation'
    },
    {
      manufacturer: 'B Meters'
    },
    {
      manufacturer: 'Badger'
    },
    {
      manufacturer: 'Blue-White'
    },
    {
      manufacturer: 'Byram Labs'
    },
    {
      manufacturer: 'Carlon'
    },
    {
      manufacturer: 'Conservice'
    },
    {
      manufacturer: 'DLJ'
    },
    {
      manufacturer: 'Elster'
    },
    {
      manufacturer: 'GWF'
    },
    {
      manufacturer: 'Hersey'
    },
    {
      manufacturer: 'Inovonics'
    },
    {
      manufacturer: 'Invensys'
    },
    {
      manufacturer: 'Ista'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onMeterItemClick(i:any){
    //hide meter manufacturer underline when tile is open
    //note: removing element from DOM causes page to 'jump'
    //so set opacity to 0
    this.dropdownOpen[i] = this.dropdownOpen[i] === true ? false : true;
  }

  logThis(data:any){
    console.log(data);
  }

}
