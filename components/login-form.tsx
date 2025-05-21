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

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();
			if (!response.ok) throw new Error(data.message || "Login failed");
			localStorage.setItem("user", JSON.stringify(data.user));
			router.push("/dashboard");
		} catch (err: any) {
			setError(err.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="w-full bg-rv-background border border-rv-border shadow-lg rounded-xl text-rv-text">
			<CardHeader className="space-y-1 text-center">
				<h2 className="text-2xl font-bold text-rv-accent drop-shadow-md">
					Login
				</h2>
				<p className="text-sm text-rv-textMuted">
					Enter your credentials to access your account
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
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="name@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="bg-[#1a1f2b] border border-rv-border text-rv-text placeholder:text-rv-textMuted focus:ring-2 focus:ring-rv-accent"
						/>
					</div>

					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label htmlFor="password">Password</Label>
							<Link
								href="/forgot-password"
								className="text-sm text-rv-accent hover:underline"
							>
								Forgot password?
							</Link>
						</div>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="bg-[#1a1f2b] border border-rv-border text-rv-text placeholder:text-rv-textMuted focus:ring-2 focus:ring-rv-accent"
						/>
					</div>

					<Button
						type="submit"
						disabled={loading}
						className="w-full bg-rv-accent text-black font-bold hover:bg-rv-accentHover transition-transform hover:scale-105"
					>
						{loading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Signing in...
							</>
						) : (
							"Sign In"
						)}
					</Button>
				</form>
			</CardContent>

			<CardFooter className="flex flex-col">
				<p className="mt-2 text-sm text-center text-rv-textMuted">
					Don't have an account?{" "}
					<Link
						href="/register"
						className="text-rv-accent hover:underline font-medium"
					>
						Sign up
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
}
