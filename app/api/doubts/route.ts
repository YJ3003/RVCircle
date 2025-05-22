import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = "rvcircle";
const collectionName = "doubts";

// Shared connection function
async function connect() {
	const client = new MongoClient(uri);
	await client.connect();
	const db = client.db(dbName);
	const doubts = db.collection(collectionName);
	return { client, doubts };
}

// POST: Add new doubt
export async function POST(req: Request) {
	try {
		const data = await req.json();

		if (!data.content || !data.userId) {
			return NextResponse.json(
				{ message: "Missing required fields" },
				{ status: 400 }
			);
		}

		const { client, doubts } = await connect();

		const result = await doubts.insertOne({
			...data,
			postedAt: new Date(),
		});

		await client.close();

		return NextResponse.json({
			message: "Doubt posted",
			id: result.insertedId,
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}

// GET: Fetch all doubts
export async function GET() {
	try {
		const { client, doubts } = await connect();
		const allDoubts = await doubts.find().toArray();
		await client.close();
		return NextResponse.json(allDoubts.reverse());
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}

// DELETE: Remove doubt by ID
export async function DELETE(req: Request) {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");

	if (!id) {
		return NextResponse.json({ message: "Missing ID" }, { status: 400 });
	}

	const { client, doubts } = await connect();
	await doubts.deleteOne({ _id: new ObjectId(id) });
	await client.close();

	return NextResponse.json({ message: "Doubt deleted" });
}

// PATCH: Add comment to doubt
export async function PATCH(req: Request) {
	const { id, name, content, userId, branch } = await req.json();

	if (!id || !content || !userId) {
		return NextResponse.json({ message: "Missing fields" }, { status: 400 });
	}

	const { client, doubts } = await connect();

	await doubts.updateOne(
		{ _id: new ObjectId(id) },
		{
			$push: {
				comments: {
					_id: new ObjectId(),
					name: name || "Anonymous",
					userId,
					branch, // ✅ added
					content,
					postedAt: new Date(),
				},
			},
		}
	);

	await client.close();

	return NextResponse.json({ message: "Comment added" });
}
