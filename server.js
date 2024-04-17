const { log } = require('console');
const express = require('express');
const session = require('express-session');
const path = require('path');
const { Pool } = require('pg');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(session({
	secret: 'd361d614572161d6021d3989ede5252c2f470f7302e5fdc681a91d5e136c79f8',
	resave: true,
	saveUninitialized: true
}));

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, 
  connectionTimeoutMillis: 5000,
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/static/strona/login.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname + '/static/strona/registration.html')); //post do dopisania
});
app.get('/home', (req, res) => {
  res.redirect('/');
});
app.get('/', (req, res) => {
  
  res.sendFile(path.join(__dirname + '/static/strona/index.html'));
});

app.post('/auth', async (req, res) => {

	let username = req.body.username;
	let password = req.body.password;
  
  async function loginQuery(){
    try {
      const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
      console.log(result.rows);
      if (result.rows.length > 0) {
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/home');
      } else {
        res.send('Incorrect Username and/or Password!');
      }
    } catch (err) {
      console.error(err);
    }
  }

	if (username && password) {
		loginQuery();
    //pool.end();
    
  } else {
    res.send('Please enter Username and Password!');
    //res.end();
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
