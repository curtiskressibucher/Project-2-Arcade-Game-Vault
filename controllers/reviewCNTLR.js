const Game = require('../models/game');
const Review = require('../models/review');

module.exports = {
    index,
    show,
    create,
};

async function index(req, res) {
    try {
        const games = await Game.find();
        const reviews = await Review.find();

        res.render('reviews/reviewIndex.ejs', { games, reviews });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal Server Error');
    }
}

async function show(req, res) {
    try {
        const gameId = req.params.gameId;

        const game = await Game.findById(gameId).populate('reviews');

        res.render('reviews/show.ejs', { game });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal Server Error');
    }
}

async function create(req, res) {
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
        });

        await newReview.save();

        const game = await Game.findById(gameId);

        game.reviews.unshift(newReview);

        await game.save();

        res.redirect(`/reviews/${gameId}`);
    } catch (err) {
        console.error('Error creating review:', err);
        res.status(500).send('Internal Server Error');
    }
}
