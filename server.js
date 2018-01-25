const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

const serverHelpers = require('./al/server-helpers')
const convertCsvToArray = serverHelpers.convertCsvToArray
const writeToJsonFile = serverHelpers.writeToJsonFile
const liveScan = serverHelpers.liveScan
const liveScanWithFile = serverHelpers.liveScanWithFile
const parseNmapReportOutput = serverHelpers.parseNmapReportOutput
const parseNmapReportOutput_CLI = serverHelpers.parseNmapReportOutput_CLI
const host2ip = serverHelpers.host2ip
const createFakeJson = serverHelpers.createFakeJson

// use true, if u scan with enabled GL VPN (assuming you are located NOT in the GL office)
// use false, if u scan in GL office.
// Looks like not much helpful, because no matter what value,
// if NO Cisco VPN enabled, all hostnames not reachable/resolved from laptop connected via WiFi
// And if Cisco VPN enabled, then hostnames resolved (with or without suffix synapse.com)
const vpn = false;

app.set('port', (process.env.PORT || 5000));

// https://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// app.get('/', function(request, response) {
//     response.sendFile(path.join(__dirname + '/index.html'));
// });

//
// TODOD move below async functions into server-helpers.js and simplify above imports.
//

async function convertAndWrite() {
    // this code is executed when server starts, and it takes CSV file and convert to JSON, for further usage during scan.html usage
    let arr = await convertCsvToArray({
        filePath: 'al/gl_computers.csv',
        filterKrkOnly: true
    })

    // optional step
    // host2ip(arr);

    // optional
    writeToJsonFile(arr, {
        filePath: 'al/gl_computers.json'
    })

    return arr;
}

// The reason is why it's converted on server startup,
// because CSV is constant and JS array will be constant, and generated JSON file also not changed.
// But in fact it's used ONLY by variantWithDedicatedCsv() which is called on every /scan GET request
var dataFromConvert = convertAndWrite();

// based on list of krk1-lhp-p00949 records of hostnames
async function variantWithDedicatedCsv(options) {
    // step 1 - convert csv to json
    // step 1 (alternative) - get mocked list from JSON file (fake.json). TODO
    // step 2 - optional - validate IP
    // https://www.npmjs.com/package/ip
    // nice, but maybe not yet needed.
    // var ip = require('ip');
    // console.log(ip.address()); // my IP

    // step 2 - scan network with nmap by providing dataFromConvert
    let dataFromScan = await liveScan(await dataFromConvert, {
        scanWithVPN: vpn
    });

    return dataFromScan;
}

// based on custom value for single IP address or hostname from UI
async function variantWithLiveScan(options) {
    // TODO validateFromScaningData request.params.customHostname as valid hostname
    let dataFromScan = await liveScan(options.inputScanData, {
        scanWithVPN: vpn
    })

    if (options.parseOutputData) {
        dataFromScan = parseNmapReportOutput_CLI(dataFromScan);
    }

    return dataFromScan;
}

// based on custom hardcode file al/gl_networks.txt where listed Network Sub Nets
async function variantWithSubnetScan(options) {
    let dataFromScan = await liveScanWithFile({
        filePath: 'al/gl_networks.txt'
    })

    if (options.parseOutputData) {
        // dataFromScan = parseNmapReportOutput(dataFromScan);     // TODO
        dataFromScan = parseNmapReportOutput_CLI(dataFromScan);
    }

    return dataFromScan;
}

app.get('/scan', async function(request, response) {
    // alternative to '/scan/:customHostname'
    // var url = require('url');
    // var url_parts = url.parse(request.url, true);
    // console.log(url_parts);
    // var query = url_parts.query;
    // console.log(query.customHostname);

    // let dataFromScan = await variantWithDedicatedCsv();
    // let dataFromScan = await variantWithSubnetScan();
    let dataFromScan = await variantWithSubnetScan({
        parseOutputData: true
    });

    response.status(200).json({
        data: await dataFromScan
    });
});

app.get('/scan/:customHostname', async function(request, response) {
    let inputScanData = [];
    let multiple = request.params.customHostname.indexOf(',') > 0;

    if (multiple) {
        inputScanData = request.params.customHostname.split(',');
    } else {
        inputScanData = [request.params.customHostname];
    }

    let dataFromScan = await variantWithLiveScan({
        inputScanData: inputScanData,
        parseOutputData: true
    });

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
