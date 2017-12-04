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
    // alternative 
    // var url = require('url');
    // var url_parts = url.parse(request.url, true);
    // console.log(url_parts);
    // var query = url_parts.query;
    // console.log(query.customHostname);

    // step 1 - convert csv to json
    // step 1 (alternative) - get mocked list from JSON file (fake.json). TODO

    var dataFromConvert = await convertCsvToArray({
      filterKrkOnly: true
    })
    // console.log(dataFromConvert);
    // optional step
    host2ip(dataFromConvert);

    // step 2 - scan network with nmap by providing dataFromConvert
    var dataFromScan = await liveScan(dataFromConvert)

    response.status(200).json({
        data: dataFromScan
    });
});

app.get('/scan/:customHostname', async function(request, response) {
  // https://www.npmjs.com/package/ip
  // nice, but maybe not yet needed.
  // var ip = require('ip');
  // console.log(ip.address()); // my IP

  // TODO validate request.params.customHostname as valid hostname
  var dataFromScan = await liveScan([request.params.customHostname])

  response.status(200).json({
      data: dataFromScan
  });   
});

app.get('/fake', function(request, response) {
  let fakeArr = createFakeJson();
  response.status(200).json(fakeArr);
});

/**
 * /api/hostnames endpoint
 *
 * Planed ass suggestion for everyone who want to use "Black Screen" product/page.
 * Suggestion is based on the fact, that different offices can have different hostnames.
 * By implementing this endpoint dedicated data structure should be followed, so that application can be
 * Also, using API it's expected, that we draw a map of computers, 
 * which is simple grid, and we show IP Address and status (is up or is down)
 * 
 */
app.get('/api/hostnames', function(request, response) {
  let testData = require('./al/gl_computers.json');

  response.status(200).json(testData);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});