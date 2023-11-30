const GamesModel = require('../models/game-model');

class Games{
  static async getAll(req, res){
    const {data, error} = await GamesModel.getAll();
    error ? res.status(400).json({error: 'No hay juegos.'})
          : res.status(200).json({data});
  }
}

module.exports = Games;