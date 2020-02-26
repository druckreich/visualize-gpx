'use strict';

const express = require('express');
const walk = require('walk');
//const serveIndex = require('serve-index');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
var ALL_TRACKS   = [];

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/tracks/:name', function(req, res, next) {
    res.sendFile(req.params.name, {root: './tracks'});
});

app.get('/tracks', function (req, res) {
    var walker  = walk.walk('./tracks', { followLinks: false });
    walker.on('file', function(root, stat, next) {
        // Add this file to the list of files
        ALL_TRACKS.push(stat.name);
        next();
    });
    walker.on('end', function() {
        res.send(ALL_TRACKS);
    });
});

var server = app.listen(PORT, HOST, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
