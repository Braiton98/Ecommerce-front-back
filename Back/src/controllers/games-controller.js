import { json } from 'express';
import GamesModel from '../models/game-model.js';
import { Sgames } from '../schemas/Sgames.js';


export default class Games {

  static async getAll(req, res) {
    const { data, error } = await GamesModel.getAll();
    console.log(data)
    error ? res.status(400).json({ error: 'No hay juegos.' })
      : res.status(200).json({ data });
  }

  static async getByName(req, res) {
    const { name } = req.query;

    if (!name) {
      throw new Error('El parámetro "name" es requerido.');
    }

    const { data, error } = await GamesModel.getByName(name);
    error ? res.status(400).json({ error: 'No se encuentra ese juego.' })
      : res.status(200).json({ data });
  }

  static async getByPlatform(req, res) {
    try {
      const { platforms } = req.query;

      if (!platforms) {
        throw new Error('El parámetro "platforms" es requerido.');
      }

      const { data, error } = await GamesModel.getByPlatform(platforms);

      if (error) {
        return res.status(400).json({ error });
      }

      res.status(200).json({ data });

    } catch (error) {
      res.status(500).json({ error: error.message || 'Error desconocido' });
    }
  }

  static async getByFirstLetter(req, res) {
    const { name } = req.query;

    if (!name) {
      throw new Error('El parámetro "name" es requerido.');
    }

    const reg = new RegExp(`^${name}`, 'i');

    name.match(reg);

    const { data, error } = await GamesModel.getByFirstLetter(name);
    error ? res.status(400).json({ error: 'No se encuentra ese juego.' })
      : res.status(200).json({ data });
  }

  static async getByID(req, res) {

    const { id } = req.params
    if (!id || !Number(id)) return res.status(400).json({ error: 'Not found ID' })
    const { data, error } = await GamesModel.getByID({ id: Number(id) })
    error ? res.status(400).json({ error: 'No games exist' })
      : res.status(200).json({ data });

  }

  static async createOne(req, res) {
    try {
      const body = req.body;
      console.log(req.files);
      const dataToVerify = {
        ...body,
        
        name: String(body.name),
        genres: String(body.genres),
        description: String(body.description),
        platforms: String(body.platforms),
        img: String(body.img),
        id: Number(body.id)
      };
  

  
      const games = Sgames.parse(body); 
  
      const { data, error } = await GamesModel.createOne(games);
      if (data) {
        return res.status(200).json(data);
      } else {
        throw new Error("Error creating game"); 
      }
    } catch (error) {
      res.status(400).json({ error: error.message || "Unknown error occurred" });
    }
  }
  

  static async update(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;
      console.log(body)
      if (!id || !body) {
        return res.status(400).json({ error: 'Bad request. Provide valid id and body.' });
      }
      const { data, error } = await GamesModel.update( Number(id), body);
      if (error) {
        console.error('Error updating data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

static async delete(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Bad request.' });
    }
    const result= await GamesModel.delete(Number(id));
    return res.status(200).json({ message: 'Successfully deleted the game.', result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

}
