const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mainRouter = require('./routes');
require('dotenv')
const server = express();
server.use(express.json());
server.use(morgan('dev'));

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //Autorizo recibir solicitudes de este dominio
    res.header('Access-Control-Allow-Credentials', true); //Autorizo recibir solicitudes que incluyan el encabezado con credenciales
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //Autorizo recibir solicitudes con dichos hedears
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); //Autorizo las solicitudes tipo GET, POST, OPTIONS, PUT y DELETE.
    next();
});


server.use(mainRouter)



module.exports = server;