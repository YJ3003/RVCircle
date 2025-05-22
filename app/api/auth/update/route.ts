import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = "auth_db";
const collectionName = "users";

export async function PATCH(req: Request) {
	try {
		const body = await req.json(); // read body
		const { email, name, branch, hobbies, linkedin } = body; // destructure flatly

		const client = new MongoClient(uri);
		await client.connect();
		const db = client.db(dbName);
		const users = db.collection(collectionName);

		await users.updateOne(
			{ email },
			{
				$set: {
					name,
					branch,
					hobbies,
					linkedin,
				},
			}
		);

		await client.close();
		return NextResponse.json({ message: "Profile updated" });
	} catch (err) {
		console.error("Update error:", err);
		return NextResponse.json({ message: "Failed to update" }, { status: 500 });
	}
}
