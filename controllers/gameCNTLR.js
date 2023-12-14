const Game = require('../models/game');

module.exports = {
    index,
    create,
    new: newGame,
    add,
    edit,
    update,
    delete: deleteGame,
    search,
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

        res.render('games/index.ejs', { games, title: 'Game Vault' });
    } catch (error) {
        next(error);
    }
}

async function newGame(req, res, next) {
    try {
        res.render('games/new.ejs', { title: 'Add Game' });
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const { title, genre, platform, releaseYear, image } = req.body;

        if (image && image.toLowerCase().includes('gif', 'png')) {
            return res.send('Invalid image URL. GIFs are not allowed.');
        }

        const newGame = new Game({
            title,
            genre,
            platform,
            releaseYear,
            image,
            user: req.user._id,
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

        if (game) {
            res.render('games/edit.ejs', { game, title: 'Edit Game' });
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
        await Game.findOneAndDelete({ _id: gameId, user: req.user._id });
        res.redirect('/games');
    } catch (error) {
        next(error);
    }
}

async function search(req, res, next) {
    try {
        //https://expressjs.com/en/4x/api.html#req.query
        const query = req.query.query;
        let searchResults = [];

        if (query) {
            //https://www.mongodb.com/docs/manual/reference/operator/query/regex/
            // Learnt how to find patterns using this syntax
            searchResults = await Game.find({
                user: req.user._id,
                title: { $regex: new RegExp(query, 'i') },
            });
        }

        res.render('games/index.ejs', {
            games: searchResults,
            title: 'Searh Results',
        });
    } catch (error) {
        next(error);
    }
}

async function add(req, res, next) {
    try {
        const reviewGameId = req.body.reviewGameId;
        const userId = req.user._id;

        const reviewGame = await Game.findById(reviewGameId);

        const userVaultGame = await Game.findOne({
            _id: reviewGameId,
            user: userId,
        });

        if (!userVaultGame) {
            const newGameInLibrary = new Game({
                title: reviewGame.title,
                genre: reviewGame.genre,
                platform: reviewGame.platform,
                releaseYear: reviewGame.releaseYear,
                image: reviewGame.image,
                user: userId,
            });

            await newGameInLibrary.save();
        }

        res.redirect('/games');
    } catch (error) {
        next(error);
    }
}
