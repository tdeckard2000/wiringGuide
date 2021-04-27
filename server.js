const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send('<p>Hello World</p>')
});

app.get('/api/allMeters', (req, res)=>{
    res.json({
        name: 'Trent',
        worked: true
    });
})

app.listen(3000, (req, res)=>{
    console.log('Listening on Port 3000');
})