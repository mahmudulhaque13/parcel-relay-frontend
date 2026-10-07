"use client";

import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, FileText, ImagePlus } from "lucide-react";
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
      {/* Name */}
      <form.Field name="name">
        {(field) => (
          <div className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              Full name
            </label>

            <input
              id={field.name}
              name={field.name}
              type="text"
              autoComplete="name"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="Your full name"
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

      {/* Email */}
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

      {/* Phone */}
      <form.Field name="phone">
        {(field) => (
          <div className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              Phone number
            </label>

            <input
              id={field.name}
              name={field.name}
              type="tel"
              autoComplete="tel"
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="01XXXXXXXXX"
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

      {/* Password */}
      <form.Field name="password">
        {(field) => (
          <div className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <input
                id={field.name}
                name={field.name}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="Enter a strong password"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring"
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                key={`${field.name}-error-${index}`}
                className="text-sm text-red-600"
              >
                {getFieldErrorMessage(error)}
              </p>
            ))}
          </div>
        )}
      </form.Field>

      {/* Confirm Password */}
      <form.Field name="confirmPassword">
        {(field) => (
          <div className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              Confirm password
            </label>

            <div className="relative">
              <input
                id={field.name}
                name={field.name}
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="Confirm your password"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((current) => !current)}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>

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

      {/* Identity Document */}
      <form.Field name="identityDocument">
        {(field) => (
          <div className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              Identity document
            </label>

            <div className="rounded-lg border border-dashed border-input bg-muted/30 p-4">
              <div className="flex items-center gap-3">
                <FileText className="size-5 text-muted-foreground" />

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">NID / Passport</p>
                  <p className="text-xs text-muted-foreground">
                    PDF, JPG or PNG · Maximum 5MB
                  </p>
                </div>

                <label
                  htmlFor={field.name}
                  className="cursor-pointer rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  Choose file
                </label>
              </div>

              <input
                id={field.name}
                name={field.name}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="sr-only"
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
                <p className="mt-3 truncate text-sm text-muted-foreground">
                  Selected: {field.state.value.name}
                </p>
              )}
            </div>

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

      {/* Profile Photo */}
      <form.Field name="profilePhoto">
        {(field) => (
          <div className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              Profile photo
            </label>

            <div className="rounded-lg border border-dashed border-input bg-muted/30 p-4">
              <div className="flex items-center gap-3">
                <ImagePlus className="size-5 text-muted-foreground" />

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Profile photo</p>
                  <p className="text-xs text-muted-foreground">
                    JPG or PNG · Maximum 5MB
                  </p>
                </div>

                <label
                  htmlFor={field.name}
                  className="cursor-pointer rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  Choose photo
                </label>
              </div>

              <input
                id={field.name}
                name={field.name}
                type="file"
                accept=".jpg,.jpeg,.png"
                className="sr-only"
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
                <p className="mt-3 truncate text-sm text-muted-foreground">
                  Selected: {field.state.value.name}
                </p>
              )}
            </div>

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

      {/* Submit */}
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-ring loading-sm" />
                Submitting application...
              </>
            ) : (
              "Apply as Courier"
            )}
          </button>
        )}
      </form.Subscribe>

      <p className="text-center text-sm text-muted-foreground">
        Already have a customer account?{" "}
        <a href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </a>
      </p>
    </form>
  );
}
