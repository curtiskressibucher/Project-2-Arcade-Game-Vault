const express = require('express');
const router = express.Router();
const tipsController = require('../controllers/tipsCNTLR');

router.get('/', tipsController.index);

router.get('/search', tipsController.search);

router.get('/:gameId', tipsController.show);

router.get('/:gameId/new', tipsController.new);
router.post('/:gameId/new', tipsController.create);

router.post('/:gameId/:tipId/like', tipsController.like);

router.get('/:gameId/:tipId/tip', tipsController.showTip);
router.post('/:gameId/:tipId/comment', tipsController.addComment);

module.exports = router;
