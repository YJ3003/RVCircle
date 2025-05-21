"use client";

import {
	Menubar,
	MenubarMenu,
	MenubarTrigger,
	MenubarContent,
	MenubarItem,
	MenubarSeparator,
} from "@/components/ui/menubar";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Topbar() {
	const [user, setUser] = useState<{ name: string; email: string } | null>(
		null
	);

	useEffect(() => {
		const u = localStorage.getItem("user");
		if (u) setUser(JSON.parse(u));
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("user");
		window.location.href = "/";
	};

	return (
		<Menubar className="fixed top-0 left-0 w-full h-16 px-8 bg-rv-topbar text-rv-text border-b border-rv-border shadow-md z-50 flex items-center justify-between">
			<Link href="/dashboard" className="flex items-center gap-3">
				<img
					src="/rv-logo.png"
					alt="RVCE Logo"
					className="h-10 w-10 rounded-full border border-rv-accent shadow"
				/>
				<span className="text-2xl font-semibold tracking-tight hover:text-rv-accent transition-all drop-shadow-sm">
					RVCircle
				</span>
			</Link>

			{user && (
				<MenubarMenu>
					<MenubarTrigger className="cursor-pointer font-medium hover:text-rv-accent transition">
						{user.name}
					</MenubarTrigger>
					<MenubarContent
						align="end"
						className="bg-rv-backgroundSecondary text-rv-text border border-rv-border rounded-md shadow-xl"
					>
						<MenubarItem
							className="hover:bg-rv-accent/20 text-sm font-medium cursor-pointer px-4 py-2 rounded"
							asChild
						>
							<Link href="/dashboard/profile">Profile</Link>
						</MenubarItem>
						<MenubarSeparator className="bg-rv-border" />
						<MenubarItem
							className="hover:bg-red-600 text-sm font-medium cursor-pointer px-4 py-2 rounded"
							onClick={handleLogout}
						>
							Logout
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			)}
		</Menubar>
	);
}
