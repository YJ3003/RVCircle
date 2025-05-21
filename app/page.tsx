import LoginForm from "@/components/login-form";

export default function Home() {
	return (
		<main className="flex min-h-screen items-center justify-center px-4 py-12 bg-gradient-to-br from-rv-background to-rv-backgroundSecondary text-rv-text">
			<div className="w-full max-w-md bg-rv-background rounded-2xl shadow-xl border border-rv-border p-8 backdrop-blur-md">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-rv-accent drop-shadow-md">
						Welcome Back
					</h1>
					<p className="text-rv-textMuted mt-2">Sign in to your account</p>
				</div>
				<LoginForm />
			</div>
		</main>
	);
}
