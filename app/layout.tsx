import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
	title: "RVCircle | Login",
	description: "Login to RVCircle — your RVCE peer platform",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head />
			<body className="bg-rv-background text-rv-text font-sans">
				{children}
			</body>
		</html>
	);
}
