import RegisterForm from "@/components/register-form";

export default function Register() {
	return (
		<main className="flex min-h-screen items-center justify-center px-4 py-12 bg-gradient-to-br from-rv-background to-rv-backgroundSecondary text-rv-text">
			<div className="w-full max-w-md bg-rv-background border border-rv-border rounded-2xl shadow-xl p-8 backdrop-blur-md">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-rv-accent drop-shadow-md">
						Create an Account
					</h1>
					<p className="text-rv-textMuted mt-2">Sign up to get started</p>
				</div>
				<RegisterForm />
			</div>
		</main>
	);
}
