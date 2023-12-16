const Game = require('../models/game');
const Review = require('../models/review');

module.exports = {
    index,
    show,
    create,
    delete: deleteReview,
    search,
    edit,
    updateReview,
    like,
};

async function index(req, res, next) {
    try {
        // Finds the game to display them on the main page.
        const games = await Game.find();

        const reviews = await Review.find().populate('user');

        res.render('reviews/reviewIndex.ejs', {
            games,
            reviews,
            title: 'Reviews',
        });
    } catch (error) {
        res.render('error.ejs');
        next(error);
    }
}

async function show(req, res, next) {
    try {
        const gameId = req.params.gameId;

        const game = await Game.findById(gameId).populate({
            path: 'reviews',
            // Sorts the reviews so the newest review is on top
            options: { sort: { createdAt: -1 } },
        });

        res.render('reviews/show.ejs', { game, title: game.title });
    } catch (error) {
        res.render('error.ejs');
        next(error);
    }
}

async function create(req, res, next) {
    try {
        // Create a new review with the authenticated user's information
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

        // Save the new review to the database
        await newReview.save();

        const game = await Game.findById(gameId);

        // Add the new review to the game's reviews array
        game.reviews.push(newReview);
        await game.save();

        res.redirect(`/reviews/${gameId}`);
    } catch (error) {
        res.render('error.ejs');
        next(error);
    }
}

async function edit(req, res, next) {
    try {
        // Edit the review. Passing in both the game and review id's
        const gameId = req.params.gameId;
        const reviewId = req.params.reviewId;

        const game = await Game.findById(gameId);
        const review = await Review.findById(reviewId);

        res.render('reviews/edit.ejs', { review, game, title: 'Edit Review' });
    } catch (error) {
        res.render('error.ejs');
        next(error);
    }
}

async function updateReview(req, res, next) {
    try {
        const gameId = req.params.gameId;
        const reviewId = req.params.reviewId;

        const { content, rating } = req.body;

        const game = await Game.findById(gameId);
        const review = await Review.findById(reviewId);

        review.content = content;
        review.rating = rating;

        await review.save();

        res.redirect(`/reviews/${gameId}`);
    } catch (error) {
        res.render('error.ejs');
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
        res.render('error.ejs');
        next(error);
    }
}

async function search(req, res, next) {
    try {
        // Another search bar, very similar to the game controller
        const query = req.query.query;
        const games = await Game.find({
            title: { $regex: new RegExp(query, 'i') },
        });

        const reviews = await Review.find().populate('user');

        res.render('reviews/reviewIndex.ejs', {
            games,
            reviews,
            title: 'Search Results',
        });
    } catch (error) {
        res.render('error.ejs');
        next(error);
    }
}

async function like(req, res, next) {
    try {
        // My first attempt at a like button. This function should increment the likes count for the specified review
        const gameId = req.params.gameId;
        const reviewId = req.params.reviewId;

        const review = await Review.findByIdAndUpdate(
            reviewId,
            //Using more mongoDB operators to increment the 'likes' feild
            //https://www.mongodb.com/docs/manual/reference/operator/update/inc/#mongodb-update-up.-inc
            { $inc: { likes: 1 } },
            { new: true }
        );

        res.redirect(`/reviews/${gameId}`);
    } catch (error) {
        res.render('error.ejs');
        next(error);
    }
}
