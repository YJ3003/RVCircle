"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function RegisterForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [year, setYear] = useState("");
	const [hobbies, setHobbies] = useState("");
	const skillOptions = [
		"Python",
		"C++",
		"Web Dev",
		"Machine Learning",
		"Java",
		"React",
	];
	const [skills, setSkills] = useState<string[]>([]);
	const [customSkill, setCustomSkill] = useState("");

	const handleSkillToggle = (skill: string) => {
		setSkills((prev) =>
			prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
		);
	};

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		setLoading(true);

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password, year, skills, hobbies }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Registration failed");
			}

			router.push("/");
		} catch (err: any) {
			setError(err.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="w-full bg-rv-background border border-rv-border shadow-xl text-rv-text rounded-xl">
			<CardHeader className="space-y-1 text-center">
				<h2 className="text-2xl font-bold text-rv-accent drop-shadow-md">
					Register
				</h2>
				<p className="text-sm text-rv-textMuted">
					Create an account to get started
				</p>
			</CardHeader>

			<CardContent>
				{error && (
					<Alert
						variant="destructive"
						className="mb-4 bg-red-900/50 border border-red-500 text-red-300"
					>
						<AlertCircle className="h-4 w-4" />
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				<form onSubmit={handleSubmit} className="space-y-5">
					<div className="space-y-2">
						<Label htmlFor="year">Year of Study</Label>
						<select
							id="year"
							value={year}
							onChange={(e) => setYear(e.target.value)}
							required
							className="w-full px-3 py-2 rounded-lg bg-[#1a1f2b] text-rv-text border border-rv-border focus:outline-none focus:ring-2 focus:ring-rv-accent"
						>
							<option value="" disabled>
								Select year
							</option>
							<option value="1st Year">1st Year</option>
							<option value="2nd Year">2nd Year</option>
							<option value="3rd Year">3rd Year</option>
							<option value="4th Year">4th Year</option>
						</select>
					</div>

					<div className="space-y-2">
						<Label>Select Your Skills</Label>

						{/* Predefined skill buttons */}
						<div className="flex flex-wrap items-center gap-2">
							{/* Predefined skill buttons */}
							{skillOptions.map((skill) => (
								<button
									type="button"
									key={skill}
									onClick={() => handleSkillToggle(skill)}
									className={`px-3 py-1 text-sm rounded-full border transition ${
										skills.includes(skill)
											? "bg-rv-accent text-black shadow-md"
											: "bg-[#1a1f2b] text-rv-accent border-rv-border"
									}`}
								>
									{skill}
								</button>
							))}

							{/* Custom-added skills (not from predefined) */}
							{skills
								.filter((skill) => !skillOptions.includes(skill))
								.map((skill) => (
									<button
										type="button"
										key={skill}
										onClick={() => handleSkillToggle(skill)}
										className="px-3 py-1 text-sm rounded-full border bg-rv-accent text-black shadow-md transition"
									>
										{skill}
									</button>
								))}

							{/* Custom tag input + add */}
							<div className="flex items-center gap-2">
								<input
									type="text"
									placeholder="Add skill"
									value={customSkill}
									onChange={(e) => setCustomSkill(e.target.value)}
									className="px-3 py-1 text-sm w-[110px] rounded-full bg-[#1a1f2b] text-rv-text border border-rv-border placeholder:text-rv-textMuted focus:outline-none"
								/>
								<button
									type="button"
									onClick={() => {
										const skill = customSkill.trim();
										if (skill && !skills.includes(skill)) {
											setSkills([...skills, skill]);
										}
										setCustomSkill("");
									}}
									className="text-sm px-3 py-1 rounded-full bg-rv-accent text-black font-medium hover:bg-rv-accentHover transition"
								>
									Add
								</button>
							</div>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="hobbies">Hobbies</Label>
						<Input
							id="hobbies"
							type="text"
							placeholder="e.g. Reading, Sketching, Football"
							value={hobbies}
							onChange={(e) => setHobbies(e.target.value)}
							className="bg-[#1a1f2b] text-rv-text placeholder:text-rv-textMuted border border-rv-border focus:ring-2 focus:ring-rv-accent"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							type="text"
							placeholder="John Doe"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="bg-[#1a1f2b] text-rv-text placeholder:text-rv-textMuted border border-rv-border focus:ring-2 focus:ring-rv-accent"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="name@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="bg-[#1a1f2b] text-rv-text placeholder:text-rv-textMuted border border-rv-border focus:ring-2 focus:ring-rv-accent"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="bg-[#1a1f2b] text-rv-text placeholder:text-rv-textMuted border border-rv-border focus:ring-2 focus:ring-rv-accent"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<Input
							id="confirmPassword"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							className="bg-[#1a1f2b] text-rv-text placeholder:text-rv-textMuted border border-rv-border focus:ring-2 focus:ring-rv-accent"
						/>
					</div>

					<Button
						type="submit"
						className="w-full bg-rv-accent text-black font-bold hover:bg-rv-accentHover transition-transform hover:scale-105"
						disabled={loading}
					>
						{loading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Creating account...
							</>
						) : (
							"Create account"
						)}
					</Button>
				</form>
			</CardContent>

			<CardFooter className="flex flex-col">
				<p className="mt-2 text-sm text-center text-rv-textMuted">
					Already have an account?{" "}
					<Link href="/" className="text-rv-accent hover:underline font-medium">
						Sign in
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
}
