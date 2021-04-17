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
              notes: ''
            },
            {
              meterName: 'Scancoder',
              signalType: 'Encoded',
              wiringProtocol: 'Sensus',
              compatibleTR201: false,
              compatibleTR4: true,
              compatibleRR4: true,
              notes: ''
            }
          ]
        }]
    },
    {
      manufacturer: 'Actaris',
      sections: [
        {
          seriesName: '',
          seriesModel: '',
          meters: [
            {
              meterName: 'MultiMag',
              signalType: 'Pulse',
              wiringProtocol: 'Pulse',
              compatibleTR201: true,
              compatibleTR4: true,
              compatibleRR4: true,
              notes: ''
            }
          ]
        }]
    },
    {
      manufacturer: 'AMCO',
      sections: [
        {
          seriesName: '',
          seriesModel: 'C700, C400, V100 & Compound',
          meters: [
            {
              meterName: 'Digital',
              signalType: 'Pulse',
              wiringProtocol: 'Pulse',
              compatibleTR201: true,
              compatibleTR4: true,
              compatibleRR4: true,
              notes: ''
            },
            {
              meterName: 'InVISION',
              signalType: 'Encoded',
              wiringProtocol: 'Sensus',
              compatibleTR201: false,
              compatibleTR4: true,
              compatibleRR4: true,
              notes: ''
            },
            {
              meterName: 'RS Pulser',
              signalType: 'Pulse',
              wiringProtocol: 'Pulse',
              compatibleTR201: true,
              compatibleTR4: true,
              compatibleRR4: true
            },
            {
              meterName: 'Scancoder',
              signalType: 'Encoded',
              wiringProtocol: 'Sensus',
              compatibleTR201: false,
              compatibleTR4: true,
              compatibleRR4: true
            },
            {
              meterName: 'InsideR (Inovonics/AMCO Integrated',
              signalType: 'Integrated',
              wiringProtocol: 'Integrated',
              compatibleTR201: false,
              compatibleTR4: false,
              compatibleRR4: false
            }
          ]
        },
        {
          seriesName: '',
          seriesModel: 'Misc',
          meters: [
            {
              meterName: 'BK-G 1.6',
              signalType: 'Pulse',
              wiringProtocol: 'Pulse',
              compatibleTR201: true,
              compatibleTR4: true,
              compatibleRR4: true,
              notes: ''
            },
            {
              meterName: 'G200',
              signalType: 'Pulse',
              wiringProtocol: 'Pulse',
              compatibleTR201: true,
              compatibleTR4: true,
              compatibleRR4: true,
              notes: ''
            },
            {
              meterName: 'G4 200',
              signalType: 'Pulse',
              wiringProtocol: 'Pulse',
              compatibleTR201: true,
              compatibleTR4: true,
              compatibleRR4: true,
              notes: ''
            }
          ]
        }
       ] 
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
