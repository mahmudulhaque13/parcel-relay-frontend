"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { verifyEmail } from "@/api/auth.api";
import { verifyEmailSchema } from "@/validation/auth.validation";

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

export default function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const form = useForm({
    defaultValues: {
      email,
      otp: "",
    },

    validators: {
      onSubmit: verifyEmailSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        await verifyEmail({
          email: value.email.trim(),
          otp: value.otp,
        });

        toast.success("Email verified successfully. Redirecting to login...");

        setTimeout(() => {
          router.push("/login");
        }, 1200);
      } catch (error) {
        console.error("Email verification failed:", error);

        toast.error(
          "Verification failed. Please check your email and OTP and try again.",
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
              <label
                htmlFor={field.name}
                className="block text-sm font-bold text-[#1D3557]"
              >
                Email address
              </label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                <input
                  id={field.name}
                  name={field.name}
                  type="email"
                  autoComplete="email"
                  required
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="you@example.com"
                  aria-invalid={field.state.meta.errors.length > 0}
                  className="min-h-12 w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1D3557] focus:ring-4 focus:ring-[#1D3557]/[0.08] aria-[invalid=true]:border-red-400"
                />
              </div>

              {field.state.meta.errors.map((error, index) => (
                <p
                  key={`${field.name}-error-${index}`}
                  className="text-sm font-medium text-red-600"
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
              <label
                htmlFor={field.name}
                className="block text-sm font-bold text-[#1D3557]"
              >
                Verification code (OTP)
              </label>

              <input
                id={field.name}
                name={field.name}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                required
                value={field.state.value}
                onChange={(event) =>
                  field.handleChange(
                    event.target.value.replace(/\D/g, "").slice(0, 6),
                  )
                }
                placeholder="Enter 6-digit code"
                aria-invalid={field.state.meta.errors.length > 0}
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-lg font-bold tracking-[0.4em] text-[#1D3557] outline-none transition duration-200 placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1D3557] focus:ring-4 focus:ring-[#1D3557]/[0.08] aria-[invalid=true]:border-red-400"
              />

              <p className="text-xs leading-5 text-slate-500">
                Enter the six-digit code sent to your email address.
              </p>

              {field.state.meta.errors.map((error, index) => (
                <p
                  key={`${field.name}-error-${index}`}
                  className="text-sm font-medium text-red-600"
                >
                  {getFieldErrorMessage(error)}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#E76F51]" />

          <p className="text-xs leading-5 text-slate-600">
            Keep your verification code private. It helps confirm that you own
            this email address.
          </p>
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1D3557] px-4 py-3 text-sm font-bold text-white shadow-md shadow-[#1D3557]/10 transition duration-200 hover:-translate-y-0.5 hover:bg-[#29486f] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-ring loading-sm" />
                  Verifying email...
                </>
              ) : (
                <>
                  Verify email
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          )}
        </form.Subscribe>
      </form>

      <p className="border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
        Already verified?{" "}
        <Link
          href="/login"
          className="font-bold text-[#1D3557] underline decoration-[#E76F51]/60 underline-offset-4 transition-colors hover:text-[#E76F51] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
