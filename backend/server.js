const http = require('http');
const express = require('express');
const port = 3306;
const app = express();

/* app.listen('3000', () => {
    console.log('Server ok on port 3000');
}) */

app.set('port', process.env.PORT || 3306);

const server = http.createServer(app);

server.listen(process.env.PORT || 3000);