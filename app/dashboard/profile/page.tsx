"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
	const [user, setUser] = useState<any>(null);
	const [editMode, setEditMode] = useState(false);
	const [form, setForm] = useState({
		name: "",
		branch: "",
		linkedin: "",
		hobbies: "",
	});

	useEffect(() => {
		const userData = localStorage.getItem("user");
		if (userData) {
			const parsed = JSON.parse(userData);
			setUser(parsed);
			setForm({
				name: parsed.name || "",
				branch: parsed.branch || "",
				linkedin: parsed.linkedin || "",
				hobbies: parsed.hobbies || "",
			});
		} else {
			window.location.href = "/";
		}
	}, []);

	const handleSave = async () => {
		const updated = { ...user, ...form };
		setUser(updated);
		localStorage.setItem("user", JSON.stringify(updated));
		setEditMode(false);

		const res = await fetch("/api/auth/update", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: user.email, ...form }),
		});

		const data = await res.json();
		console.log("PATCH result:", data);
	};

	if (!user) return null;

	return (
		<div className="max-w-2xl mx-auto p-6 pt-24 text-rv-text">
			<h1 className="text-2xl font-bold mb-4 text-rv-accent drop-shadow-md">
				My Profile
			</h1>

			<div className="space-y-4 bg-rv-backgroundSecondary border border-rv-border p-6 rounded-xl shadow">
				{/* Name */}
				<div>
					<p className="text-sm text-rv-textMuted">Name</p>
					{editMode ? (
						<input
							value={form.name}
							onChange={(e) => setForm({ ...form, name: e.target.value })}
							className="w-full px-3 py-1 rounded bg-transparent border border-rv-border"
						/>
					) : (
						<p className="text-lg font-medium">{user.name}</p>
					)}
				</div>

				{/* Email */}
				<div>
					<p className="text-sm text-rv-textMuted">Email</p>
					<p className="text-lg font-medium">{user.email}</p>
				</div>

				{/* Branch */}
				<div>
					<p className="text-sm text-rv-textMuted">Branch</p>
					{editMode ? (
						<input
							value={form.branch}
							onChange={(e) => setForm({ ...form, branch: e.target.value })}
							className="w-full px-3 py-1 rounded bg-transparent border border-rv-border"
						/>
					) : (
						<p className="text-lg font-medium">{user.branch}</p>
					)}
				</div>

				{/* Year */}
				<div>
					<p className="text-sm text-rv-textMuted">Year of Study</p>
					<p className="text-lg font-medium">{user.year}</p>
				</div>

				{/* LinkedIn */}
				<div>
					<p className="text-sm text-rv-textMuted">LinkedIn</p>
					{editMode ? (
						<input
							value={form.linkedin}
							onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
							className="w-full px-3 py-1 rounded bg-transparent border border-rv-border"
						/>
					) : (
						<a
							href={user.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-400 underline text-lg font-medium"
						>
							{user.linkedin || "Not provided"}
						</a>
					)}
				</div>

				{/* Skills */}
				<div>
					<p className="text-sm text-rv-textMuted">Skills</p>
					<div className="flex flex-wrap gap-2 mt-1">
						{user.skills?.length > 0 ? (
							user.skills.map((skill: string) => (
								<span
									key={skill}
									className="bg-[#1a1f2b] text-rv-accent px-3 py-1 rounded-full text-sm border border-rv-border"
								>
									{skill}
								</span>
							))
						) : (
							<p className="text-sm text-rv-textMuted">No skills added</p>
						)}
					</div>
				</div>

				{/* Hobbies */}
				<div>
					<p className="text-sm text-rv-textMuted">Hobbies</p>
					{editMode ? (
						<input
							value={form.hobbies}
							onChange={(e) => setForm({ ...form, hobbies: e.target.value })}
							className="w-full px-3 py-1 rounded bg-transparent border border-rv-border"
						/>
					) : (
						<p className="text-lg font-medium">
							{user.hobbies || "Not provided"}
						</p>
					)}
				</div>

				{/* Toggle Button */}
				<div className="pt-4">
					{editMode ? (
						<button
							onClick={handleSave}
							className="bg-rv-accent text-black px-4 py-2 rounded hover:bg-rv-accentHover font-semibold transition"
						>
							Save Changes
						</button>
					) : (
						<button
							onClick={() => setEditMode(true)}
							className="bg-rv-accent text-black px-4 py-2 rounded hover:bg-rv-accentHover font-semibold transition"
						>
							Edit Profile
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
