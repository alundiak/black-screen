/**
 * Depends on network, or VPN we may need to append hostname suffix, to short names so that some CLI commands work properly
 * @param  {[Array]} hostnamesArray -
 * @param  {[String]} hostnameToAppend - optional
 * @return {[Array]} - modified hostnamesArray
 */
function appendHostName(hostnamesArray, hostnameToAppend) {
    //
    // Internally, hostnames are available as "krk1-lhp-f61897"
    // "synapse.com" is internal server/hostname in GL network.
    // but for at least command "dig" there is need in full hostname (krk1-lhp-f61897.synapse.com)
    //
    return hostnamesArray.map(function(el) {
        return el + '.synapse.com';
    })
}

/**
 * Helper function to write results of network scanning into text (*.log file) for temporary (runtime, live) usage
 * @param  {[String]} logsStr
 * @return {[void]}
 */
function writeToLogFile(logsStr) {
    const fs = require('fs')
    const fileName = 'al/scan.log';
    fs.writeFile(fileName, logsStr, function(err) {
        if (err) return console.log(err);
    });
}

/**
 * Helper function to write JSON data into *.JSON file with proper formating for further usage
 * @param  {[Array]} jsonData
 * @param {[Object]} options
 * @return {[void]}
 */
module.exports.writeToJsonFile = function(jsonData, options) {
    const fs = require('fs')

    // https://stackoverflow.com/questions/10685998/how-to-update-a-value-in-a-json-file-and-save-it-through-node-js
    let content = JSON.stringify(jsonData, null, 2)

    fs.writeFile(options.filePath, content, function(err) {
        if (err) return console.log(err);
    });
}

/**
 * Convert GL created CSV file with hostnames to simple JS/JSON Array
 * @param  {[type]} options [.filePath (String) and .filterKrkOnly (Boolean)]
 * @return {[type]}         [description]
 */
module.exports.convertCsvToArray = function(options) {
    const csvFilePath = options.filePath
    const csv = require('csvtojson')

    return new Promise((resolve, reject) => {
        let arr = [], resultArr = [];

        let csvOptions = {
            // noheader: true,
            delimiter: ';'
        };

        csv(csvOptions)
            .fromFile(csvFilePath)
            .on('json', (jsonObj) => {
                arr.push(jsonObj['Short Description']);
            })
            .on('done', (error) => {
                if (options.filterKrkOnly) {
                    resultArr = arr.filter(function(element) {
                        return element.indexOf('krk1-lhp') !== -1
                    })
                } else {
                    resultArr = arr;
                }
                resolve(resultArr);
            })

    });
}

module.exports.liveScan = function(networksData, options) {
    const hostUp = 'Host is up';
    const hostDown = 'Host seems down';
    const hostDown2 = '0 hosts up';
    const doneTemplate = 'Nmap done: 1792 IP addresses (161 hosts up) scanned in 85.99 seconds';
    // https://www.regular-expressions.info/ip.html
    // https://stackoverflow.com/questions/5284147/validating-ipv4-addresses-with-regexp
    const ipv4Pattern = '\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b'; // use ip or ip-address NPM module

    const shell = require('shelljs')

    // var 1
    let newData = options.scanWithVPN ? appendHostName(networksData) : networksData;
    let networksStr = newData.join(' ')
    let commandStr = `nmap -sn ${networksStr}`
    console.log(commandStr);

    return new Promise((resolve, reject) => {
        shell.exec(commandStr, function(code, stdout, stderr) {
            // stdout - is entire nmap command response
            writeToLogFile(stdout) // optional step, for debugging

            // let ips[] = parseStdOut() 
            // and get IP address if host is UP, rest assume down
            // => scan2.sh

            console.log('Live Scan is finished')

            resolve(stdout)
        });
    })

    // var 1.1 - with writing to file on the fly
    // let commandStr = `nmap -sn ${networksStr} >> ${logsFile}`;
    // shell.exec(commandStr)
    // var str = shell.cat(logsFile);
    // response.status('200').send(str); // this simply sends to the page as PRE text

    // var 2
    // TODO use script al/scan_network.sh or al/scan_network.bat
    // var result = shell.exec('./al/scan_network.sh >> file.log');
    // var str = shell.cat('file.log');

    // if (!str) {
    //     // use the al/gl_scanned_networks.txt and show on page for dev / test purpose.
    //     // Most probably, at home, u will not have test data.
    // }

    // TODO rework this /scan route to return JSON so that we can use via $.get() and show data on page.
    // response.status(200).json({
    //     // error: 'message'
    //     data: str
    // });

    // TODO decide which way is better by performance: running command using shelljs or execute scan.sh by NodeJS/shellJs or better way.
}

