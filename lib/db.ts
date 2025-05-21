import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

let db: any;

export async function connectToDB() {
	if (!db) {
		await client.connect();
		db = client.db("rvcircle");
	}
	return db;
}
