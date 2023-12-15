const express = require('express');
const router = express.Router();
const tipsController = require('../controllers/tipsCNTLR');
const ensureLoggedIn = require('../config/ensureLoggedin');

router.get('/', tipsController.index);

router.get('/search', tipsController.search);

router.get('/:gameId', tipsController.show);

router.get('/:gameId/new', tipsController.new);
router.post('/:gameId/new', tipsController.create);

router.get('/:gameId/:tipId/update', ensureLoggedIn, tipsController.edit);
router.post('/:gameId/:tipId/update', ensureLoggedIn, tipsController.updateTip);

router.delete('/:gameId/:tipId', ensureLoggedIn, tipsController.delete);

router.post('/:gameId/:tipId/like', tipsController.like);

router.get('/:gameId/:tipId/tip', ensureLoggedIn, tipsController.showTip);
router.post(
    '/:gameId/:tipId/comment',
    ensureLoggedIn,
    tipsController.addComment
);

router.delete(
    '/:gameId/:tipId/:commentId',
    ensureLoggedIn,
    tipsController.deleteComment
);

module.exports = router;
