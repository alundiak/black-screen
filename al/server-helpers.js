/**
 * Depends on network, or VPN we may need to append hostname suffic, to short names so that some CLI commands work properly
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
 * Helper function to write results of network scanning into tex (*.log file) for temporary (runtime, live) usage
 * @param  {[String]} logsStr
 * @return {[void]}
 */
function writeToLogFile(logsStr) {
    const fs = require('fs')
    const fileName = 'al/live_scan.log';
    fs.writeFile(fileName, logsStr, function(err) {
        if (err) return console.log(err);
        console.log('writing to ' + fileName);
    });
}

/**
 * Helper function to write JSON data of converted network hostnames into *.JSON file for further usage
 * @param  {[Array]} jsonData
 * @return {[void]}
 */
function writeToJsonFile(jsonData) {
    const fs = require('fs')
    const fileName = 'al/gl_computers.json';

    // https://stackoverflow.com/questions/10685998/how-to-update-a-value-in-a-json-file-and-save-it-through-node-js
    let content = JSON.stringify(jsonData, null, 2)

    fs.writeFile(fileName, content, function(err) {
        if (err) return console.log(err);
        // console.log(content);
        console.log('writing to ' + fileName);
    });
}

//
// Module to design live network scanning
// TODO with async/await
//
module.exports.convertCsvToArray = function() {
    const csvFilePath = 'al/gl_computers.csv'
    const csv = require('csvtojson')

    return new Promise((resolve, reject) => {
        let arr = []
        csv({
                // noheader: true,
                delimiter: ';'
            })
            .fromFile(csvFilePath)
            .on('json', (jsonObj) => {
                arr.push(jsonObj['Short Description']);
            })
            .on('done', (error) => {
                let filteredArr = arr.filter(function(element) {
                    return element.indexOf('krk1-lhp') !== -1
                })

                writeToJsonFile(filteredArr)

                resolve(filteredArr);
            })

    });
}

module.exports.liveScan = function(networksData) {
    const hostUp = 'Host is up';
    const hostDown = 'Host seems down';
    const doneTemplate = 'Nmap done: 1792 IP addresses (161 hosts up) scanned in 85.99 seconds';

    const shell = require('shelljs')

    // var 1
    let newData = appendHostName(networksData)
    let networksStr = newData.join(' ')
    let commandStr = `nmap -sn ${networksStr}`

    return new Promise((resolve, reject) => {
        shell.exec(commandStr, function(code, stdout, stderr) {
            writeToLogFile(stdout) // optional step, for debugging  

            console.log('Looks like all done')

            resolve(stdout)
        });
    })

    // var 1.1 - with wrting to file on the fly
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

    // TODO decide which way is better by performance: running command uising shelljs or execute scan.sh by NodeJS/shellJs or better way.
}
