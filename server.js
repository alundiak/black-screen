var express = require('express')
var path = require('path')
var fs = require('fs')
var shell = require('shelljs')
var app = express()
var bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 5000)); // process.env.PORT is for Heroku instance

app.use(express.static(__dirname + '/'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/scan', function(request, response) {
    
    // var 1
    // Direct variant also works, but it outputs in stdout, and it takes time.
    // var result = shell.exec('nmap -sn 172.26.129.0/24');
    // response.status(200).send(result);

    // var 2
    var result = shell.exec('nmap -sn 172.26.129.0/24 >> file.log');
    var str = shell.cat('file.log');
    // response.status('200').send(str); // this simply sends to the page as PRE text

    // TODO rework this /scan route to rerutn JSON so that we can use via $.get() and show data on page.
    response.status(200).json({ 
    	// error: 'message'
    	data: str 
    });

    // TODO decide which way is better by performance: running command uising shelljs or execute scan.sh by NodeJS/shellJs or better way.
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});