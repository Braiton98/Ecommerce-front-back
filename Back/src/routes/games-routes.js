import { Router } from "express";
import Games from '../controllers/games-controller.js'
import multerInstance from '../../utilities/multer.js'


const router = Router();

router.get('/games', Games.getAll); 

router.get('/game', Games.getByName);

router.get('/platform', Games.getByPlatform);

router.get('/letter', Games.getByFirstLetter);

router.get('/games/:id', Games.getByID)

router.post('/games',multerInstance.single('imagenproducto'), Games.createOne)


export default router;