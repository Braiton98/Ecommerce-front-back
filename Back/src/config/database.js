require('dotenv').config();

const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URL);

async function connectToMongoDB(){
  try {
    await client.connect();
    console.log("Conectado a MongoDB.");
    return client;
  } catch (error) {
    console.log("Error al conectarse a MongoDB.", error);
    return null;
  }
};

async function disconnectToMongoDB(){
  try {
    await client.close();
    console.log("Desconectado de MongoDB.");
  } catch (error) {
    console.log("Error al desconectarse de MongoDB.", error);
  }
};

module.exports = {connectToMongoDB, disconnectToMongoDB};