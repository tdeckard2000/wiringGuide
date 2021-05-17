const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const { createScanner } = require('typescript');

app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();

// ************************************
//            DB Settings
// ************************************

const uri = process.env.DB_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const meterGuideData = client.db("testDB").collection("meterGuideData");

// ************************************
//             API Routes
// ************************************

  app.get('/api/allMeters', async(req, res)=>{
    //returns all meter data
    const result = await meterGuideData.find().toArray();
    result.sort(sortMeterManufacturers);
    res.json(result);
  });

  app.get('/api/meterManufacturers/:utilityType', async(req, res)=>{
    //return array of meter manufacturers under given utility type
    const utilityType = req.params.utilityType;
    const result = await meterGuideData.find({"utilityType": utilityType}).project({_id:0, manufacturer:1}).toArray();
    //convert array of objects to array of strings
    const arrayOfStrings = result.map(x => x.manufacturer);
    arrayOfStrings.sort();
    res.json(arrayOfStrings);
  });

  app.get('/api/meterManufacturerData/:utilityType/:manufacturerName', async(req, res)=>{
    //return all meter manufacturer data
    const utilityType = req.params.utilityType;
    const manufacturerName = req.params.manufacturerName;

    if(!utilityType || !manufacturerName){
      res.json({result:"missingParams"})
    };

    const result = await meterGuideData.find({utilityType: utilityType, manufacturer: manufacturerName}).toArray();
    res.json(result[0])
  });

  app.post('/api/newMeterManufacturer', async(req, res)=>{
    //adds a new manufacturer document to collection
    const data = req.body;
    const result = await meterGuideData.insertOne(data);
    res.json(result);
  });

  app.all("*", (req, res)=>{
    console.warn("Invalid API request");
    res.send();
  })

  if(err){console.warn(err)}else{console.warn('Connected to DB')};
});

// ************************************
//             Functions
// ************************************

const sortMeterManufacturers = function(meterA, meterB){

  if(meterA.manufacturer < meterB.manufacturer){
    return -1;

  }else if(meterA.manufacturer > meterB.manufacturer){
    return 1;

  }else{
    return 0
  }
};


// ************************************
//              Server
// ************************************

app.listen(3000, (req, res)=>{
  console.warn('Listening on Port 3000');
});
