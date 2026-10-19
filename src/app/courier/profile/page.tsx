"use client";

import { type FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { useMyProfile } from "@/hooks/use-my-profile";
import { useUpdateMyProfile } from "@/hooks/use-update-my-profile";

export default function CourierProfilePage() {
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
    if (name.trim().length < 2) {
      toast.error("Name must contain at least 2 characters.");
      return;
    }
    try {
      await update.mutateAsync({
        name: name.trim(),
        imageUrl: imageUrl.trim() || undefined,
      });
      toast.success("Profile updated.");
    } catch {
      toast.error("Could not update your profile. Please try again.");
    }
  }
  if (profile.isLoading)
    return (
      <div className="mx-auto max-w-3xl p-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="mt-6 h-64 animate-pulse rounded-2xl bg-muted" />
      </div>
    );
  if (profile.isError || !user)
    return (
      <div className="mx-auto max-w-3xl p-6" role="alert">
        Profile could not be loaded. Refresh the page or contact support.
      </div>
    );
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <header className="mb-7">
        <p className="text-sm font-bold uppercase tracking-widest text-[#C65338]">
          Courier account
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
        <div>
          <label
            htmlFor="courier-name"
            className="mb-2 block text-sm font-semibold"
          >
            Full name
          </label>
          <input
            id="courier-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength={2}
            maxLength={100}
            required
            className="min-h-11 w-full rounded-xl border border-input bg-background px-3"
          />
        </div>
        <div>
          <label
            htmlFor="courier-email"
            className="mb-2 block text-sm font-semibold"
          >
            Email
          </label>
          <input
            id="courier-email"
            value={user.email}
            readOnly
            className="min-h-11 w-full rounded-xl border border-input bg-muted px-3 text-muted-foreground"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Email address cannot be changed here.
          </p>
        </div>
        <div>
          <label
            htmlFor="courier-image"
            className="mb-2 block text-sm font-semibold"
          >
            Profile image URL (optional)
          </label>
          <input
            id="courier-image"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://…"
            className="min-h-11 w-full rounded-xl border border-input bg-background px-3"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={update.isPending}
            className="min-h-11 rounded-xl bg-primary px-5 font-bold text-primary-foreground disabled:opacity-60"
          >
            {update.isPending ? "Saving…" : "Save profile"}
          </button>
          <span className="text-xs text-muted-foreground">
            Role: {user.role}
          </span>
        </div>
      </form>
    </div>
  );
}
