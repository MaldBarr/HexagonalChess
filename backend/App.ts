const express=require('express');
const mysql=require('mysql');
const cors = require('cors');
const bodyParser=require('body-parser');
const app=express();

app.use(cors());

var JsonParser = bodyParser.json();

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    port: 3306,
    database : 'baseuser'
});

connection.connect(function(err:any) {
    if (err) {
    console.error('Error conectando a la DB ' + err.stack);
    return;
    }
    console.log('Conexión establecida' + connection.threadId);
});

const configuracion={
  hostname:"127.0.0.1",
  port:3000
}

app.listen(configuracion,()=>{
  console.log('Servidor iniciado en http://localhost:'+configuracion.port)
})

app.get('/', (req, res) => {
  console.log('GET /');
});