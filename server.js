const express = require('express');
const path = require('path');
const logger = require('morgan');

require('dotenv').config();
require('./config/database');

const indexRouter = require('./routes/index');
const gamesRouter = require('./routes/games');

const app = express();
const PORT = process.env.PORT ?? 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/games', gamesRouter);

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
