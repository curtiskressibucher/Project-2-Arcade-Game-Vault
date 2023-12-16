const Game = require('../models/game');
const Tip = require('../models/tip');
const User = require('../models/user');

module.exports = {
    index,
    search,
    show,
    new: newTip,
    create,
    edit,
    updateTip,
    delete: deleteTip,
    like,
    // --------------------
    showTip,
    addComment,
    deleteComment,
};

async function index(req, res, next) {
    try {
        const games = await Game.find();

        res.render('tips/tipsIndex.ejs', {
            games,
            title: 'Tips And Tricks',
        });
    } catch (error) {
        res.render('error.ejs');
        next(error);
    }
}

async function search(req, res, next) {
    try {
        const query = req.query.query;
        const games = await Game.find({
            title: { $regex: new RegExp(query, 'i') },
        });

        res.render('tips/tipsIndex.ejs', {
            games,
            title: 'Search Results',
        });
    } catch (error) {
        res.render('error.ejs');
        next(error);
    }
}

async function show(req, res, next) {
    try {
        const gameId = req.params.gameId;

        const game = await Game.findById(gameId).populate('tips');

        res.render('tips/show.ejs', { game, title: 'Tips and tricks' });
    } catch (error) {
        res.render('error.ejs');
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
        res.render('error.ejs');
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
        //https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push
        await Game.findByIdAndUpdate(gameId, { $push: { tips: tip._id } });

        res.redirect(`/tips-and-tricks/${gameId}`);
    } catch (error) {
        res.render('error.ejs');
        next(error);
    }
}

async function like(req, res, next) {
    try {
        const gameId = req.params.gameId;
        const tipId = req.params.tipId;

        //$inc is an update operator in MongoDB that increments the value of the specified field.
        // Similar to the 'like' functionality in reviews, this logic handles the process of incrementing likes
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

async function edit(req, res, next) {
    try {
        const gameId = req.params.gameId;
        const tipId = req.params.tipId;

        const game = await Game.findById(gameId);
        const tip = await Tip.findById(tipId);

        res.render('tips/editTip.ejs', { tip, game, title: 'Edit Tip' });
    } catch (error) {
        res.render('error.ejs');
        next(error);
    }
}

async function updateTip(req, res, next) {
    try {
        const gameId = req.params.gameId;
        const tipId = req.params.tipId;

        const { title, content } = req.body;

        const game = await Game.findById(gameId);
        const tip = await Tip.findById(tipId);

        tip.title = title;
        tip.content = content;

        await tip.save();

        res.redirect(`/tips-and-tricks/${gameId}`);
    } catch (error) {
        res.render('error.ejs');
        next(error);
    }
}

async function deleteTip(req, res, next) {
    try {
        const tipId = req.params.tipId;
        const tip = await Tip.findById(tipId);

        const gameId = tip.game;

        await Tip.findByIdAndDelete(tipId);

        res.redirect(`/tips-and-tricks/${gameId}`);
    } catch (error) {
        res.render('error.ejs');
        next(error);
    }
}

// -------------------------------------------------------------------------------------------------------------------------------------
// Separate the main tip page from comments on individual tips.

async function showTip(req, res, next) {
    try {
        const tipId = req.params.tipId;

        const tip = await Tip.findById(tipId).populate('user').populate({
            path: 'comments.user',
        });

        tip.comments.sort((a, b) => b.createdAt - a.createdAt);

        res.render('tips/showTip.ejs', { tip, title: 'Tip' });
    } catch (error) {
        res.render('error.ejs');
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
        res.render('error.ejs');
        next(error);
    }
}

async function deleteComment(req, res, next) {
    try {
        const gameId = req.params.gameId;
        const tipId = req.params.tipId;
        const commentId = req.params.commentId;

        await Tip.findByIdAndUpdate(
            tipId,
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );

        res.redirect(`/tips-and-tricks/${gameId}/${tipId}/tip`);
    } catch (error) {
        res.render('error.ejs');
        next(error);
    }
}
