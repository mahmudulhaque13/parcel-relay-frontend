"use client";

import { useForm } from "@tanstack/react-form";
import {
  Eye,
  EyeOff,
  Image as ImageIcon,
  LockKeyhole,
  Mail,
  Save,
  User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { changePassword } from "@/api/auth.api";
import { useAuth } from "@/hooks/use-auth";

import { useMyProfile } from "@/hooks/use-my-profile";
import { useUpdateMyProfile } from "@/hooks/use-update-my-profile";
import {
  type ProfileFormValues,
  profileSchema,
} from "@/validation/profile.validation";
import { changePasswordSchema } from "@/validation/auth.validation";

export default function CustomerProfilePage() {
  const router = useRouter();
  const { logoutUser } = useAuth();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const profileQuery = useMyProfile();
  const updateProfileMutation = useUpdateMyProfile();

  const profile = profileQuery.data?.data;

  const initialValues = useMemo<ProfileFormValues>(
    () => ({
      name: profile?.name ?? "",
      imageUrl: profile?.imageUrl ?? "",
    }),
    [profile],
  );

  /*
   * ----------------------------------------
   * Profile Update Form
   * ----------------------------------------
   */

  const form = useForm({
    defaultValues: initialValues,

    validators: {
      onSubmit: profileSchema,
    },

    onSubmit: async ({ value }) => {
      const payload = {
        name: value.name.trim(),
        ...(value.imageUrl.trim() ? { imageUrl: value.imageUrl.trim() } : {}),
      };

      try {
        await updateProfileMutation.mutateAsync(payload);

        toast.success("Profile updated successfully.");

        await profileQuery.refetch();
      } catch (error) {
        console.error("Profile update failed:", error);

        toast.error("Failed to update your profile. Please try again.");
      }
    },
  });

  /*
   * ----------------------------------------
   * Change Password Form
   * ----------------------------------------
   */

  const passwordForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validators: {
      onSubmit: changePasswordSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        await changePassword({
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
        });

        toast.success("Password changed successfully. Please log in again.");

        /*
         * Backend revokes all refresh sessions
         * after successful password change.
         *
         * logoutUser clears the frontend auth state.
         */
        logoutUser();

        router.push("/login");
      } catch (error) {
        console.error("Password change failed:", error);

        toast.error(
          "Unable to change password. Please check your current password and try again.",
        );
      }
    },
  });

  /*
   * ----------------------------------------
   * Sync Profile Data With Form
   * ----------------------------------------
   */

  useEffect(() => {
    if (!profile) {
      return;
    }

    form.setFieldValue("name", profile.name ?? "");
    form.setFieldValue("imageUrl", profile.imageUrl ?? "");
  }, [profile, form]);

  /*
   * ----------------------------------------
   * Loading State
   * ----------------------------------------
   */

  if (profileQuery.isLoading) {
    return (
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <div className="space-y-2">
          <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-72 animate-pulse rounded-md bg-muted" />
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-6">
            <div className="mx-auto h-24 w-24 animate-pulse rounded-full bg-muted" />

            <div className="space-y-3">
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
            </div>

            <div className="space-y-3">
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
            </div>

            <div className="space-y-3">
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
   * ----------------------------------------
   * Error State
   * ----------------------------------------
   */

  if (profileQuery.isError || !profile) {
    return (
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
          <h1 className="text-lg font-semibold text-destructive">
            Unable to load profile
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            We could not load your profile information. Please try again.
          </p>

          <button
            type="button"
            onClick={() => profileQuery.refetch()}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const avatarUrl = form.getFieldValue("imageUrl");
  const displayName = form.getFieldValue("name") || profile.name || "User";

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      {/* ========================================================= */}
      {/* Page Header */}
      {/* ========================================================= */}

      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Profile & Settings
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal account information.
        </p>
      </div>

      {/* ========================================================= */}
      {/* Personal Information */}
      {/* ========================================================= */}

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        {/* Card Header */}

        <div className="border-b bg-muted/30 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold">Personal Information</h2>

              <p className="text-sm text-muted-foreground">
                Update the information associated with your account.
              </p>
            </div>
          </div>
        </div>

        {/* Profile Form */}

        <form
          className="space-y-6 p-6"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();

            void form.handleSubmit();
          }}
        >
          {/* Avatar Preview */}

          <div className="flex flex-col items-center gap-3">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border bg-muted">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={`${displayName} profile`}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              ) : (
                <User className="h-10 w-10 text-muted-foreground" />
              )}
            </div>

            <div className="text-center">
              <p className="text-sm font-medium">{displayName}</p>

              <p className="text-xs text-muted-foreground">
                Profile photo preview
              </p>
            </div>
          </div>

          {/* Name */}

          <form.Field name="name">
            {(field) => {
              const hasError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;

              return (
                <div className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium">
                    Full Name
                  </label>

                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Enter your full name"
                      className={`h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/20 ${
                        hasError
                          ? "border-destructive focus:ring-destructive/20"
                          : "border-input"
                      }`}
                    />
                  </div>

                  {hasError && (
                    <p className="text-xs text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Email - Read Only */}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                id="email"
                type="email"
                value={profile.email}
                readOnly
                className="h-10 w-full cursor-not-allowed rounded-md border border-input bg-muted pl-9 pr-3 text-sm text-muted-foreground outline-none"
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Email address cannot be changed from this page.
            </p>
          </div>

          {/* Profile Image URL */}

          <form.Field name="imageUrl">
            {(field) => {
              const hasError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;

              return (
                <div className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium">
                    Profile Image URL
                  </label>

                  <div className="relative">
                    <ImageIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <input
                      id={field.name}
                      name={field.name}
                      type="url"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="https://example.com/avatar.jpg"
                      className={`h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/20 ${
                        hasError
                          ? "border-destructive focus:ring-destructive/20"
                          : "border-input"
                      }`}
                    />
                  </div>

                  {hasError && (
                    <p className="text-xs text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}

                  <p className="text-xs text-muted-foreground">
                    Leave empty if you do not want to use a profile image.
                  </p>
                </div>
              );
            }}
          </form.Field>

          {/* Save Profile */}

          <div className="flex justify-end border-t pt-5">
            <button
              type="submit"
              disabled={updateProfileMutation.isPending}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updateProfileMutation.isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ========================================================= */}
      {/* Change Password */}
      {/* ========================================================= */}

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        {/* Card Header */}

        <div className="border-b bg-muted/30 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <LockKeyhole className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold">Change Password</h2>

              <p className="text-sm text-muted-foreground">
                Update your account password securely.
              </p>
            </div>
          </div>
        </div>

        {/* Password Form */}

        <form
          className="space-y-5 p-6"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();

            void passwordForm.handleSubmit();
          }}
        >
          {/* Current Password */}

          <passwordForm.Field name="currentPassword">
            {(field) => {
              const hasError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;

              return (
                <div className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium">
                    Current Password
                  </label>

                  <div className="relative">
                    <input
                      id={field.name}
                      name={field.name}
                      type={showCurrentPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Enter your current password"
                      className={`h-10 w-full rounded-md border bg-background px-3 pr-10 text-sm outline-none transition focus:ring-2 focus:ring-primary/20 ${
                        hasError
                          ? "border-destructive focus:ring-destructive/20"
                          : "border-input"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword((previous) => !previous)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                      aria-label={
                        showCurrentPassword
                          ? "Hide current password"
                          : "Show current password"
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {hasError && (
                    <p className="text-xs text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              );
            }}
          </passwordForm.Field>

          {/* New Password */}

          <passwordForm.Field name="newPassword">
            {(field) => {
              const hasError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;

              return (
                <div className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium">
                    New Password
                  </label>

                  <div className="relative">
                    <input
                      id={field.name}
                      name={field.name}
                      type={showNewPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Enter your new password"
                      className={`h-10 w-full rounded-md border bg-background px-3 pr-10 text-sm outline-none transition focus:ring-2 focus:ring-primary/20 ${
                        hasError
                          ? "border-destructive focus:ring-destructive/20"
                          : "border-input"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowNewPassword((previous) => !previous)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                      aria-label={
                        showNewPassword
                          ? "Hide new password"
                          : "Show new password"
                      }
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {hasError && (
                    <p className="text-xs text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              );
            }}
          </passwordForm.Field>

          {/* Confirm New Password */}

          <passwordForm.Field name="confirmPassword">
            {(field) => {
              const hasError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;

              return (
                <div className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium">
                    Confirm New Password
                  </label>

                  <div className="relative">
                    <input
                      id={field.name}
                      name={field.name}
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Confirm your new password"
                      className={`h-10 w-full rounded-md border bg-background px-3 pr-10 text-sm outline-none transition focus:ring-2 focus:ring-primary/20 ${
                        hasError
                          ? "border-destructive focus:ring-destructive/20"
                          : "border-input"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((previous) => !previous)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {hasError && (
                    <p className="text-xs text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              );
            }}
          </passwordForm.Field>

          {/* Password Notice */}

          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-sm text-muted-foreground">
              After changing your password, you will be logged out and asked to
              sign in again with your new password.
            </p>
          </div>

          {/* Change Password Button */}

          <div className="flex justify-end border-t pt-5">
            <passwordForm.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Changing Password...
                    </>
                  ) : (
                    <>
                      <LockKeyhole className="h-4 w-4" />
                      Change Password
                    </>
                  )}
                </button>
              )}
            </passwordForm.Subscribe>
          </div>
        </form>
      </div>

      {/* ========================================================= */}
      {/* Account Information */}
      {/* ========================================================= */}

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="font-semibold">Account Information</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {/* Role */}

          <div className="rounded-lg border bg-muted/20 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Role
            </p>

            <p className="mt-1 text-sm font-semibold">{profile.role}</p>
          </div>

          {/* Account Status */}

          <div className="rounded-lg border bg-muted/20 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Account Status
            </p>

            <p className="mt-1 text-sm font-semibold">{profile.status}</p>
          </div>

          {/* Email Verification */}

          <div className="rounded-lg border bg-muted/20 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Email Verification
            </p>

            <p className="mt-1 text-sm font-semibold">
              {profile.emailVerified ? "Verified" : "Not Verified"}
            </p>
          </div>

          {/* Auth Provider */}

          <div className="rounded-lg border bg-muted/20 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Auth Provider
            </p>

            <p className="mt-1 text-sm font-semibold">{profile.authProvider}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
