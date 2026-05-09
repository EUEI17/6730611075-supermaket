const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

const homeRoutes = require('./routes/index.routes');
const playerRoutes = require('./routes/player.routes');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'supermaket'
})

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
})

global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false })); // Uses the querystring library for parsing. Supports only simple objects with key-value pairs (e.g., no nested objects or arrays).
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure file upload

// routes for the app 
app.use('/', homeRoutes);
app.use('/player', playerRoutes);

app.listen(port, () => {
    console.log(`Server runniong on port: ${port}`);
});