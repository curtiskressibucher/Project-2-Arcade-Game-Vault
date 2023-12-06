const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameCNTLR');

router.get('/', gameController.index);
router.get('/new', gameController.new);
router.post('/new', gameController.create);

module.exports = router;
