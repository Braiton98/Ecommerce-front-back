import { Router } from "express";
import Games from '../controllers/games-controller.js'


const router = Router();

router.get('/games', Games.getAll);

router.get('/game', Games.getByName);

router.get('/platform', Games.getByPlatform)


export default router;