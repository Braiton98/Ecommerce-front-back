import { Router } from "express";
import Games from '../controllers/games-controller.js'


const router = Router();

router.get('/games', Games.getAll);

router.get('/game', Games.getByName);

router.get('/platform', Games.getByPlatform);

router.get('/letter', Games.getByFirstLetter);


export default router;