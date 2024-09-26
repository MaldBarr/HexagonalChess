var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());
var JsonParser = bodyParser.json();
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'baseuser'
});
connection.connect(function (err) {
    if (err) {
        console.error('Error conectando a la DB ' + err.stack);
        return;
    }
    console.log('Conexión establecida' + connection.threadId);
});
var configuracion = {
    hostname: "127.0.0.1",
    port: 3000
};
app.listen(configuracion, function () {
    console.log('Servidor iniciado en http://localhost:' + configuracion.port);
});
app.get('/', function (req, res) {
    console.log('GET /');
});
