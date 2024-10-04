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
    console.log('Conexión establecida ' + connection.threadId);
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

app.put("/Registro",JsonParser,(req:any,res:any)=>{
  let username=req.body.username;
  let email=req.body.email;
  let password=req.body.password;
  let pais=req.body.pais;
  let rating=1000;
  connection.query('INSERT INTO usuarios(username,email,password,pais,rating) values(?,?,SHA1(?),?,?)',[username,email,password,pais,rating],function(err:any,rows:any,fields:any){
      res.send(rows);
  });
})

app.post("/Login",JsonParser,(req:any,res:any)=>{
  let email=req.body.email;
  let password=req.body.password;
  connection.query('SELECT * FROM usuarios WHERE username=? AND password=SHA1(?)',[email,password],function(err:any,rows:any,fields:any){
      res.send(JSON.stringify(rows));
  });
})

app.get("/Adm",(req:any,res:any)=>{
  connection.query('SELECT * FROM usuarios',function(err:any,rows:any,fields:any){
      res.send(JSON.stringify(rows));
  });
})
