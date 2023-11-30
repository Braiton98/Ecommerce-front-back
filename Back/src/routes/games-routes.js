const express = require('express');
const router = express.Router();
const Games = require('../controllers/games-controller');

router.get('/games', Games.getAll);

module.exports = router;