const Game = require('../models/game');
const Review = require('../models/review');

module.exports = {
    index,
    show,
    create,
    delete: deleteReview,
    search,
};

async function index(req, res, next) {
    try {
        const games = await Game.find();
        const reviews = await Review.find().populate('user');

        res.render('reviews/reviewIndex.ejs', { games, reviews });
    } catch (error) {
        next(error);
    }
}

async function show(req, res, next) {
    try {
        const gameId = req.params.gameId;

        const game = await Game.findById(gameId).populate('reviews');

        res.render('reviews/show.ejs', { game });
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const gameId = req.params.gameId;
        const { content, rating } = req.body;
        const { _id: userId, name: userName, avatar: userAvatar } = req.user;

        const newReview = new Review({
            content,
            rating,
            user: userId,
            userName,
            userAvatar,
            game: gameId,
        });
        console.log(newReview);

        await newReview.save();

        const game = await Game.findById(gameId);

        game.reviews.unshift(newReview);

        await game.save();

        res.redirect(`/reviews/${gameId}`);
    } catch (error) {
        next(error);
    }
}

async function deleteReview(req, res, next) {
    try {
        const reviewId = req.params.reviewId;
        const review = await Review.findById(reviewId);

        const gameId = review.game;

        await Review.findByIdAndDelete(reviewId);

        res.redirect(`/reviews/${gameId}`);
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
        console.log('extracted game:', games);

        const reviews = await Review.find().populate('user');

        res.render('reviews/reviewIndex.ejs', { games, reviews });
    } catch (error) {
        next(error);
    }
}
