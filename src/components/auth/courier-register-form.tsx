"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowRight, Eye, EyeOff, FileText, ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { applyAsCourier } from "@/api/courier.api";
import { courierApplicationSchema } from "@/validation/courier.validation";

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

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const identityDocumentTypes = ["application/pdf", "image/jpeg", "image/png"];

const profilePhotoTypes = ["image/jpeg", "image/png"];

const labelClassName = "block text-sm font-bold text-[#1D3557]";

const inputClassName =
  "min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1D3557] focus:ring-4 focus:ring-[#1D3557]/[0.08] aria-[invalid=true]:border-red-400";

const passwordInputClassName = `${inputClassName} pr-12`;

const visibilityButtonClassName =
  "absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#1D3557] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#E76F51]";

const uploadPanelClassName =
  "rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-4 transition-colors hover:border-[#1D3557]/30";

const uploadButtonClassName =
  "cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-[#1D3557] transition-colors hover:border-[#1D3557]/30 hover:bg-slate-50";

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

export default function CourierRegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      identityDocument: undefined as File | undefined,
      profilePhoto: undefined as File | undefined,
    },

    validators: {
      onSubmit: courierApplicationSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        if (!value.identityDocument || !value.profilePhoto) {
          toast.error("Identity document and profile photo are required.");
          return;
        }

        await applyAsCourier({
          name: value.name.trim(),
          email: value.email.trim(),
          phone: value.phone.trim(),
          password: value.password,
          identityDocument: value.identityDocument,
          profilePhoto: value.profilePhoto,
        });

        toast.success(
          "Courier application submitted. Redirecting to email verification...",
        );

        setTimeout(() => {
          router.push(
            `/courier/verify-email?email=${encodeURIComponent(
              value.email.trim(),
            )}`,
          );
        }, 1200);
      } catch (error) {
        console.error("Courier application failed:", error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Courier application failed. Please try again.",
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

      <form.Field name="phone">
        {(field) => (
          <div className="space-y-2">
            <label htmlFor={field.name} className={labelClassName}>
              Phone number
            </label>

            <input
              id={field.name}
              name={field.name}
              type="tel"
              autoComplete="tel"
              required
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="01XXXXXXXXX"
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
                className={passwordInputClassName}
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className={visibilityButtonClassName}
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
                className={passwordInputClassName}
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
                className={visibilityButtonClassName}
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

      <form.Field name="identityDocument">
        {(field) => (
          <div className="space-y-2">
            <label htmlFor={field.name} className={labelClassName}>
              Identity document
            </label>

            <div className={uploadPanelClassName}>
              <div className="flex items-center gap-3">
                <FileText className="size-5 shrink-0 text-[#1D3557]" />

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#1D3557]">
                    NID / Passport
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    PDF, JPG or PNG · Maximum 5MB
                  </p>
                </div>

                <label htmlFor={field.name} className={uploadButtonClassName}>
                  Choose file
                </label>
              </div>

              <input
                id={field.name}
                name={field.name}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="sr-only"
                aria-invalid={field.state.meta.errors.length > 0}
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (!file) {
                    field.handleChange(undefined);
                    return;
                  }

                  if (!identityDocumentTypes.includes(file.type)) {
                    toast.error(
                      "Identity document must be a PDF, JPG, or PNG file.",
                    );
                    event.target.value = "";
                    field.handleChange(undefined);
                    return;
                  }

                  if (file.size > MAX_FILE_SIZE) {
                    toast.error("Identity document must be smaller than 5MB.");
                    event.target.value = "";
                    field.handleChange(undefined);
                    return;
                  }

                  field.handleChange(file);
                }}
              />

              {field.state.value && (
                <p className="mt-3 flex items-center gap-2 break-all text-sm font-medium text-[#1D3557]">
                  <FileText className="size-4 shrink-0 text-[#E76F51]" />
                  Selected: {field.state.value.name}
                </p>
              )}
            </div>

            <FieldErrors name={field.name} errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      <form.Field name="profilePhoto">
        {(field) => (
          <div className="space-y-2">
            <label htmlFor={field.name} className={labelClassName}>
              Profile photo
            </label>

            <div className={uploadPanelClassName}>
              <div className="flex items-center gap-3">
                <ImagePlus className="size-5 shrink-0 text-[#1D3557]" />

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#1D3557]">
                    Profile photo
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    JPG or PNG · Maximum 5MB
                  </p>
                </div>

                <label htmlFor={field.name} className={uploadButtonClassName}>
                  Choose photo
                </label>
              </div>

              <input
                id={field.name}
                name={field.name}
                type="file"
                accept=".jpg,.jpeg,.png"
                className="sr-only"
                aria-invalid={field.state.meta.errors.length > 0}
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (!file) {
                    field.handleChange(undefined);
                    return;
                  }

                  if (!profilePhotoTypes.includes(file.type)) {
                    toast.error("Profile photo must be a JPG or PNG file.");
                    event.target.value = "";
                    field.handleChange(undefined);
                    return;
                  }

                  if (file.size > MAX_FILE_SIZE) {
                    toast.error("Profile photo must be smaller than 5MB.");
                    event.target.value = "";
                    field.handleChange(undefined);
                    return;
                  }

                  field.handleChange(file);
                }}
              />

              {field.state.value && (
                <p className="mt-3 flex items-center gap-2 break-all text-sm font-medium text-[#1D3557]">
                  <ImagePlus className="size-4 shrink-0 text-[#E76F51]" />
                  Selected: {field.state.value.name}
                </p>
              )}
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
                Submitting application...
              </>
            ) : (
              <>
                Apply as Courier
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        )}
      </form.Subscribe>

      <p className="border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
        Already have a courier account?{" "}
        <a
          href="/login"
          className="font-bold text-[#1D3557] underline decoration-[#E76F51]/60 underline-offset-4 transition-colors hover:text-[#E76F51] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
        >
          Sign in
        </a>
      </p>
    </form>
  );
}
