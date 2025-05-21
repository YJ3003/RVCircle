"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
	const router = useRouter();

	useEffect(() => {
		const user = localStorage.getItem("user");
		if (!user) {
			router.push("/");
		}
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-rv-background to-rv-backgroundSecondary flex items-center justify-center text-rv-text px-4">
			<div className="w-full max-w-xl text-center p-8 bg-rv-background border border-rv-border shadow-xl rounded-2xl">
				<h1 className="text-3xl font-bold text-rv-accent drop-shadow-md mb-4">
					Welcome to RVCircle 👋
				</h1>
				<p className="mb-6 text-rv-textMuted text-sm">
					Choose what you want to explore:
				</p>

				<div className="flex flex-col gap-4">
					<button
						onClick={() => router.push("/dashboard/doubts")}
						className="px-6 py-3 bg-rv-accent text-black font-semibold rounded-lg hover:bg-rv-accentHover transition-transform shadow-lg"
					>
						📚 Academic Doubts
					</button>

					<button
						onClick={() => router.push("/dashboard/projects")}
						className="px-6 py-3 bg-[#1c2432] text-rv-accent border border-rv-accent rounded-lg hover:bg-[#263041] transition-transform shadow-md"
					>
						💡 Project Discussions
					</button>
				</div>
			</div>
		</div>
	);
}
