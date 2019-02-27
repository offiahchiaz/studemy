const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const secret = require('./config/secret');
const Category = require('./models/category');

const adminRoutes = require('./routes/admin');
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user');

const app = express();
const port = secret.port;

mongoose.connect(secret.MongoURI, {useNewUrlParser: true})
    .then(() => console.log('Database connected...'))
    .catch((err) => console.log(err));

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret.secretKey,
    store: new MongoStore({url: secret.MongoURI, autoReconnect: true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Global vars
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});
app.use((req, res, next) => {
    Category.find({}, (err, categories) => {
        if (err) next (err);
        res.locals.categories = categories;
        next();
    });
});


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.use(adminRoutes);
app.use(mainRoutes);
app.use(userRoutes);


app.listen(port, (err) => {
    if (!err) {
        console.log(`Server running at http://localhost:${port}`)
    }
})