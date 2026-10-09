"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { register } from "@/api/auth.api";
import GoogleLoginComponent from "@/components/modules/google-login/GoogleLogin";
import { registerSchema } from "@/validation/auth.validation";

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

const inputClassName =
  "min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1D3557] focus:ring-4 focus:ring-[#1D3557]/[0.08] aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-100";

const labelClassName = "block text-sm font-bold text-[#1D3557]";

function FieldErrors({ name, errors }: { name: string; errors: unknown[] }) {
  if (errors.length === 0) return null;

  return (
    <div aria-live="polite" className="space-y-1">
      {errors.map((error, index) => (
        <p
          key={`${name}-error-${index}`}
          className="text-sm font-medium leading-5 text-red-600"
        >
          {getFieldErrorMessage(error)}
        </p>
      ))}
    </div>
  );
}

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validators: {
      onSubmit: registerSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        await register({
          name: value.name.trim(),
          email: value.email.trim(),
          password: value.password,
        });

        toast.success(
          "Account created successfully. Redirecting to email verification...",
        );

        setTimeout(() => {
          router.push(
            `/verify-email?email=${encodeURIComponent(value.email.trim())}`,
          );
        }, 1200);
      } catch (error) {
        console.error("Registration failed:", error);

        toast.error(
          "Registration failed. Please check your information and try again.",
        );
      }
    },
  });

  return (
    <div className="space-y-7">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        <form.Field name="name">
          {(field) => (
            <div className="space-y-2">
              <label htmlFor={field.name} className={labelClassName}>
                Full name
              </label>

              <input
                id={field.name}
                name={field.name}
                type="text"
                autoComplete="name"
                required
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="Your full name"
                aria-invalid={field.state.meta.errors.length > 0}
                className={inputClassName}
              />

              <FieldErrors name={field.name} errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <div className="space-y-2">
              <label htmlFor={field.name} className={labelClassName}>
                Email address
              </label>

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
                className={inputClassName}
              />

              <FieldErrors name={field.name} errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <div className="space-y-2">
              <label htmlFor={field.name} className={labelClassName}>
                Password
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
                  placeholder="Enter a strong password"
                  aria-invalid={field.state.meta.errors.length > 0}
                  className={`${inputClassName} pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
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

              <FieldErrors name={field.name} errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        <form.Field name="confirmPassword">
          {(field) => (
            <div className="space-y-2">
              <label htmlFor={field.name} className={labelClassName}>
                Confirm password
              </label>

              <div className="relative">
                <input
                  id={field.name}
                  name={field.name}
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Confirm your password"
                  aria-invalid={field.state.meta.errors.length > 0}
                  className={`${inputClassName} pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  aria-pressed={showConfirmPassword}
                  className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#1D3557] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#E76F51]"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              <FieldErrors name={field.name} errors={field.state.meta.errors} />
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
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          )}
        </form.Subscribe>
      </form>

      <div className="space-y-4">
        <div className="relative flex items-center justify-center">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
            Or continue with
          </span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="flex justify-center">
          <GoogleLoginComponent />
        </div>
      </div>

      <p className="border-t border-slate-100 pt-5 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="inline-flex items-center gap-1 font-bold text-[#1D3557] underline decoration-[#E76F51]/60 underline-offset-4 transition-colors hover:text-[#E76F51] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
        >
          Sign in
          <ArrowRight className="size-3.5" />
        </Link>
      </p>
    </div>
  );
}
