const { MongoClient } = require("mongodb");

// const uri = "mongodb://localhost:27017";
const uri = process.env.DB_URL;
// "mongodb+srv://stevenwr92:seravee12@cluster0.mgnuw6x.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const dbName = "microservices-user";
let dbConnection;

async function connectDb() {
  try {
    const database = client.db(dbName);
    dbConnection = database;
  } catch (err) {
    await client.close();
    console.log(err);
  }
}

function getDb() {
  return dbConnection;
}

module.exports = { connectDb, getDb };
