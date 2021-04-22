import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class MainService {
  // testString = {
  //   string: 'test'
  // };

  testString = 'originalServiceText';
  typedString$: BehaviorSubject<string>;

  constructor() { 
    this.typedString$ = new BehaviorSubject(this.testString);
  }
  
  updateString(newString:string){
    this.typedString$.next(newString)
  }

// Meter Data
meterData = [
  {
    manufacturer: 'ABB',
    sections: [
      {
        seriesName: '',
        seriesModel: 'C700 & InsideR',
        meters: [
          {
            meterName: 'Inovonics/ABB Integrated',
            signalType: 'integrated',
            wiringProtocol: 'integrated',
            compatibleTR201: false,
            compatibleTR4: false,
            compatibleRR4: false,
            notes: 'This is a third party meter.'
          },
          {
            meterName: 'Pulse Register',
            signalType: 'pulse',
            wiringProtocol: 'pulse',
            compatibleTR201: true,
            compatibleTR4: true,
            compatibleRR4: true,
            notes: ''
          },
          {
            meterName: 'Scancoder',
            signalType: 'encoded',
            wiringProtocol: 'sensus',
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
            signalType: 'pulse',
            wiringProtocol: 'pulse',
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
            signalType: 'pulse',
            wiringProtocol: 'pulse',
            compatibleTR201: true,
            compatibleTR4: true,
            compatibleRR4: true,
            notes: ''
          },
          {
            meterName: 'InVISION',
            signalType: 'encoded',
            wiringProtocol: 'sensus',
            compatibleTR201: false,
            compatibleTR4: true,
            compatibleRR4: true,
            notes: ''
          },
          {
            meterName: 'RS Pulser',
            signalType: 'pulse',
            wiringProtocol: 'pulse',
            compatibleTR201: true,
            compatibleTR4: true,
            compatibleRR4: true
          },
          {
            meterName: 'Scancoder',
            signalType: 'encoded',
            wiringProtocol: 'sensus',
            compatibleTR201: false,
            compatibleTR4: true,
            compatibleRR4: true
          },
          {
            meterName: 'InsideR (Inovonics/AMCO Integrated)',
            signalType: 'integrated',
            wiringProtocol: 'integrated',
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
            signalType: 'pulse',
            wiringProtocol: 'pulse',
            compatibleTR201: true,
            compatibleTR4: true,
            compatibleRR4: true,
            notes: ''
          },
          {
            meterName: 'G200',
            signalType: 'pulse',
            wiringProtocol: 'pulse',
            compatibleTR201: true,
            compatibleTR4: true,
            compatibleRR4: true,
            notes: ''
          },
          {
            meterName: 'G4 200',
            signalType: 'pulse',
            wiringProtocol: 'pulse',
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
];

}
