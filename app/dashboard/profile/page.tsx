"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
	const [user, setUser] = useState<{
		name: string;
		email: string;
		year: string;
		skills: string[];
		hobbies: string;
	} | null>(null);

	useEffect(() => {
		const userData = localStorage.getItem("user");
		if (userData) {
			setUser(JSON.parse(userData));
		} else {
			window.location.href = "/";
		}
	}, []);

	if (!user) return null;

	return (
		<div className="max-w-2xl mx-auto p-6 pt-24 text-rv-text">
			<h1 className="text-2xl font-bold mb-4 text-rv-accent drop-shadow-md">
				My Profile
			</h1>

			<div className="space-y-4 bg-rv-backgroundSecondary border border-rv-border p-6 rounded-xl shadow">
				<div>
					<p className="text-sm text-rv-textMuted">Name</p>
					<p className="text-lg font-medium">{user.name}</p>
				</div>

				<div>
					<p className="text-sm text-rv-textMuted">Email</p>
					<p className="text-lg font-medium">{user.email}</p>
				</div>

				<div>
					<p className="text-sm text-rv-textMuted">Year of Study</p>
					<p className="text-lg font-medium">{user.year}</p>
				</div>

				<div>
					<p className="text-sm text-rv-textMuted">Skills</p>
					<div className="flex flex-wrap gap-2 mt-1">
						{user.skills?.length > 0 ? (
							user.skills.map((skill) => (
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

				<div>
					<p className="text-sm text-rv-textMuted">Hobbies</p>
					<p className="text-lg font-medium">
						{user.hobbies || "Not provided"}
					</p>
				</div>
			</div>
		</div>
	);
}
