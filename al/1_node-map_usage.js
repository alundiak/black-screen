// https://github.com/Johnhhorton/node-nmap => -iL WORKS
const nmap = require('node-nmap');
nmap.nmapLocation = 'nmap'; //default

// var quickscan = new nmap.QuickScan('127.0.0.1 google.com');

// quickscan.on('complete', function(data){
//   console.log(data);
// });

// quickscan.on('error', function(error){
//   console.log(error);
// });

// quickscan.startScan();

//    Accepts array or comma separarted string for custom nmap commands in the second argument.
// var nmapscan = new nmap.NmapScan('localhost', '-sn');
var nmapscan = new nmap.NmapScan([],'-sn -iL ./gl_networks.txt');
nmapscan.on('complete',function(data){
  console.log(nmapscan.rawData); // XML based
  console.log(nmapscan.rawJSON.nmaprun.runstats); // JSON based
  console.log(data);
});
nmapscan.on('error', function(error){
  console.log(error);
});
nmapScan.startScan();
