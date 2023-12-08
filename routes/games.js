const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameCNTLR');

router.get('/', gameController.index);
router.get('/new', gameController.new);
router.post('/new', gameController.create);
router.get('/:id/edit', gameController.edit);

module.exports = router;
