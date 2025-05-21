"use client";
import { useState } from "react";
import { useChatStore } from "@/lib/chatStore";

export default function ChatbotPopup() {
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);

	const chat = useChatStore((state) => state.chat);
	const addMessage = useChatStore((state) => state.addMessage);

	const sendMessage = async () => {
		if (!input.trim()) return;
		const userMsg = input.trim();
		addMessage({ role: "user", content: userMsg });
		setInput("");
		setLoading(true);

		try {
			const res = await fetch("https://rvcirclebot.onrender.com/chatbot", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ question: userMsg }),
			});
			const data = await res.json();
			addMessage({ role: "bot", content: data.answer });
		} catch (err) {
			addMessage({ role: "bot", content: "Error contacting chatbot." });
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed bottom-4 right-4 z-50">
			{open ? (
				<div className="w-[24rem] h-[36rem] bg-rv-backgroundSecondary text-rv-text rounded-2xl shadow-xl flex flex-col">
					<div className="p-3 border-b border-rv-border flex justify-between items-center">
						<span className="font-semibold">Ask RVCircle Bot</span>
						<button
							onClick={() => setOpen(false)}
							className="hover:text-rv-accent"
						>
							✕
						</button>
					</div>
					<div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
						{chat.map((msg, i) => (
							<div
								key={i}
								className={`p-2 rounded max-w-[85%] ${
									msg.role === "user"
										? "bg-[#3ecdc6] text-[#0e111a] ml-auto text-right"
										: "bg-rv-border text-rv-text mr-auto"
								}`}
							>
								{msg.content}
							</div>
						))}
						{loading && (
							<div className="text-rv-textMuted italic">Typing...</div>
						)}
					</div>
					<div className="p-2 border-t border-rv-border flex">
						<input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && sendMessage()}
							placeholder="Ask something..."
							className="flex-1 px-4 py-2 bg-[#141923] text-rv-text placeholder:text-rv-textMuted text-sm rounded-l-md"
						/>
						<button
							onClick={sendMessage}
							className="bg-rv-accent hover:bg-rv-accentHover px-5 py-2 text-sm text-[#0e111a] font-semibold rounded-r-md"
						>
							Go
						</button>
					</div>
				</div>
			) : (
				<button
					className="bg-rv-accent text-[#0e111a] rounded-full p-4 shadow-xl hover:scale-105 transition font-semibold"
					onClick={() => setOpen(true)}
				>
					💬
				</button>
			)}
		</div>
	);
}
