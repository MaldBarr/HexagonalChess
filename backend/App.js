var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var app = express();
app.use(cors());
var JsonParser = bodyParser.json();
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'hexachess'
});
var JWT_SECRET = 'hexacheck';
var JWT_Admin = 'admHC';
var authenticateToken = function (req, res, next) {
    var token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }
    jwt.verify(token, JWT_SECRET, function (err, user) {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};
connection.connect(function (err) {
    if (err) {
        console.error('Error conectando a la DB ' + err.stack);
        return;
    }
    console.log('Conexión establecida ' + connection.threadId);
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
app.get("/Registro", function (req, res) {
    connection.query('SELECT username, email FROM usuarios', function (err, rows, fields) {
        res.send(JSON.stringify(rows));
    });
});
///Opciones de usuario
app.put("/Registro", JsonParser, function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var pais = req.body.pais;
    var rating = 1000;
    connection.query('INSERT INTO usuarios(username,email,password,rating,pais) values(?,?,SHA1(?),?,?)', [username, email, password, rating, pais], function (err, rows, fields) {
        res.send(JSON.stringify(rows));
    });
});
app.post("/Login", JsonParser, function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM usuarios WHERE email=? AND password=SHA1(?)', [email, password], function (err, results, fields) {
        if (err) {
            return res.status(500).json({ error: 'Error retrieving user' });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        var user = results[0];
        if (!user) {
            return res.status(400).send('Usuario no encontrado');
        }
        var token = jwt.sign({ id: user.id, username: user.username, email: user.email, elo: user.rating }, JWT_SECRET, { expiresIn: '72h' });
        res.json({ token: token });
    });
});
app.put("/EditAccount", JsonParser, function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    connection.query('UPDATE usuarios SET password=SHA1(?), username=? WHERE email=?', [password, username, email], function (err, rows, fields) {
        if (err) {
            res.status(500).send({ error: 'Database error' });
            return;
        }
        res.send(JSON.stringify(rows));
    });
});
//Opciones de administrador
app.get("/LoginAdm", JsonParser, function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM administradores WHERE email=? AND password=SHA1(?)', [email, password], function (err, results, fields) {
        if (err) {
            return res.status(500).json({ error: 'Error retrieving user' });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        var user = results[0];
        if (!user) {
            return res.status(400).send('administrador no encontrado');
        }
        var token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_Admin, { expiresIn: '24h' });
        res.json({ token: token });
    });
});
app.get("/Adm", function (req, res) {
    connection.query('SELECT * FROM usuarios', function (err, rows, fields) {
        res.send(JSON.stringify(rows));
    });
});
