const express = require('express');
const router = express.Router();
const Games = require('../controllers/games-controller');

router.get('/games', Games.getAll);

router.get('/game', Games.getByName);

router.get('/platform', Games.getByPlatform)

module.exports = router;