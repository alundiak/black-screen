// https://github.com/jas-/node-libnmap => -iL Works only, if range [] provided, any, but array of valid IPs
var nmap = require('libnmap');
var opts = {
    flags: [
        // '-sV', // Open port to determine service (i.e. FTP, SSH etc)
        // '-O', // OS finger printing (requires elevated privileges)
        // '-sC', // Enables the nmap scripts (all) against each host (requires elevated privileges)
        '-sn',
        '-iL ./gl_networks.txt'
    ],
    // json: false, // true by default
    // verbose: true,
    ports: null, // explained why: https://github.com/jas-/node-libnmap/issues/22#issuecomment-142158912
    // range: ['scanme.nmap.org', '192.168.0.0/26'] // MUST be
    range: ['scanme.nmap.org', '192.168.0.0/26']
};

nmap.scan(opts, function(err, report) {
    if (err) throw err;

    for (var item in report) {
        console.log(JSON.stringify(report[item], null, 2));
    }
});
