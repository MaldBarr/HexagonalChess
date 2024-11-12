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
const JWT_Admin = 'admHC';

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

app.get('/Usuarios/:id',JsonParser,(req:any,res:any) => {
  let id = req.params.id;
  if (id === undefined || id === null) {
    return res.status(400).send('id_usuario is undefined');
  }
  connection.query('SELECT username, rating FROM usuarios WHERE id_usuario = ?', [id], function (err:any,result:any) {
    if (err) {
      console.error('Error getting user:', err);
      res.status(500).send('Error getting user');
    } else {
      res.send(result);
    }
  });
});

app.put('/Usuarios/:id/Elo',JsonParser,(req:any,res:any) => {
  let id = req.params.id;
  let rating = req.body.rating;
  if (id === undefined || id === null) {
    return res.status(400).send('id_usuario is undefined');
  }
  connection.query('UPDATE usuarios SET rating = ? WHERE id_usuario = ?', [rating, id], function (err:any,result:any) {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).send('Error updating user');
    } else {
      res.send('User updated successfully');
    }
  });
});

app.get("/Registro",(req:any,res:any)=>{
  connection.query('SELECT username, email FROM usuarios',function(err:any,rows:any,fields:any){
      res.send(JSON.stringify(rows));
  });
})

///Opciones de usuario
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
    const token = jwt.sign({ id: user.id_usuario, username: user.username, email: user.email, elo: user.rating }, JWT_SECRET, { expiresIn: '72h' });
    res.json({ token });
  });
})

app.put("/EditAccount", JsonParser, (req: any, res: any) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  connection.query(
    'UPDATE usuarios SET password=SHA1(?), username=? WHERE email=?',
    [password, username, email],
    function (err: any, rows: any, fields: any) {
      if (err) {
        res.status(500).send({ error: 'Database error' });
        return;
      }
      res.send(JSON.stringify(rows));
    }
  );
});

//Opciones de administrador
app.get("/LoginAdm",JsonParser,(req:any,res:any)=>{
  let email=req.body.email;
  let password=req.body.password;
  connection.query('SELECT * FROM administradores WHERE email=? AND password=SHA1(?)',[email,password],function(err:any,results:any,fields:any){
    if (err) {
      return res.status(500).json({ error: 'Error retrieving user' });
    }
    if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    const user = results[0];
      if (!user) {
        return res.status(400).send('administrador no encontrado');
      }
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_Admin, { expiresIn: '24h' });
    res.json({ token });
  });
})

app.get("/Adm",(req:any,res:any)=>{
  connection.query('SELECT * FROM usuarios',function(err:any,rows:any,fields:any){
      res.send(JSON.stringify(rows));
  });
})

//Lobbies
app.get("/Lobbies",(req:any,res:any)=>{
  connection.query('SELECT * FROM lobbies',function(err:any,rows:any,fields:any){
      res.send(JSON.stringify(rows));
  });
})

app.post("/Lobbies",JsonParser,(req:any,res:any)=>{
  let id=req.body.id;
  let user1=req.body.user1;
  let elo1=req.body.elo1;
  connection.query('INSERT INTO lobbies(id_Partida,id_player_white,iniciado,elo_white) values(?,?,0,?)',[id,user1,elo1],function(err:any,rows:any,fields:any){
    res.send(JSON.stringify(rows));
  });
})

app.put("/Lobbies/:id_Partida",JsonParser,(req:any,res:any)=>{
  let id_Partida = req.params.id_Partida;
  let iniciado = req.body.iniciado;
  let user2 = req.body.user2;

  connection.query('UPDATE lobbies SET iniciado = ?, id_player_black = ? WHERE id_Partida = ?', [iniciado,user2, id_Partida], function(err: any, result: any) {
    if (err) {
      console.error('Error updating lobby:', err);
      res.status(500).send('Error updating lobby');
    } else {
      res.send('Lobby updated successfully');
    }
  });
})

app.delete("/Lobbies/:id_Partida", (req: any, res: any) => {
  let id_Partida = req.params.id_Partida;

  connection.query('DELETE FROM lobbies WHERE id_Partida = ?', [id_Partida], function (err: any, result: any) {
    if (err) {
      console.error('Error deleting lobby:', err);
      res.status(500).send('Error deleting lobby');
    } else {
      res.send('Lobby deleted successfully');
    }
  });
});

app.get("/Lobbies/:id_Partida", (req: any, res: any) => {
  let id_Partida = req.params.id_Partida;

  connection.query('SELECT * FROM lobbies WHERE id_Partida = ?', [id_Partida], function (err: any, result: any) {
    if (err) {
      console.error('Error getting lobby:', err);
      res.status(500).send('Error getting lobby');
    } else {
      res.send(result);
    }
  });
});

//Resultado final de la partida
app.post("/Lobbies/:id_Partida/end",JsonParser,(req:any,res:any)=>{
  let resultado=req.body.resultado;
  let id_Partida=req.params.id_Partida;
  connection.query('UPDATE lobbies SET resultado = ? WHERE id_Partida = ?', [resultado,id_Partida], function(err: any, result: any) {
    if (err) {
      console.error('Error updating lobby:', err);
      res.status(500).send('Error updating lobby');
    } else {
      res.send('Lobby updated successfully');
    }
  });
})