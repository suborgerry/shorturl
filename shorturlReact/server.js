const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json({ extended: true }));

app.post('/', function (req, res) {
  if(!req.body) return response.sendStatus(400);

  // const mysql = require('mysql')
  // const connection = mysql.createConnection({
  //   host: 'localhost',
  //   user: 'mysql',
  //   password: 'mysql',
  //   database: 'urldb'
  // });

  console.log(req.body);

  // connection.connect();

  // connection.query('SELECT * FROM links', function (err, rows, fields) {
  //   if (err) throw err
  //   if(req.body.url.length >= 7) {
  //     connection.query(`INSERT INTO links(url, shorturl) VALUES(${url}${rand})`)
  //   }
  // });

  // connection.end();
  
  return res.json(req.body);
});

app.listen(process.env.PORT || 8080);