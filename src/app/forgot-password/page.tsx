"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { forgotPassword } from "@/api/auth.api";
import { forgotPasswordSchema } from "@/validation/auth.validation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
    },

    validators: {
      onSubmit: forgotPasswordSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        const response = await forgotPassword({
          email: value.email.trim(),
        });

        toast.success(
          "If an account exists with this email, a password reset OTP has been sent.",
        );

        router.push(
          `/reset-password?email=${encodeURIComponent(response.data.email)}`,
        );
      } catch (error) {
        console.error("Forgot password failed:", error);

        const message =
          error instanceof Error
            ? error.message
            : "Unable to process password reset request. Please try again.";

        toast.error(message);

        form.setFieldMeta("email", (meta) => ({
          ...meta,
          errors: [
            "Unable to process password reset request. Please try again.",
          ],
        }));
      }
    },
  });

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6 rounded-2xl border bg-card p-6 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Forgot Password?</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and we&apos;ll send you a password reset OTP.
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
                  autoComplete="email"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="you@example.com"
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
                    Sending OTP...
                  </>
                ) : (
                  "Send Reset OTP"
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
    </main>
  );
}
