// lib/chatStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Message = { role: string; content: string };

interface ChatStore {
	chat: Message[];
	addMessage: (msg: Message) => void;
	resetChat: () => void;
}

export const useChatStore = create<ChatStore>()(
	persist(
		(set) => ({
			chat: [],
			addMessage: (msg) => set((state) => ({ chat: [...state.chat, msg] })),
			resetChat: () => set({ chat: [] }),
		}),
		{
			name: "chat-storage", // localStorage key
		}
	)
);
