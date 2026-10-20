"use client";

import { type FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { useMyProfile } from "@/hooks/use-my-profile";
import { useUpdateMyProfile } from "@/hooks/use-update-my-profile";

export default function AccountProfileForm({
  roleLabel,
}: {
  roleLabel: string;
}) {
  const profile = useMyProfile();
  const update = useUpdateMyProfile();
  const user = profile.data?.data;
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setImageUrl(user.imageUrl ?? "");
    }
  }, [user]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedImageUrl = imageUrl.trim();

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      toast.error("Name must contain between 2 and 100 characters.");
      return;
    }

    if (trimmedImageUrl) {
      try {
        const url = new URL(trimmedImageUrl);
        if (url.protocol !== "https:" && url.protocol !== "http:") {
          throw new Error("Unsupported URL protocol");
        }
      } catch {
        toast.error("Enter a valid HTTP or HTTPS profile image URL.");
        return;
      }
    }

    try {
      await update.mutateAsync({
        name: trimmedName,
        ...(trimmedImageUrl ? { imageUrl: trimmedImageUrl } : {}),
      });
      await profile.refetch();
      toast.success("Profile updated successfully.");
    } catch {
      toast.error("Could not update your profile. Please try again.");
    }
  }

  if (profile.isLoading) {
    return (
      <main className="mx-auto w-full max-w-3xl space-y-5 px-4 py-10 sm:px-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-4 w-72 max-w-full animate-pulse rounded bg-muted" />
        <div className="mt-6 h-72 animate-pulse rounded-2xl border border-border bg-muted" />
      </main>
    );
  }

  if (profile.isError || !user) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        <div
          role="alert"
          className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6"
        >
          <h1 className="text-lg font-bold">Unable to load profile</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Profile information could not be loaded. Please try again.
          </p>
          <button
            type="button"
            onClick={() => void profile.refetch()}
            className="mt-4 min-h-10 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:py-12">
      <header className="mb-7">
        <p className="text-sm font-bold uppercase tracking-widest text-[#C65338] dark:text-[#FF9B80]">
          {roleLabel} account
        </p>
        <h1 className="mt-2 text-3xl font-black text-foreground">My Profile</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Review and update your account details.
        </p>
      </header>

      <form
        onSubmit={submit}
        className="space-y-5 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7"
      >
        <div className="space-y-2">
          <label
            htmlFor="account-profile-name"
            className="block text-sm font-semibold"
          >
            Full name
          </label>
          <input
            id="account-profile-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            minLength={2}
            maxLength={100}
            autoComplete="name"
            required
            aria-invalid={name.trim().length > 0 && name.trim().length < 2}
            className="min-h-11 w-full rounded-xl border border-input bg-background px-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <p className="text-xs text-muted-foreground">Use 2–100 characters.</p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="account-profile-email"
            className="block text-sm font-semibold"
          >
            Email address
          </label>
          <input
            id="account-profile-email"
            value={user.email}
            readOnly
            className="min-h-11 w-full rounded-xl border border-input bg-muted px-3 text-muted-foreground"
          />
          <p className="text-xs text-muted-foreground">
            Your email address cannot be changed here.
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="account-profile-image"
            className="block text-sm font-semibold"
          >
            Profile image URL{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </label>
          <input
            id="account-profile-image"
            type="url"
            inputMode="url"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://example.com/profile.jpg"
            className="min-h-11 w-full rounded-xl border border-input bg-background px-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
          <button
            type="submit"
            disabled={update.isPending}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-2 font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            {update.isPending ? "Saving…" : "Save profile"}
          </button>
          <span className="text-xs text-muted-foreground">
            Role: {user.role}
          </span>
        </div>
      </form>
    </main>
  );
}
