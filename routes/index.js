const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('logo.ejs');
});

router.get('/home', (req, res) => {
    res.render('index.ejs');
});

router.get('/about', (req, res) => {
    res.render('about.ejs');
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

module.exports = router;
