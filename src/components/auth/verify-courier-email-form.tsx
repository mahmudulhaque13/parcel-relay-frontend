"use client";

import { useForm } from "@tanstack/react-form";
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
        await verifyCourierEmail({
          email: value.email.trim(),
          otp: value.otp,
        });

        toast.success(
          "Email verified successfully. Your courier application is now waiting for admin approval.",
        );

        router.push("/login");
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
              className="block text-sm font-semibold text-slate-700"
            >
              Email address
            </label>

            <input
              id={field.name}
              name={field.name}
              type="email"
              autoComplete="email"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1D3557] focus:bg-white focus:ring-4 focus:ring-[#1D3557]/10"
            />

            {field.state.meta.errors.map((error, index) => (
              <p
                key={`${field.name}-error-${index}`}
                role="alert"
                className="text-xs font-medium text-red-600"
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
              className="block text-sm font-semibold text-slate-700"
            >
              6-digit verification code
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
              placeholder="000000"
              aria-describedby={`${field.name}-hint`}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-4 text-center font-mono text-2xl font-bold tracking-[0.45em] text-[#1D3557] outline-none transition placeholder:font-normal placeholder:text-slate-300 placeholder:tracking-[0.45em] hover:border-slate-300 focus:border-[#1D3557] focus:bg-white focus:ring-4 focus:ring-[#1D3557]/10"
            />

            <p
              id={`${field.name}-hint`}
              className="text-xs leading-5 text-slate-500"
            >
              Enter the six-digit code sent to your email address.
            </p>

            {field.state.meta.errors.map((error, index) => (
              <p
                key={`${field.name}-error-${index}`}
                role="alert"
                className="text-xs font-medium text-red-600"
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
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1D3557] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1D3557]/15 transition duration-200 hover:-translate-y-0.5 hover:bg-[#142942] hover:shadow-xl hover:shadow-[#1D3557]/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
          >
            {isSubmitting ? (
              <>
                <span
                  className="loading loading-ring loading-sm"
                  aria-hidden="true"
                />
                Verifying email...
              </>
            ) : (
              "Verify email"
            )}
          </button>
        )}
      </form.Subscribe>

      <div className="rounded-xl border border-[#1D3557]/10 bg-[#1D3557]/[0.035] p-4">
        <p className="text-sm leading-6 text-slate-600">
          <span className="font-semibold text-[#1D3557]">
            What happens next?
          </span>{" "}
          After successful verification, your courier application will be
          submitted for administrator review.
        </p>
      </div>
    </form>
  );
}
