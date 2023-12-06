const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('logo.ejs');
});

router.get('/home', (req, res) => {
    res.render('index.ejs');
});

module.exports = router;
