"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { verifyCourierEmail } from "@/api/courier.api";
import { verifyCourierEmailSchema } from "@/validation/courier.validation";

function getFieldErrorMessage(error: unknown): string {
  if (typeof error === "string") {
    return error;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "Invalid value";
}

export default function VerifyCourierEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const form = useForm({
    defaultValues: {
      email,
      otp: "",
    },

    validators: {
      onSubmit: verifyCourierEmailSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        const response = await verifyCourierEmail({
          email: value.email.trim(),
          otp: value.otp,
        });

        toast.success(
          "Email verified successfully. Your courier application is now waiting for admin approval.",
        );

        setTimeout(() => {
          router.push("/login");
        }, 1500);

        console.log("Courier verification response:", response);
      } catch (error) {
        console.error("Courier email verification failed:", error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Verification failed. Please check your email and OTP and try again.",
        );
      }
    },
  });

  return (
    <div className="space-y-6">
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

              {field.state.meta.errors.map((error, index) => (
                <p
                  key={`${field.name}-error-${index}`}
                  className="text-sm text-red-600"
                >
                  {getFieldErrorMessage(error)}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <form.Field name="otp">
          {(field) => (
            <div className="space-y-2">
              <label htmlFor={field.name} className="text-sm font-medium">
                Verification code
              </label>

              <input
                id={field.name}
                name={field.name}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={field.state.value}
                onChange={(event) =>
                  field.handleChange(
                    event.target.value.replace(/\D/g, "").slice(0, 6),
                  )
                }
                placeholder="123456"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-center text-lg tracking-[0.4em] outline-none focus:ring-2 focus:ring-ring"
              />

              {field.state.meta.errors.map((error, index) => (
                <p
                  key={`${field.name}-error-${index}`}
                  className="text-sm text-red-600"
                >
                  {getFieldErrorMessage(error)}
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
                  Verifying...
                </>
              ) : (
                "Verify email"
              )}
            </button>
          )}
        </form.Subscribe>
      </form>

      <div className="rounded-lg border bg-muted/30 p-4 text-center">
        <p className="text-sm text-muted-foreground">
          After verification, your courier application will be reviewed by an
          administrator.
        </p>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already verified?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
