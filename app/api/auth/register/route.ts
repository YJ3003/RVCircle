import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { hash } from "bcrypt";

const uri = process.env.MONGODB_URI!;
const dbName = "auth_db";
const collectionName = "users";

export async function POST(request: Request) {
	try {
		const { name, email, password, year, skills, hobbies } =
			await request.json();

		if (!email || !password) {
			return NextResponse.json(
				{ message: "Email and password are required" },
				{ status: 400 }
			);
		}

		// 🔒 Enforce RVCE email domain
		if (!email.endsWith("@rvce.edu.in")) {
			return NextResponse.json(
				{
					message: "Only RVCE students can register using their college email.",
				},
				{ status: 401 }
			);
		}

		const client = new MongoClient(uri);
		await client.connect();

		const db = client.db(dbName);
		const users = db.collection(collectionName);

		const existingUser = await users.findOne({ email });

		if (existingUser) {
			await client.close();
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 409 }
			);
		}

		const hashedPassword = await hash(password, 10);

		const result = await users.insertOne({
			name,
			email,
			password: hashedPassword,
			year,
			skills,
			hobbies,
			createdAt: new Date(),
		});

		await client.close();

		return NextResponse.json({
			message: "User created successfully",
			userId: result.insertedId.toString(),
		});
	} catch (error) {
		console.error("Registration error:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
