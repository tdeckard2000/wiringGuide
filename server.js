const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const { cpuUsage } = require('node:process');
const { resourceLimits } = require('node:worker_threads');

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

    result = await meterGuideData.find().toArray();
    result.sort(sortMeterManufacturers);
    res.json(result);
  })

  if(err){console.log(err)}else{console.log('Connected to DB')};
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
  console.log('Listening on Port 3000');
});
