import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { compare } from "bcrypt";

// MongoDB connection string for local development
const uri = process.env.MONGODB_URI!;
const dbName = "auth_db";
const collectionName = "users";

export async function POST(request: Request) {
	try {
		const { email, password } = await request.json();

		if (!email || !password) {
			return NextResponse.json(
				{ message: "Email and password are required" },
				{ status: 400 }
			);
		}

		// Domain Check
		const allowedDomain = "@rvce.edu.in";
		if (!email.endsWith(allowedDomain)) {
			return NextResponse.json(
				{
					message: "Only RVCE students can login using their college email.",
				},
				{ status: 403 }
			);
		}

		// Connect to MongoDB
		const client = new MongoClient(uri);
		await client.connect();

		const db = client.db(dbName);
		const users = db.collection(collectionName);

		// Find user by email
		const user = await users.findOne({ email });

		if (!user) {
			await client.close();
			return NextResponse.json(
				{ message: "Invalid email or password" },
				{ status: 401 }
			);
		}

		// Compare password
		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			await client.close();
			return NextResponse.json(
				{ message: "Invalid email or password" },
				{ status: 401 }
			);
		}

		// Create session or token (simplified for example)
		const session = {
			id: user._id.toString(),
			email: user.email,
			name: user.name || "",
			year: user.year || "",
			skills: user.skills || [],
			hobbies: user.hobbies || "",
			branch: user.branch || "",
			linkedin: user.linkedin || "",
		};

		await client.close();

		return NextResponse.json({
			message: "Login successful",
			user: session,
		});
	} catch (error) {
		console.error("Login error:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
