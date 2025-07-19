import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI!;
const client = new MongoClient(uri);

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  global._mongoClientPromise = client.connect();
}

const clientPromise = global._mongoClientPromise;

export async function connectToDB() {
  const client = await clientPromise;
  return client.db("student_json_form_data");
}
