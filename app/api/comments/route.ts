import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = "rvcircle";
const collectionName = "doubts";

async function connect() {
	const client = new MongoClient(uri);
	await client.connect();
	const db = client.db(dbName);
	const doubts = db.collection(collectionName);
	return { client, doubts };
}

export async function DELETE(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const doubtId = searchParams.get("doubtId");
		const commentId = searchParams.get("commentId");

		if (!doubtId || !commentId)
			return NextResponse.json({ message: "Missing params" }, { status: 400 });

		const { client, doubts } = await connect();

		await doubts.updateOne(
			{ _id: new ObjectId(doubtId) },
			{ $pull: { comments: { _id: new ObjectId(commentId) } } }
		);

		await client.close();

		return NextResponse.json({ message: "Comment deleted" });
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ message: "Error deleting comment" },
			{ status: 500 }
		);
	}
}
