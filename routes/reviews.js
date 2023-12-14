const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewCNTLR');
const ensureLoggedIn = require('../config/ensureLoggedin');

router.get('/', reviewController.index);

router.get('/search', reviewController.search);

router.get('/:gameId', reviewController.show);

router.post('/:gameId/:reviewId/like', reviewController.like);

router.post('/:gameId/submit-review', ensureLoggedIn, reviewController.create);

router.get('/:gameId/:reviewId/update', ensureLoggedIn, reviewController.edit);
router.post(
    '/:gameId/:reviewId/update',
    ensureLoggedIn,
    reviewController.updateReview
);

router.delete('/:reviewId', ensureLoggedIn, reviewController.delete);

module.exports = router;
