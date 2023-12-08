const Game = require('../models/game');

module.exports = {
    index,
    create,
    new: newGame,
    edit,
    update,
    delete: deleteGame,
};

async function index(req, res, next) {
    try {
        let games = await Game.find();
        games = games.sort(function (a, b) {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();
            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
                return 1;
            }
            return 0;
        });

        console.log('Sorted games data:', games);
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
        console.log(gameId);
        const game = await Game.findById(gameId);
        if (game) {
            res.render('games/edit.ejs', { game });
        }
    } catch (error) {
        next(error);
    }
}
async function update(req, res, next) {
    try {
        const gameId = req.params.id;
        const { title, genre, platform, releaseYear, image } = req.body;

        await Game.findByIdAndUpdate(gameId, {
            title,
            genre,
            platform,
            releaseYear,
            image,
        });

        res.redirect('/games');
    } catch (error) {
        next(error);
    }
}
async function deleteGame(req, res, next) {
    try {
        const gameId = req.params.id;
        await Game.findByIdAndDelete(gameId);
        res.redirect('/games');
    } catch (error) {
        next(error);
    }
}