module.exports.liveScanWithFile = function(options) {
    const shell = require('shelljs')
    let commandStr = `nmap -sn -iL ${options.filePath}`;

    return new Promise((resolve, reject) => {
        shell.exec(commandStr, function(code, stdout, stderr) {
            // stdout - is entire nmap command response
            writeToLogFile(stdout) // optional step, for debugging
            console.log('Live Subnets Scan is finished')
            resolve(stdout)
        });
    })
}

module.exports.host2ip = function(hostnamesArray) {
    const shell = require('shelljs')

    // const dns = require('dns') // for using dns.lookup() [https://nodejs.org/api/dns.html]
    // but there is handy CLI command via npm install -g
    // const {lookup} = require('dns')

    // lookup('google.com', function() {

    // });
    // const dns = require('dns');

    // dns.lookup('iana.org', (err, address, family) => {
    //   console.log('address: %j family: IPv%s', address, family);
    // });

    // const lookupHostname = require('lookup-hostname')

    hostnamesArray.forEach(function(hostNameStr) {
        // shell.exec(`dig +short ${hostNameStr}`);
        // shell.exec(`host ${hostNameStr}`);
        // shell.exec(`nslookup ${hostNameStr}`);

        // is npm module lookup-hostname installed as --global
        // shell.exec(`lookup ${hostNameStr}`);

        // shell.exec(`lookup ${hostNameStr}`);
        // lookupHostname(hostNameStr)
        // lookup(hostNameStr)
    })
}

module.exports.createFakeJson = function() {
    const nDesks = 95;
    const nDesksM = 22;
    const nDesksS = 18;

    let desks = [];

    for (var i = 1; i <= nDesks; i++) {
        desks.push({
            id_1_parent_g_real: 'krk-table--' + i,
            id_1_parent_g: 'table--' + i,
            id_2_child_path_table: 'table--' + i,
            id_3_child_path_reserved: 'reserved--' + i,
            id_4_child_path_equipment: 'equipment--' + i,
            id_5_child_g_text: 'text--' + i,
            ip: '172.26.129.' + i
        })
    }

    // m - meaning MiniMed ? MedTronic?
    for (var i = 1; i <= nDesksM; i++) {
        desks.push({
            id_1_parent_g_real: 'krk-table--' + i + 'm',
            id_1_parent_g: 'table--' + i + 'm',
            id_2_child_path_table: 'table--' + i + 'm',
            id_3_child_path_reserved: 'reserved--' + i + 'm',
            id_4_child_path_equipment: 'equipment--' + i + 'm',
            id_5_child_g_text: 'text--' + i,
            ip: '172.26.130.' + i
        })
    }

    // s - meaning Small Projects?
    for (var i = 1; i <= nDesksS; i++) {
        desks.push({
            id_1_parent_g_real: 'krk-table--' + i + 's',
            id_1_parent_g: 'table--' + i + 's',
            id_2_child_path_table: 'table--' + i + 's',
            id_3_child_path_reserved: 'reserved--' + i + 's',
            id_4_child_path_equipment: 'equipment--' + i + 's',
            id_5_child_g_text: 'text--' + i,
            ip: '172.26.132.' + i
        })
    }

    writeToJsonFile(desks, 'al/fake.json');

    return desks
}
