// lib/mongodb.ts

import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_URI!;
const options = {};

let client: MongoClient;
let db: Db;

declare global {
  var _mongoClient: MongoClient | undefined;
}

// For hot-reload in dev
if (!global._mongoClient) {
  global._mongoClient = new MongoClient(uri, options);
}
client = global._mongoClient;

export const connectToDB = async () => {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  if (!db) {
    db = client.db("student_json_form_data");
  }
  return db;
};
