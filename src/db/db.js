import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db;
const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  console.log('mongodb connected');
  db.mongoClient.db();
} catch (err) {
  console.log(err);
  return err;
}

export default db;