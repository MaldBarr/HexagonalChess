const express=require('express');
const mysql=require('mysql');
const cors = require('cors');
const bodyParser=require('body-parser');
const jwt = require('jsonwebtoken');

const app=express();

app.use(cors());

var JsonParser = bodyParser.json();

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    port: 3306,
    database : 'hexachess'
});

const JWT_SECRET = 'hexacheck';

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
      return res.status(401).json({ error: 'Access denied' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
          return res.status(403).json({ error: 'Invalid token' });
      }
      req.user = user;
      next();
  });
};

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

app.get("/Registro",(req:any,res:any)=>{
  connection.query('SELECT username, email FROM usuarios',function(err:any,rows:any,fields:any){
      res.send(JSON.stringify(rows));
  });
})

app.put("/Registro",JsonParser,(req:any,res:any)=>{
  let username=req.body.username;
  let email=req.body.email;
  let password=req.body.password;
  let pais=req.body.pais;
  let rating=1000;
  connection.query('INSERT INTO usuarios(username,email,password,rating,pais) values(?,?,SHA1(?),?,?)',[username,email,password,rating,pais],function(err:any,rows:any,fields:any){
    res.send(JSON.stringify(rows));
  });
})

app.post("/Login",JsonParser,(req:any,res:any)=>{
  let email=req.body.email;
  let password=req.body.password;
  connection.query('SELECT * FROM usuarios WHERE email=? AND password=SHA1(?)',[email,password],function(err:any,results:any,fields:any){
    if (err) {
      return res.status(500).json({ error: 'Error retrieving user' });
    }
    if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    const user = results[0];
      if (!user) {
        return res.status(400).send('Usuario no encontrado');
      }
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '72h' });
    res.json({ token });
  });
})

app.get("/Adm",(req:any,res:any)=>{
  connection.query('SELECT * FROM usuarios',function(err:any,rows:any,fields:any){
      res.send(JSON.stringify(rows));
  });
})
