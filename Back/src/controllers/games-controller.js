const GamesModel = require('../models/game-model');

class Games{
  static async getAll(req, res){
    const {data, error} = await GamesModel.getAll();
    error ? res.status(400).json({error: 'No hay juegos.'})
          : res.status(200).json({data});
  }

  static async getByName(req, res){
    const {name} = req.query;
  
    if (!name) {
      throw new Error('El parámetro "name" es requerido.');
    }

    const {data, error} = await GamesModel.getByName(name);
    error ? res.status(400).json({error: 'No se encuentra ese juego.'})
          : res.status(200).json({data});
  }

  // static async getByPlatform(req, res){
  //   const { platforms } = req.query;

  //   const {data, error} = await GamesModel.getByPlatform(platforms);
  //   error ? res.status(400).json({error: 'No se encuentra esa plataforma.'})
  //         : res.status(200).json({data});
  // }

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
  
}

module.exports = Games;