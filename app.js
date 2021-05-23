const express = require('express');
const http = require('http');
const path = require('path');
const mongodb = require('./db/mongoConnect');
const {
    routesInit,
    originAllow
} = require('./routes/routes_config');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

originAllow(app);
routesInit(app);

let port = process.env.PORT || "3001";
const server = http.createServer(app);
server.listen(port);