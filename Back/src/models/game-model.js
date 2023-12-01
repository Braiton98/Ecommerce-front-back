

const { connectToMongoDB, disconnectToMongoDB } = require('../config/database');

class GamesModel {
  static async getAll() {
    try {
      const clientMongo = await connectToMongoDB();
      if (!clientMongo) {
        throw new Error('Error al conectar con MongoDB.');
      }
      const result = await clientMongo.db('Videogames').collection('games').find().sort({name: 1}).toArray();
      await disconnectToMongoDB();
      console.log(result);
      return { data: result, error: false };
    } catch (error) {
      return { data: null, error: true };
    }
  }

  static async getByName(name){
    try {
      const clientMongo = await connectToMongoDB();
      if (!clientMongo) {
        throw new Error('Error al conectar con MongoDB.');
      }
      const result = await clientMongo.db('Videogames').collection('games').find({name: name}).toArray();
      await disconnectToMongoDB();
      console.log(result);
      return { data: result, error: false };
    } catch (error) {
      return { data: null, error: true };
    }
  }

  // static async getByPlatform(platform){
  //   try {
  //     const clientMongo = await connectToMongoDB();
  //     if (!clientMongo) {
  //       throw new Error('Error al conectar con MongoDB.');
  //     }
  //     const result = await clientMongo.db('Videogames').collection('games').find({platforms: platform}).toArray();
  //     await disconnectToMongoDB();
  //     console.log(result);
  //     return { data: result, error: false };
  //   } catch (error) {
  //     return { data: null, error: true };
  //   }
  // }
static async getByPlatform(platform) {
  try {
    const clientMongo = await connectToMongoDB();

    if (!clientMongo) {
      throw new Error('Error al conectar con MongoDB.');
    }

    const result = await clientMongo.db('Videogames').collection('games').find({ platforms: platform }).toArray();
    console.log(result)
    return { data: result, error: null }; // null indica que no hay error

  } catch (error) {
    return { data: null, error: error.message || 'Error desconocido' };
  } finally {
    await disconnectToMongoDB();
  }
}
}

module.exports = GamesModel;