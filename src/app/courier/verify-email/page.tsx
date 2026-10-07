import { Suspense } from "react";

import VerifyCourierEmailForm from "@/components/auth/verify-courier-email-form";

export default function VerifyCourierEmailPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Verify your courier email
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Enter the 6-digit OTP sent to your email address.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="rounded-lg border border-border bg-card p-6 text-center text-sm text-muted-foreground">
              Loading verification form...
            </div>
          }
        >
          <VerifyCourierEmailForm />
        </Suspense>
      </div>
    </main>
  );
}
