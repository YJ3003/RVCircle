"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Topbar from "@/components/ui/topbar";
import SummarizePopup from "@/components/ui/SummarizePopup";

export default function DoubtsPage() {
	const [doubt, setDoubt] = useState("");
	const [year, setYear] = useState("");
	const [tags, setTags] = useState<string[]>([]);
	const [isAnonymous, setIsAnonymous] = useState(false);
	const [feed, setFeed] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState("");
	const [customTag, setCustomTag] = useState("");

	const tagOptions = ["DSA", "Math", "Web Dev", "EEE", "AI"];

	const fetchDoubts = async () => {
		const res = await fetch("/api/doubts", { method: "GET" });
		const data = await res.json();
		setFeed(data.reverse());
		setLoading(false);
	};

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		if (user.year) setYear(user.year);
		fetchDoubts();
	}, []);

	const toggleTag = (tag: string) => {
		setTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
		);
	};

	const handleSubmit = async () => {
		if (!doubt.trim()) {
			setMessage("Please enter a doubt before posting.");
			return;
		}

		const user = JSON.parse(localStorage.getItem("user") || "{}");

		const res = await fetch("/api/doubts", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				content: doubt,
				year,
				tags,
				isAnonymous,
				name: isAnonymous ? null : user.name,
				userId: user.email,
			}),
		});

		if (res.ok) {
			setMessage("Posted ✅");
			setDoubt("");
			setTags([]);
			setIsAnonymous(false);
			fetchDoubts();
		} else {
			const data = await res.json();
			setMessage(data.message || "Something went wrong");
		}
	};

	const handleDelete = async (id: string) => {
		const res = await fetch(`/api/doubts?id=${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			setFeed((prev) => prev.filter((item) => item._id !== id));
		}
	};

	return (
		<>
			<Head>
				<title>Ask Doubts | RVCircle</title>
			</Head>
			<Topbar />
			<div className="min-h-screen bg-rv-background pt-[5.5rem] px-4 pb-10 text-rv-text">
				<h1 className="text-3xl font-bold text-center mb-6 text-white">
					Ask a Doubt
				</h1>

				{/* Input Section */}
				<div className="max-w-2xl mx-auto bg-rv-backgroundSecondary border border-rv-border shadow-md rounded-xl p-5 mb-6">
					<textarea
						className="w-full bg-transparent border border-rv-border rounded p-3 text-rv-text placeholder:text-rv-textMuted"
						rows={4}
						placeholder="What's your doubt?"
						value={doubt}
						onChange={(e) => setDoubt(e.target.value)}
					/>

					<div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
						<p className="text-sm text-rv-textMuted">
							Posting as a <span className="font-medium">{year}</span> student
						</p>

						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								checked={isAnonymous}
								onChange={() => setIsAnonymous(!isAnonymous)}
							/>
							<label className="text-sm">Post anonymously</label>
						</div>
					</div>

					<div className="flex flex-wrap items-center gap-2 mt-4">
						{/* Predefined tag buttons */}
						{tagOptions.map((tag) => (
							<button
								key={tag}
								onClick={() => toggleTag(tag)}
								className={`px-3 py-1 text-sm rounded-full border transition ${
									tags.includes(tag)
										? "bg-rv-accent text-black"
										: "bg-[#1a1f2b] text-rv-text border-rv-border"
								}`}
							>
								{tag}
							</button>
						))}

						{/* Custom added tags (not from predefined list) */}
						{tags
							.filter((tag) => !tagOptions.includes(tag))
							.map((tag) => (
								<button
									key={tag}
									onClick={() => toggleTag(tag)}
									className="px-3 py-1 text-sm rounded-full border bg-rv-accent text-black transition"
								>
									{tag}
								</button>
							))}

						{/* Input + Add button for custom tags */}
						<div className="flex items-center gap-2">
							<input
								type="text"
								value={customTag}
								onChange={(e) => setCustomTag(e.target.value)}
								placeholder="Add tag"
								className="px-3 py-1 text-sm w-[110px] rounded-full bg-[#1a1f2b] text-rv-text border border-rv-border placeholder:text-rv-textMuted focus:outline-none"
							/>
							<button
								type="button"
								onClick={() => {
									const tag = customTag.trim();
									if (tag && !tags.includes(tag)) {
										setTags([...tags, tag]);
									}
									setCustomTag("");
								}}
								className="text-sm px-3 py-1 rounded-full bg-rv-accent text-black font-medium hover:bg-rv-accentHover transition"
							>
								Add
							</button>
						</div>
					</div>

					<button
						onClick={handleSubmit}
						className="mt-4 bg-rv-accent text-black px-4 py-2 rounded hover:bg-rv-accentHover font-semibold transition"
					>
						Post Doubt
					</button>

					{message && <p className="mt-2 text-sm text-red-400">{message}</p>}
				</div>

				{/* Doubt Feed Section */}
				<div className="max-w-2xl mx-auto space-y-4">
					{loading ? (
						<p className="text-center text-rv-textMuted">Loading...</p>
					) : feed.length === 0 ? (
						<p className="text-rv-textMuted text-center">Nothing yet 🤷‍♂️</p>
					) : (
						feed.map((item, idx) => (
							<div
								key={idx}
								className="bg-rv-backgroundSecondary p-4 rounded-xl shadow border border-rv-border"
							>
								<p className="text-rv-text whitespace-pre-wrap">
									{item.content}
								</p>
								<SummarizePopup
									postText={item.content}
									comments={item.comments || []}
								/>

								<div className="text-sm text-rv-textMuted mt-2 flex justify-between items-center">
									<span>{item.name || "Anonymous"}</span>
									<div className="flex items-center gap-3">
										<span>{item.year}</span>
										{item.userId ===
											JSON.parse(localStorage.getItem("user") || "{}")
												.email && (
											<button
												onClick={() => handleDelete(item._id)}
												className="text-red-400 text-xs hover:underline"
											>
												Delete
											</button>
										)}
									</div>
								</div>

								{/* Tags */}
								{item.tags && item.tags.length > 0 && (
									<div className="mt-2 flex flex-wrap gap-2">
										{item.tags.map((tag: string, i: number) => (
											<span
												key={i}
												className="bg-[#293042] text-rv-text px-2 py-1 text-xs rounded-full"
											>
												#{tag}
											</span>
										))}
									</div>
								)}

								{/* Comment List */}
								<div className="mt-4 space-y-2 border-t border-rv-border pt-3">
									{item.comments?.map((comment: any, i: number) => (
										<div
											key={i}
											className="text-sm text-rv-text bg-[#1a1f2b] p-2 rounded"
										>
											<p>{comment.content}</p>
											<div className="text-xs text-rv-textMuted mt-1 flex justify-between items-center">
												<span>— {comment.name || "Anonymous"}</span>

												{comment.userId ===
													JSON.parse(localStorage.getItem("user") || "{}")
														.email && (
													<button
														onClick={async () => {
															const res = await fetch(
																`/api/comments?doubtId=${item._id}&commentId=${comment._id}`,
																{
																	method: "DELETE",
																}
															);
															if (res.ok) {
																const updatedFeed = [...feed];
																updatedFeed[idx].comments = updatedFeed[
																	idx
																].comments.filter(
																	(c: any) => c._id !== comment._id
																);
																setFeed(updatedFeed);
															}
														}}
														className="text-red-400 text-xs hover:underline"
													>
														Delete
													</button>
												)}
											</div>
										</div>
									))}
								</div>

								{/* Add Comment */}
								<div className="mt-3 flex gap-2">
									<input
										type="text"
										placeholder="Add a comment..."
										className="border border-rv-border rounded px-2 py-1 flex-grow bg-transparent text-rv-text placeholder:text-rv-textMuted"
										value={item.newComment || ""}
										onChange={(e) => {
											const updatedFeed = [...feed];
											updatedFeed[idx].newComment = e.target.value;
											setFeed(updatedFeed);
										}}
										onKeyDown={async (e) => {
											if (e.key === "Enter" && !e.shiftKey) {
												e.preventDefault();
												const user = JSON.parse(
													localStorage.getItem("user") || "{}"
												);
												if (!item.newComment || !item.newComment.trim()) return;

												const res = await fetch("/api/doubts", {
													method: "PATCH",
													headers: { "Content-Type": "application/json" },
													body: JSON.stringify({
														id: item._id,
														content: item.newComment.trim(),
														name: user.name,
														userId: user.email,
													}),
												});
												if (res.ok) {
													const newComment = {
														content: item.newComment.trim(),
														name: user.name,
													};
													const updatedFeed = [...feed];
													updatedFeed[idx].comments = [
														...(item.comments || []),
														newComment,
													];
													updatedFeed[idx].newComment = "";
													setFeed(updatedFeed);
												}
											}
										}}
									/>

									<button
										onClick={async () => {
											const user = JSON.parse(
												localStorage.getItem("user") || "{}"
											);
											if (!item.newComment || !item.newComment.trim()) return;

											const res = await fetch("/api/doubts", {
												method: "PATCH",
												headers: { "Content-Type": "application/json" },
												body: JSON.stringify({
													id: item._id,
													content: item.newComment.trim(),
													name: user.name,
													userId: user.email,
												}),
											});
											if (res.ok) {
												const newComment = {
													content: item.newComment,
													name: user.name,
												};
												const updatedFeed = [...feed];
												updatedFeed[idx].comments = [
													...(item.comments || []),
													newComment,
												];
												updatedFeed[idx].newComment = "";
												setFeed(updatedFeed);
											}
										}}
										className="bg-rv-accent hover:bg-rv-accentHover text-black px-3 py-1 rounded text-sm transition"
									>
										Post
									</button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</>
	);
}
