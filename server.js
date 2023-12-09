const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

require('dotenv').config();
require('./config/database');
require('./config/passport');

const indexRouter = require('./routes/index');
const gamesRouter = require('./routes/games');
const reviewRouter = require('./routes/reviews');

const app = express();
const PORT = process.env.PORT ?? 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

app.use('/', indexRouter);
app.use('/games', gamesRouter);
app.use('/reviews', reviewRouter);

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
