const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const passport = require('passport');


const mainRoutes = require('./routes/main');

const app = express();
const port = process.env.PORT || 7000;

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.use(mainRoutes);


app.listen(port, (err) => {
    if (!err) {
        console.log(`Server running at http://localhost:${port}`)
    }
})