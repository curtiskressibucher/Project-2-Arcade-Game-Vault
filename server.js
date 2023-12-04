const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
