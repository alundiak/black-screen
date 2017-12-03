var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')

var serverHelpers = require('./al/server-helpers')
var convertCsvToArray = serverHelpers.convertCsvToArray
var liveScan = serverHelpers.liveScan
var host2ip = serverHelpers.host2ip
var createFakeJson = serverHelpers.createFakeJson

app.set('port', (process.env.PORT || 5000)); // process.env.PORT is for Heroku instance

app.use(express.static(__dirname + '/'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/scan', async function(request, response) {
    // step 1 - convert csv to json
    // step 1 (alternative) - get mocked list from JSON file (fake.json). TODO

    var dataFromConvert = await convertCsvToArray({
      filterKrkOnly: true
    })
    // console.log(dataFromConvert);
    // optional step
    host2ip(dataFromConvert);

    // step 2 - scan network with nmap by providing dataFromConvert
    // var dataFromScan = await liveScan(dataFromConvert)

    response.status(200).json({
        data: dataFromScan
    });
});

app.get('/fake', function(request, response) {
  let fakeArr = createFakeJson();
  response.status(200).json(fakeArr);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});