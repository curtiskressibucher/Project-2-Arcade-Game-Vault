const Game = require('../models/game');

module.exports = {
    index,
    create,
    new: newGame,
};

async function index(req, res, next) {
    try {
        const games = await Game.find();
        res.render('games/index.ejs', { games });
    } catch (error) {
        next(error);
    }
}

async function newGame(req, res, next) {
    try {
        res.render('games/new.ejs');
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const { title, genre, platform, releaseYear } = req.body;
        const newGame = new Game({
            title,
            genre,
            platform,
            releaseYear,
        });
        await newGame.save();
        res.redirect('/games');
    } catch (error) {
        next(error);
    }
}
