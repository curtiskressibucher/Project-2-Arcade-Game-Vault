const express = require('express');
const router = express.Router();
const passport = require('passport');

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

router.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account',
    })
);
router.get(
    '/oauth2callback',
    passport.authenticate('google', {
        successRedirect: '/home',
        failureRedirect: '/home',
    })
);
router.get(
    '/auth/discord',
    passport.authenticate('discord', {
        scope: ['identify', 'email'],
        prompt: 'select_account',
    })
);

router.get(
    '/api/auth/discord/redirect',
    passport.authenticate('discord', {
        successRedirect: '/home',
        failureRedirect: '/home',
    })
);

router.get('/logout', function (req, res) {
    req.logout(function () {
        res.redirect('/home');
    });
});

module.exports = router;
