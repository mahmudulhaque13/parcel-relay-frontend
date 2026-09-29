import Link from "next/link";

import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your ParcelRelay account
          </p>
        </div>

        <LoginForm />

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium underline">
            Create account
          </Link>
        </p>
      </div>
    </main>
  );
}
