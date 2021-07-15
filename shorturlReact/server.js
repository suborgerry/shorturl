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

  const randomName = Math.random().toString(36).substring(7);

  try {
    const mysql = require('mysql');
    const urldb = mysql.createConnection({
      host: 'localhost',
      user: 'mysql',
      password: 'mysql',
      database: 'urldb'
    });

    urldb.connect();
    urldb.query('SELECT * FROM links', function (err) {
      if (err) throw err
        urldb.query(`INSERT INTO links(url, shorturl) VALUES("${req.body.url}", "${randomName}")`);
        return res.json({ url: `${req.body.localUrl}${randomName}` })
    });
  } catch(e) {
    console.error(e)
  }
});

app.listen(process.env.PORT || 8080);