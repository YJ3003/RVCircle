"use client";

import { useState } from "react";

export default function SummarizePopup({
	postText,
	comments = [],
}: {
	postText: string;
	comments: { content: string }[];
}) {
	const [showPopup, setShowPopup] = useState(false);
	const [loading, setLoading] = useState(false);
	const [summary, setSummary] = useState("");
	const [topComments, setTopComments] = useState<
		{ text: string; score: number }[]
	>([]);

	const handleSummarize = async () => {
		setShowPopup(true);
		setLoading(true);
		setSummary("");
		setTopComments([]);

		try {
			const res = await fetch("http://127.0.0.1:5000/summarize", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					post_text: postText,
					comments_text: comments.map((c) => c.content).join("\n"),
				}),
			});

			const data = await res.json();
			setSummary(data.summary || "No summary returned.");
			setTopComments(data.top_comments || []);
		} catch (err) {
			setSummary("Error getting summary.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mt-4">
			<button
				onClick={handleSummarize}
				className="text-sm bg-rv-accent text-black px-3 py-1 rounded hover:bg-rv-accentHover transition"
			>
				🧠 Summarize Comments
			</button>

			{showPopup && (
				<div className="relative mt-4 bg-black/70 border border-rv-border text-rv-text p-4 rounded-xl shadow-xl backdrop-blur-md">
					<button
						className="absolute top-2 right-3 text-rv-textMuted text-sm hover:text-red-400"
						onClick={() => setShowPopup(false)}
					>
						❌
					</button>

					<h3 className="font-semibold mb-2 text-rv-accent">📝 Summary</h3>

					{loading ? (
						<p className="text-rv-textMuted italic">Summarizing...</p>
					) : (
						<>
							<p className="text-sm whitespace-pre-line">{summary}</p>

							{topComments.length > 0 && (
								<div className="mt-4">
									<h4 className="font-semibold text-sm text-rv-textMuted mb-2">
										Top Comments
									</h4>
									<ul className="space-y-2 text-sm">
										{topComments.map((c, i) => (
											<li
												key={i}
												className="bg-[#1a1f2b] p-3 rounded border border-rv-border"
											>
												<p>{c.text}</p>
												<p className="text-xs text-rv-textMuted mt-1">
													Score: {c.score.toFixed(2)}
												</p>
											</li>
										))}
									</ul>
								</div>
							)}
						</>
					)}
				</div>
			)}
		</div>
	);
}
