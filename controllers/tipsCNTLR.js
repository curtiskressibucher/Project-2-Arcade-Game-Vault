const Game = require('../models/game');
const Tip = require('../models/tip');
const User = require('../models/user');

module.exports = {
    index,
    search,
    show,
    new: newTip,
    create,
    like,
    showTip,
    addComment,
};

async function index(req, res, next) {
    try {
        const games = await Game.find();

        res.render('tips/tipsIndex.ejs', {
            games,
            title: 'Tips And Tricks',
        });
    } catch (error) {
        next(error);
    }
}

async function search(req, res, next) {
    try {
        const query = req.query.query;
        const games = await Game.find({
            title: { $regex: new RegExp(query, 'i') },
        });

        res.render('tips/tipsIndex.ejs.ejs', {
            games,
            title: 'Search Results',
        });
    } catch (error) {
        next(error);
    }
}

async function show(req, res, next) {
    try {
        const gameId = req.params.gameId;

        const game = await Game.findById(gameId).populate('tips');

        res.render('tips/show.ejs', { game, title: 'Tips and tricks' });
    } catch (error) {
        next(error);
    }
}

async function newTip(req, res, next) {
    try {
        const gameId = req.params.gameId;

        res.render('tips/createTip.ejs', {
            game: gameId,
            title: 'Create Tips And Tricks',
        });
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const gameId = req.params.gameId;
        const { title, content } = req.body;

        const userId = req.user._id;

        const tip = new Tip({
            title,
            content,
            user: userId,
            game: gameId,
        });

        await tip.save();

        // I was having an issue with getting tips to populate in the game. So, by using the $push operator, I can add the _id of the new tip to the game object.
        await Game.findByIdAndUpdate(gameId, { $push: { tips: tip._id } });

        res.redirect(`/tips-and-tricks/${gameId}`);
    } catch (error) {
        next(error);
    }
}

async function like(req, res, next) {
    try {
        const gameId = req.params.gameId;
        const tipId = req.params.tipId;

        const tip = await Tip.findByIdAndUpdate(
            tipId,
            { $inc: { likes: 1 } },
            { new: true }
        );

        res.redirect(`/tips-and-tricks/${gameId}`);
    } catch (error) {
        next(error);
    }
}

async function showTip(req, res, next) {
    try {
        const tipId = req.params.tipId;

        const tip = await Tip.findById(tipId).populate('user');

        res.render('tips/showTip.ejs', { tip, title: 'T' });
    } catch (error) {
        next(error);
    }
}

async function addComment(req, res, next) {
    try {
        const gameId = req.params.gameId;
        const tipId = req.params.tipId;
        const { commentText } = req.body;
        const userId = req.user._id;

        const comment = {
            text: commentText,
            user: userId,
        };

        await Tip.findByIdAndUpdate(tipId, { $push: { comments: comment } });

        res.redirect(`/tips-and-tricks/${gameId}/${tipId}/tip`);
    } catch (error) {
        next(error);
    }
}
