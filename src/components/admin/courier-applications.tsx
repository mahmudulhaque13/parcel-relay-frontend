"use client";

import {
  CheckCircle2,
  ExternalLink,
  FileText,
  Loader2,
  RefreshCw,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import type { CourierApplication } from "@/api/courier.api";
import { useCourierApplications } from "@/hooks/use-courier-applications";
import { useReviewCourierApplication } from "@/hooks/use-review-courier-application";

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "Something went wrong. Please try again.";
}

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsedDate);
}

function ApplicationStatus({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "danger";
}) {
  const styles = {
    default: "border-amber-500/30 bg-amber-500/10 text-amber-700",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700",
    danger: "border-destructive/30 bg-destructive/10 text-destructive",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  );
}

function ApplicationCard({
  application,
  onReview,
  isReviewing,
}: {
  application: CourierApplication;
  onReview: (
    userId: string,
    action: "APPROVE" | "REJECT",
    name: string,
  ) => Promise<void>;
  isReviewing: boolean;
}) {
  const { user } = application;

  return (
    <article className="overflow-hidden rounded-xl border bg-card">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
          {application.profilePhotoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={application.profilePhotoUrl}
              alt={`${user.name}'s profile`}
              className="size-full object-cover"
            />
          ) : (
            <UserRound className="size-7 text-muted-foreground" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <ApplicationStatus>
              {application.applicationStatus}
            </ApplicationStatus>
          </div>

          <p className="mt-1 break-all text-sm text-muted-foreground">
            {user.email}
          </p>

          <p className="mt-2 text-xs text-muted-foreground">
            Applied: {formatDate(application.createdAt)}
          </p>
        </div>
      </div>

      <div className="grid gap-3 border-t px-5 py-4 sm:grid-cols-2">
        <div>
          <p className="text-xs text-muted-foreground">Phone</p>
          <p className="mt-1 break-words text-sm font-medium">
            {application.phone || "Not provided"}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Email verification</p>
          <div className="mt-1">
            <ApplicationStatus
              variant={user.emailVerified ? "success" : "danger"}
            >
              {user.emailVerified ? "Verified" : "Not verified"}
            </ApplicationStatus>
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Account status</p>
          <p className="mt-1 text-sm font-medium">{user.status}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Application status</p>
          <p className="mt-1 text-sm font-medium">
            {application.applicationStatus}
          </p>
        </div>
      </div>

      <div className="space-y-3 border-t p-5">
        <h3 className="text-sm font-semibold">Application documents</h3>

        <div className="grid gap-3 sm:grid-cols-2">
          {application.identityDocumentUrl ? (
            <a
              href={application.identityDocumentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 items-center gap-3 rounded-lg border p-3 text-sm transition hover:bg-muted"
            >
              <FileText className="size-5 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1">
                <span className="block font-medium">Identity document</span>
                <span className="text-xs text-muted-foreground">
                  View uploaded document
                </span>
              </span>
              <ExternalLink className="size-4 shrink-0" />
            </a>
          ) : (
            <p className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
              Identity document unavailable
            </p>
          )}

          {application.profilePhotoUrl ? (
            <a
              href={application.profilePhotoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 items-center gap-3 rounded-lg border p-3 text-sm transition hover:bg-muted"
            >
              <UserRound className="size-5 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1">
                <span className="block font-medium">Profile photo</span>
                <span className="text-xs text-muted-foreground">
                  View uploaded photo
                </span>
              </span>
              <ExternalLink className="size-4 shrink-0" />
            </a>
          ) : (
            <p className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
              Profile photo unavailable
            </p>
          )}
        </div>
      </div>

      {!user.emailVerified && (
        <div className="mx-5 mb-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm text-amber-700">
          The applicant must verify their email before approval.
        </div>
      )}

      <div className="flex flex-col gap-3 border-t bg-muted/20 p-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => onReview(user.id, "REJECT", user.name)}
          disabled={isReviewing}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-destructive/30 px-4 text-sm font-medium text-destructive transition hover:bg-destructive/5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isReviewing ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <XCircle className="size-4" />
          )}
          Reject
        </button>

        <button
          type="button"
          onClick={() => onReview(user.id, "APPROVE", user.name)}
          disabled={isReviewing || !user.emailVerified}
          title={
            !user.emailVerified
              ? "The applicant must verify their email first"
              : undefined
          }
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isReviewing ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <CheckCircle2 className="size-4" />
          )}
          Approve Courier
        </button>
      </div>
    </article>
  );
}

export default function CourierApplications() {
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useCourierApplications();

  const reviewMutation = useReviewCourierApplication();
  const [reviewingUserId, setReviewingUserId] = useState<string | null>(null);

  const applications = response?.data ?? [];

  async function handleReview(
    userId: string,
    action: "APPROVE" | "REJECT",
    name: string,
  ) {
    const actionLabel = action === "APPROVE" ? "approve" : "reject";

    const confirmed = window.confirm(
      `Are you sure you want to ${actionLabel} ${name}'s courier application?`,
    );

    if (!confirmed) return;

    setReviewingUserId(userId);

    try {
      await reviewMutation.mutateAsync({
        applicationId: userId,
        action,
      });

      toast.success(
        action === "APPROVE"
          ? `${name}'s courier application has been approved.`
          : `${name}'s courier application has been rejected.`,
      );
    } catch (mutationError) {
      toast.error(getErrorMessage(mutationError));
    } finally {
      setReviewingUserId(null);
    }
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4" />
            Admin
            <span>/</span>
            Courier Applications
          </div>

          <h2 className="text-xl font-bold tracking-tight">
            Pending Courier Applications
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Review applicant details and documents before approving courier
            accounts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-md border px-4 text-sm font-medium transition hover:bg-muted disabled:opacity-50 sm:self-auto"
        >
          <RefreshCw className={`size-4 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {!isLoading && !isError && (
        <div className="text-sm text-muted-foreground">
          {applications.length} pending{" "}
          {applications.length === 1 ? "application" : "applications"}
        </div>
      )}

      {isLoading ? (
        <div className="grid gap-5 xl:grid-cols-2">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="animate-pulse space-y-4 rounded-xl border p-5"
            >
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-xl bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/2 rounded bg-muted" />
                  <div className="h-3 w-2/3 rounded bg-muted" />
                </div>
              </div>
              <div className="h-20 rounded-lg bg-muted" />
              <div className="h-10 rounded-lg bg-muted" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-xl border p-6 text-center">
          <XCircle className="size-9 text-destructive" />
          <h3 className="font-semibold">Failed to load courier applications</h3>
          <p className="max-w-lg text-sm text-muted-foreground">
            {getErrorMessage(error)}
          </p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-muted"
          >
            Try again
          </button>
        </div>
      ) : applications.length === 0 ? (
        <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center">
          <div className="rounded-full bg-muted p-3">
            <CheckCircle2 className="size-7 text-muted-foreground" />
          </div>
          <h3 className="mt-3 font-semibold">No pending applications</h3>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            New courier applications will appear here after applicants register
            and submit their required documents.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {applications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onReview={handleReview}
              isReviewing={reviewingUserId !== null}
            />
          ))}
        </div>
      )}
    </section>
  );
}
