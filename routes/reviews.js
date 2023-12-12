const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewCNTLR');

router.get('/', reviewController.index);

router.get('/search', reviewController.search);

router.get('/:gameId', reviewController.show);

router.post('/:gameId/submit-review', reviewController.create);

router.get('/:gameId/:reviewId/update', reviewController.edit);
router.post('/:gameId/:reviewId/update', reviewController.updateReview);

router.delete('/:reviewId', reviewController.delete);

module.exports = router;
