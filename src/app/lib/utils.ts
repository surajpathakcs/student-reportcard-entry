import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI!);
export const connectToDB = async () => client.db("student_json_form_data");
