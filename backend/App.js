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
app.put("/Registro", JsonParser, function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var pais = req.body.pais;
    connection.query('INSERT INTO usuarios(username,email,password,pais) values(?,?,SHA1(?),?)', [username, email, password, pais], function (err, rows, fields) {
        res.send(rows);
    });
});
app.post("/Login", JsonParser, function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM usuarios WHERE username=? AND password=SHA1(?)', [email, password], function (err, rows, fields) {
        res.send(JSON.stringify(rows));
    });
});
app.get("/Adm", function (req, res) {
    connection.query('SELECT * FROM usuarios', function (err, rows, fields) {
        res.send(JSON.stringify(rows));
    });
});
