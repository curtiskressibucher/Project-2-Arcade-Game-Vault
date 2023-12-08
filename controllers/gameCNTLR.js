const Game = require('../models/game');

module.exports = {
    index,
    create,
    new: newGame,
    edit,
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
        const { title, genre, platform, releaseYear, image } = req.body;
        const newGame = new Game({
            title,
            genre,
            platform,
            releaseYear,
            image,
        });
        await newGame.save();
        res.redirect('/games');
    } catch (error) {
        next(error);
    }
}

async function edit(req, res, next) {
    try {
        const gameId = req.params.id;
        const game = await Game.findById(gameId);
        if (!game) {
            return res.status(404).send('Game not found');
        }
        res.render('games/edit.ejs', { game });
    } catch (error) {
        next(error);
    }
}
