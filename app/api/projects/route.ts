import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = "rvcircle";
const collectionName = "project_discussions"; // NEW collection

// Shared connection function
async function connect() {
	const client = new MongoClient(uri);
	await client.connect();
	const db = client.db(dbName);
	const discussions = db.collection(collectionName);
	return { client, discussions };
}

// POST: Add new project discussion
export async function POST(req: Request) {
	try {
		const data = await req.json();

		if (!data.content || !data.userId) {
			return NextResponse.json(
				{ message: "Missing required fields" },
				{ status: 400 }
			);
		}

		const { client, discussions } = await connect();

		const result = await discussions.insertOne({
			...data,
			postedAt: new Date(),
		});

		await client.close();

		return NextResponse.json({
			message: "Project discussion posted",
			id: result.insertedId,
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}

// GET: Fetch all project discussions
export async function GET() {
	try {
		const { client, discussions } = await connect();
		const all = await discussions.find().toArray();
		await client.close();
		return NextResponse.json(all.reverse());
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "Server error" }, { status: 500 });
	}
}

// DELETE: Remove project discussion by ID
export async function DELETE(req: Request) {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");

	if (!id) {
		return NextResponse.json({ message: "Missing ID" }, { status: 400 });
	}

	const { client, discussions } = await connect();
	await discussions.deleteOne({ _id: new ObjectId(id) });
	await client.close();

	return NextResponse.json({ message: "Project discussion deleted" });
}

// PATCH: Add comment to a project discussion
export async function PATCH(req: Request) {
	const { id, name, content, userId } = await req.json();

	if (!id || !content || !userId) {
		return NextResponse.json({ message: "Missing fields" }, { status: 400 });
	}

	const { client, discussions } = await connect();

	await discussions.updateOne(
		{ _id: new ObjectId(id) },
		{
			$push: {
				comments: {
					_id: new ObjectId(),
					name: name || "Anonymous",
					userId,
					content,
					postedAt: new Date(),
				},
			},
		}
	);

	await client.close();

	return NextResponse.json({ message: "Comment added" });
}
