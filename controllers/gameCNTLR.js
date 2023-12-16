const game = require('../models/game');
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

        // Sorts games alphabetically
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
        // console.log('Demo! Game data:', games);

        res.render('games/index.ejs', { games, title: 'Game Vault' });
    } catch (error) {
        res.render('error.ejs');
        next(error);
    }
}

async function newGame(req, res, next) {
    try {
        res.render('games/new.ejs', { title: 'Add Game' });
    } catch (error) {
        res.render('error.ejs');
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const { title, genre, platform, releaseYear, image } = req.body;

        //Handles the URLs, making sure it won't bloat the data with unnecessary large URLs
        const maxUrlLength = 700;
        if (image.length > maxUrlLength) {
            return res.send('Invalid image URL. URL is too long. ');
        }

        // Checks to see if the url is the right format. And wont accept GIF's png's and data:image
        if (
            (image && image.toLowerCase().includes('gif')) ||
            image.toLowerCase().includes('png') ||
            image.toLowerCase().startsWith('data:image')
        ) {
            return res.send(
                'Invalid image URL. GIFs, png and Data:images are not allowed.'
            );
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
        res.render('error.ejs');
        next(error);
    }
}

async function edit(req, res, next) {
    try {
        //Simple edit function to render the edit page for said game.
        const gameId = req.params.id;
        const game = await Game.findById(gameId);

        res.render('games/edit.ejs', { game, title: 'Edit Game' });
    } catch (error) {
        res.render('error.ejs');
        next(error);
    }
}

async function update(req, res, next) {
    try {
        // Update the existing game data
        const gameId = req.params.id;
        const { title, genre, platform, releaseYear, image } = req.body;

        //Same logic in the create function, validate the image URL length
        const maxUrlLength = 700;
        if (image.length > maxUrlLength) {
            return res.send('Invalid image URL. URL is too long. ');
        }
        // Validate image format and restrict certain types
        if (
            (image && image.toLowerCase().includes('gif')) ||
            image.toLowerCase().includes('png') ||
            image.toLowerCase().startsWith('data:image')
        ) {
            return res.send(
                'Invalid image URL. GIFs, png and Data:images are not allowed.'
            );
        }

        await Game.findByIdAndUpdate(gameId, {
            title,
            genre,
            platform,
            releaseYear,
            image,
        });

        res.redirect('/games');
    } catch (error) {
        res.render('error.ejs');
        next(error);
    }
}

async function deleteGame(req, res, next) {
    try {
        const gameId = req.params.id;
        await Game.findOneAndDelete({ _id: gameId, user: req.user._id });
        res.redirect('/games');
    } catch (error) {
        res.render('error.ejs');
        next(error);
    }
}

async function search(req, res, next) {
    try {
        //First time trying a search bar.
        //https://expressjs.com/en/4x/api.html#req.query
        const query = req.query.query;
        let searchResults = [];

        if (query) {
            //https://www.mongodb.com/docs/manual/reference/operator/query/regex/
            // By using the MongoDB operator for regex expressions, created a way for it to simply search for any title with similar characters in the query, as well as make it case insensitive
            searchResults = await Game.find({
                user: req.user._id,
                title: { $regex: new RegExp(query, 'i') },
            });
        }

        res.render('games/index.ejs', {
            games: searchResults,
            title: 'Search Results',
        });
    } catch (error) {
        res.render('error.ejs');
        next(error);
    }
}

async function add(req, res, next) {
    try {
        // To enhance the UI experience for users, this function allows the user to add a game from the review library
        const reviewGameId = req.body.reviewGameId;
        const userId = req.user._id;

        const reviewGame = await Game.findById(reviewGameId);

        const userVaultGame = await Game.findOne({
            _id: reviewGameId,
            user: userId,
        });

        if (!userVaultGame) {
            // If the game is not in the library, add it
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
        res.render('error.ejs');
        next(error);
    }
}
