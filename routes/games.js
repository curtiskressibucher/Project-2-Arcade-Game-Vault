const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameCNTLR');
const ensureLoggedIn = require('../config/ensureLoggedin');

router.get('/', gameController.index);
router.get('/search', ensureLoggedIn, gameController.search);

router.get('/new', ensureLoggedIn, gameController.new);
router.post('/new', ensureLoggedIn, gameController.create);

router.get('/:id/edit', ensureLoggedIn, gameController.edit);
router.post('/:id/edit', ensureLoggedIn, gameController.update);

router.delete('/:id', gameController.delete);

module.exports = router;
