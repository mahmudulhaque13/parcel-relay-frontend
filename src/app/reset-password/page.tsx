"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { resetPassword } from "@/api/auth.api";
import { resetPasswordSchema } from "@/validation/auth.validation";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const form = useForm({
    defaultValues: {
      email,
      otp: "",
      newPassword: "",
    },

    validators: {
      onSubmit: resetPasswordSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        await resetPassword({
          email: value.email.trim(),
          otp: value.otp,
          newPassword: value.newPassword,
        });

        router.push("/login");
      } catch (error) {
        console.error("Password reset failed:", error);

        form.setFieldMeta("otp", (meta) => ({
          ...meta,
          errors: [
            "Password reset failed. Please check your OTP and try again.",
          ],
        }));
      }
    },
  });

  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl border bg-card p-6 shadow-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Reset Password</h1>

        <p className="text-sm text-muted-foreground">
          Enter the OTP sent to your email and choose a new password.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        <form.Field name="email">
          {(field) => (
            <div className="space-y-2">
              <label htmlFor={field.name} className="text-sm font-medium">
                Email
              </label>

              <input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                readOnly={Boolean(email)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
              />

              {field.state.meta.errors.map((error) => (
                <p key={error?.toString()} className="text-sm text-red-600">
                  {error?.toString()}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <form.Field name="otp">
          {(field) => (
            <div className="space-y-2">
              <label htmlFor={field.name} className="text-sm font-medium">
                OTP
              </label>

              <input
                id={field.name}
                name={field.name}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={field.state.value}
                onChange={(event) =>
                  field.handleChange(event.target.value.replace(/\D/g, ""))
                }
                placeholder="Enter 6-digit OTP"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm tracking-widest outline-none focus:ring-2 focus:ring-ring"
              />

              {field.state.meta.errors.map((error) => (
                <p key={error?.toString()} className="text-sm text-red-600">
                  {error?.toString()}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <form.Field name="newPassword">
          {(field) => (
            <div className="space-y-2">
              <label htmlFor={field.name} className="text-sm font-medium">
                New Password
              </label>

              <input
                id={field.name}
                name={field.name}
                type="password"
                autoComplete="new-password"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="Enter your new password"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />

              {field.state.meta.errors.map((error) => (
                <p key={error?.toString()} className="text-sm text-red-600">
                  {error?.toString()}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-ring loading-sm" />
                  Resetting Password...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          )}
        </form.Subscribe>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Back to login
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <Suspense fallback={<div className="loading loading-ring loading-lg" />}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
