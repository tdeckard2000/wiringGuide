const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

// ************************************
//            DB Functions
// ************************************

// ************************************
//               Routes
// ************************************

app.get('/', (req, res)=>{
    res.send('<p>Hello World</p>')
});

app.get('/api/allMeters', (req, res)=>{
    res.json(meterData)
});

app.listen(3000, (req, res)=>{
    console.log('Listening on Port 3000');
});


meterData = [
  {
    manufacturer: 'ABB',
    sections: [
      {
        seriesName: 'Series Name Example',
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
            notes: 'This is an example support team note. Be sure that your wire is connected to the meter.'
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
