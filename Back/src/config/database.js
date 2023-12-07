import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL

const client = new MongoClient(MONGO_URL);



export const  connectToMongoDB = async() => {
  try {
    await client.connect();
    console.log("Conectado a MongoDB.");
    return client;
  } catch (error) {
    console.log("Error al conectarse a MongoDB.", error);
    return null;
  }
};

export const disconnectToMongoDB= async() =>{
  try {
    await client.close();
    console.log("Desconectado de MongoDB.");
  } catch (error) {
    console.log("Error al desconectarse de MongoDB.", error);
  }
};

