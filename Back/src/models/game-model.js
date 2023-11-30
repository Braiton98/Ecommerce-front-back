

const { connectToMongoDB, disconnectToMongoDB } = require('../config/database');

class GamesModel {
  static async getAll() {
    try {
      const clientMongo = await connectToMongoDB();
      if (!clientMongo) {
        throw new Error('Error al conectar con MongoDB.');
      }
      const result = await clientMongo.db('Videogames').collection('games').find().toArray();
      await disconnectToMongoDB();
      console.log(result);
      return { data: result, error: false };
    } catch (error) {
      return { data: null, error: true };
    }
  }
}

module.exports = GamesModel;