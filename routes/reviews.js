const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewCNTLR');

router.get('/', reviewController.index);

router.get('/:gameId', reviewController.show);

router.post('/:gameId/submit-review', reviewController.create);

module.exports = router;
