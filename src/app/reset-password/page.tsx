"use client";

import { useForm } from "@tanstack/react-form";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";

import { resetPassword } from "@/api/auth.api";
import { resetPasswordSchema } from "@/validation/auth.validation";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const [showPassword, setShowPassword] = useState(false);

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

        toast.success("Password reset successfully. Please sign in.");
        router.push("/login");
      } catch (error) {
        console.error("Password reset failed:", error);

        const message =
          error instanceof Error
            ? error.message
            : "Password reset failed. Please check your OTP and try again.";

        toast.error(message);

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
    <div className="w-full max-w-md">
      <Link
        href="/forgot-password"
        className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[#1D3557] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
      >
        <ArrowLeft className="size-4" />
        Back to forgot password
      </Link>

      <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-xl shadow-[#1D3557]/[0.06] sm:p-9">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-[#1D3557]/[0.06] text-[#1D3557] ring-1 ring-[#1D3557]/10">
            <KeyRound className="size-7" strokeWidth={1.8} />
          </div>

          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-[#E76F51]">
            Account recovery
          </p>

          <h1 className="mt-3 text-2xl font-black tracking-tight text-[#1D3557] sm:text-3xl">
            Reset your password
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Enter the verification code sent to your email and choose a new
            password.
          </p>
        </div>

        <div className="mt-7 flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#E76F51]" />
          <p className="text-xs leading-5 text-slate-600">
            For your security, use the OTP sent to your registered email
            address.
          </p>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
          className="mt-7 space-y-5"
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
                    readOnly={Boolean(email)}
                    aria-invalid={field.state.meta.errors.length > 0}
                    className="min-h-12 w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition duration-200 read-only:bg-slate-50 read-only:text-slate-500 focus:border-[#1D3557] focus:ring-4 focus:ring-[#1D3557]/[0.08] aria-[invalid=true]:border-red-400"
                  />
                </div>

                {field.state.meta.errors.map((error, index) => (
                  <p
                    key={`email-error-${index}`}
                    className="text-sm font-medium text-red-600"
                  >
                    {error?.toString()}
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
                    field.handleChange(event.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter 6-digit OTP"
                  aria-invalid={field.state.meta.errors.length > 0}
                  className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-base font-bold tracking-[0.35em] text-slate-800 outline-none transition duration-200 placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1D3557] focus:ring-4 focus:ring-[#1D3557]/[0.08] aria-[invalid=true]:border-red-400"
                />

                {field.state.meta.errors.map((error, index) => (
                  <p
                    key={`otp-error-${index}`}
                    className="text-sm font-medium text-red-600"
                  >
                    {error?.toString()}
                  </p>
                ))}
              </div>
            )}
          </form.Field>

          <form.Field name="newPassword">
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-bold text-[#1D3557]"
                >
                  New password
                </label>

                <div className="relative">
                  <input
                    id={field.name}
                    name={field.name}
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Enter your new password"
                    aria-invalid={field.state.meta.errors.length > 0}
                    className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1D3557] focus:ring-4 focus:ring-[#1D3557]/[0.08] aria-[invalid=true]:border-red-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#1D3557] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#E76F51]"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>

                {field.state.meta.errors.map((error, index) => (
                  <p
                    key={`password-error-${index}`}
                    className="text-sm font-medium text-red-600"
                  >
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
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1D3557] px-4 py-3 text-sm font-bold text-white shadow-md shadow-[#1D3557]/10 transition duration-200 hover:-translate-y-0.5 hover:bg-[#29486f] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-ring loading-sm" />
                    Resetting password...
                  </>
                ) : (
                  <>
                    Reset password
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            )}
          </form.Subscribe>
        </form>

        <div className="mt-7 border-t border-slate-100 pt-5 text-center">
          <p className="text-sm text-slate-500">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-bold text-[#1D3557] underline decoration-[#E76F51]/60 underline-offset-4 transition-colors hover:text-[#E76F51] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>

      <p className="mt-5 text-center text-xs leading-5 text-slate-400">
        ParcelRelay · Secure account recovery
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-76px)] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50/60 px-4 py-10 sm:px-6 sm:py-14">
      <div className="absolute -right-24 top-10 -z-10 size-80 rounded-full bg-orange-200/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 -z-10 size-80 rounded-full bg-blue-100/30 blur-3xl" />

      <Suspense
        fallback={
          <div
            className="loading loading-ring loading-lg text-[#1D3557]"
            aria-label="Loading password reset form"
          />
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
