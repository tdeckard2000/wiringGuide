const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const { createScanner } = require('typescript');
const { ObjectID } = require('bson');

app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();

port = process.env.PORT || 3000

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

  app.delete('/api/deleteMeter', async(req, res)=>{
    const manufacturer = req.body.manufacturer;
    const meterName = req.body.meterName;
    const seriesName = req.body.seriesAndModelsName.split(' / ')[0];
    const modelsName = req.body.seriesAndModelsName.split(' / ')[1];
    const utilityType = req.body.utilityType;

    meterGuideData.updateOne({manufacturer: manufacturer, utilityType: utilityType},
      { $pull: {'sections.$[x].meters': {meterName: meterName}}},
      { arrayFilters: [
          {
            'x.seriesName': seriesName,
            'x.modelsName': modelsName
          }
        ]
      },
      (err, result)=>{
        res.json(result);
      }
    );
  });

  app.get('/api/allMeters', async(req, res)=>{
    //returns all meter data
    const result = await meterGuideData.find({deleted:{$ne: true}}).toArray();
    result.sort(sortMeterManufacturers);
    res.json(result);
  });

  app.get('/api/metersFromSection/:data', async(req, res)=>{
    const data = JSON.parse(req.params.data);
    const utilityType = data.utilityType;
    const manufacturer = data.manufacturer;
    const seriesName = data.seriesName;
    const modelsName = data.modelsName;

    const result = await meterGuideData.findOne({
      'utilityType': utilityType,
      'manufacturer': manufacturer,
      'deleted': {$ne: true}
    });

    sectionsArray = result.sections;
    const section = sectionsArray.find((section)=>{
      if(section.seriesName === seriesName && section.modelsName === modelsName){
        return true;
      }else{
        return false;
      };
    });

    if(section && section.meters){
      res.json(section.meters);
    }else{
      res.json({error: 'No Meters'})
    };
  });

  app.get('/api/meterManufacturers/:utilityType', async(req, res)=>{
    //return array of meter manufacturers under given utility type
    const utilityType = req.params.utilityType;
    const result = await meterGuideData.find({"utilityType": utilityType, deleted:{$ne: true}}).project({_id: 0, manufacturer:1}).toArray();
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

  app.get('/api/sectionData/:utilityType/:manufacturerName', async(req, res)=>{
    const utilityType = req.params.utilityType;
    const manufacturerName = req.params.manufacturerName;
    const result = await meterGuideData.find({
      utilityType: utilityType,
      manufacturer: manufacturerName,
      deleted:{$ne: true}})
    .project({_id: 0, 'sections.seriesName': 1, 'sections.modelsName': 1, 'sections.deleted': 1}).toArray();

    res.json(result[0]);
  });

  app.post('/api/newMeter', async(req, res)=>{
    const data = req.body;

    const meterData = {
      meterName: data.meterName,
      wiringProtocol: data.wiringProtocol,
      signalType: data.signalType,
      compatibleWith: {
        TR201: data.compatibleTR201,
        TR4: data.compatibleTR4,
        TR4X: data.compatibleTR4X,
        RR4: data.compatibleRR4
      },
      publicNotes: data.publicNotes,
      internalNotes: data.internalNotes
    };

    const result = await meterGuideData.updateOne(
      {
        manufacturer:data.manufacturerName,
        utilityType: data.utilityType,
        sections: {
          $elemMatch: {
            seriesName: data.seriesName,
            modelsName: data.modelsName
          }
        }
      },

      {$push: { 'sections.$.meters': meterData }}
    );

    res.json(result);
  });

  app.post('/api/newMeterManufacturer', async(req, res)=>{
    //add a new manufacturer document to collection
    const data = req.body;
    const result = await meterGuideData.insertOne(data);
    res.json(result);
  });

  app.post('/api/updateMeterManufacturer', async(req, res)=>{
    //replace existing manufacturer document with new one
    const data = req.body;
    const docId = data._id;
    //remove _id field from object before replacing
    delete data._id;

    meterGuideData.replaceOne({_id: ObjectID(docId)}, data, (err, result)=>{
      if(err){
        console.warn("error saving: ", err);
        res.json(err);
      }else{
        res.json(result);
      };
    });
  });

  app.patch('/api/deleteManufacturer', async(req, res)=>{
    //set "deleted:true" and adds filed if missing
    const docId = req.body.manufacturerId;
    meterGuideData.updateOne({_id: ObjectID(docId)}, {$set: {deleted: true}}, (err, result)=>{
      if(err){
        console.warn('error updating' + err)
      };
      res.json(result)
    });
  });

  app.patch('/api/updateMeter', async(req, res)=>{
    const meterLocation = req.body.meterLocation;
    const updatedMeterInfo = req.body.updatedMeterInfo;
    let signalType = 'Encoded';
    let modelsName = null;
    let seriesName = null;

    if(meterLocation.seriesAndModelsName !== 'NA'){
      seriesName = meterLocation.seriesAndModelsName.split(' / ')[0];
      modelsName = meterLocation.seriesAndModelsName.split(' / ')[1];
    };

    if(updatedMeterInfo.wiringProtocol === 'Pulse'){
      signalType = 'Pulse';
    }else if(updatedMeterInfo.wiringProtocol === 'Integrated'){
      signalType = 'Integrated';
    };

    meterGuideData.updateOne(
      {'manufacturer': meterLocation.manufacturer,'utilityType': meterLocation.utilityType},
      { $set: {
        'sections.$[x].meters.$[y].meterName': updatedMeterInfo.meterName,
        'sections.$[x].meters.$[y].signalType': signalType,
        'sections.$[x].meters.$[y].wiringProtocol': updatedMeterInfo.wiringProtocol,
        'sections.$[x].meters.$[y].compatibleWith.TR201': updatedMeterInfo.compatibleTR201,
        'sections.$[x].meters.$[y].compatibleWith.TR4': updatedMeterInfo.compatibleTR4,
        'sections.$[x].meters.$[y].compatibleWith.RR4': updatedMeterInfo.compatibleRR4,
        'sections.$[x].meters.$[y].compatibleWith.TR4X': updatedMeterInfo.compatibleTR4X,
        'sections.$[x].meters.$[y].publicNotes': updatedMeterInfo.publicNotes,
        'sections.$[x].meters.$[y].internalNotes': updatedMeterInfo.internalNotes
        }
      },
      { arrayFilters: [
          {
            'x.seriesName': seriesName,
            'x.modelsName': modelsName
          },
          {
            'y.meterName': meterLocation.meterName,
          }
        ]
      },
      (err, result)=>{
        if(err){
          console.warn("Error updating meter: " + err);
        };

        res.json(result);
      }
    );
  });

  app.all("*", (req, res)=>{
    console.warn("Invalid API request");
    res.send({'error':'wrong route'});
  });

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

app.listen(port, (req, res)=>{
  console.warn('Listening on Port ' + port);
});
