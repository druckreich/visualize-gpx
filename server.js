'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const APP_FOLDER = './dist/visualize-gpx'

// App
const app = express();
app.get('/', (req, res) => {
    res.status(200).sendFile(`/`, {root: APP_FOLDER});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
