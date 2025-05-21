import Topbar from "@/components/ui/topbar";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div className="h-screen overflow-hidden bg-gradient-to-br from-rv-background to-rv-backgroundSecondary text-rv-text">
			<Topbar />
			<main className="h-full overflow-auto pt-16 px-4 py-8">{children}</main>
		</div>
	);
}
