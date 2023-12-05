import { connectToMongoDB, disconnectToMongoDB } from "../config/database.js";
import { ObjectId } from "mongodb";

export default class GamesModel {
  static async getAll() {
    try {
      const clientMongo = await connectToMongoDB();
      if (!clientMongo) {
        throw new Error('Error al conectar con MongoDB.');
      }
      const result = await clientMongo.db('Videogames').collection('games').find().sort({ name: 1 }).toArray();
      await disconnectToMongoDB();
      console.log(result);
      return { data: result, error: false };
    } catch (error) {
      return { data: null, error: true };
    }
  }

  static async getByName(name) {
    try {
      const clientMongo = await connectToMongoDB();
      if (!clientMongo) {
        throw new Error('Error al conectar con MongoDB.');
      }
      const result = await clientMongo.db('Videogames').collection('games').find({ name: name }).toArray();
      await disconnectToMongoDB();
      console.log(result);
      return { data: result, error: false };
    } catch (error) {
      return { data: null, error: true };
    }
  }

  static async getByPlatform(platform) { // Crear en front con options PC, Console, Mobile, etc
    try {
      const clientMongo = await connectToMongoDB();

      if (!clientMongo) {
        throw new Error('Error al conectar con MongoDB.');
      }

      const result = await clientMongo.db('Videogames').collection('games').find({ platforms: platform }).toArray();
      console.log(result);
      return { data: result, error: null };

    } catch (error) {
      return { data: null, error: error.message || 'Error desconocido' };
    } finally {
      await disconnectToMongoDB();
    }
  }

  static async getByFirstLetter(name) {
    try {
      const clientMongo = await connectToMongoDB();

      if (!clientMongo) {
        throw new Error('Error al conectar con MongoDB.');
      }

      const result = await clientMongo.db('Videogames').collection('games').find({ name: new RegExp(`^${name}`, 'i') }).toArray();
      console.log(result);
      return { data: result, error: null };

    } catch (error) {
      return { data: null, error: error.message || 'Error desconocido' };
    } finally {
      await disconnectToMongoDB();
    }
  }



  static async getByID({ id }) {
    try {

      console.log("Probando id", id)
      const clientMongo = await connectToMongoDB()
      if (!clientMongo) {
        throw Error("Error al conectar con Mongo")
      }

      const result = await clientMongo.db("Videogames").collection("games").findOne({ id: Number(id) })
      console.log(result)
      await disconnectToMongoDB()
      if (!result) return { data: null, error: true };
      return { data: result, error: false };

    } catch (error) {
      return { data: null, error }
    }
  }

  static async createOne(body) {
    try {
      const clientMongo = await connectToMongoDB()
      if (!clientMongo) {
        throw Error("Error loading Mongo")
      }
      const insert = await clientMongo.db("Videogames").collection("games").insertOne(body)
      console.log(insert)
      if (insert.acknowledged) return { data: { ...body, _id: insert.insertedId }, error: false }
    } catch (error) {
      return { data: null, error: true }
    }

  }

  static async update(id, body) {

    try {
      const clientMongo = await connectToMongoDB()
      if (!clientMongo) {
        throw Error("Error loading Mongo")
      }
      const update = await clientMongo.db("Videogames").collection("games").updateOne({ id: id }, { $set: body })
      console.log(update)
      if (update.acknowledged) {
        return { data: update, error: null }; // Modifica según tus necesidades
      } else {
        return { data: null, error: "Update not acknowledged" }; // Modifica según tus necesidades
      }
    } catch (error) {
      console.error("Error updating data:", error);
      return { data: null, error: error.message }; // Modifica según tus necesidades
    }
  }

  static async delete(id) {
    try {
      const gameId = Number(id);
      if (isNaN(gameId)) {
        throw new Error('Invalid game ID.');
      }

      const clientMongo = await connectToMongoDB();

      if (!clientMongo) {
        throw new Error("Error loading Mongo");
      }

      const result = await clientMongo.db("Videogames").collection("games").findOne({ id: Number(id) })
      const { name } = result
      const result2 = await clientMongo.db("Videogames").collection("games").deleteOne({ name });
      if (result2.deletedCount === 1) {
        console.log("Successfully deleted one document.");
      } else {
        console.log("No documents matched the query. Deleted 0 documents.");
      }
    } catch (error) {
      console.error(error);
    }
  }
}






