"use client";

import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Loader2,
  RefreshCw,
  Search,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import type { CourierApplication } from "@/api/courier.api";
import { useCourierApplications } from "@/hooks/use-courier-applications";
import { useReviewCourierApplication } from "@/hooks/use-review-courier-application";

const PAGE_SIZE = 6;

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
            <Image
              src={application.profilePhotoUrl}
              alt={`${user.name}'s profile`}
              width={64}
              height={64}
              unoptimized
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
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const applications = response?.data ?? [];
  const filteredApplications = applications.filter((application) =>
    [
      application.user.name,
      application.user.email,
      application.phone ?? "",
      application.applicationStatus,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );
  const totalPages = Math.max(
    1,
    Math.ceil(filteredApplications.length / PAGE_SIZE),
  );
  const currentPage = Math.min(page, totalPages);
  const visibleApplications = filteredApplications.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

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

      {!isLoading && !isError && applications.length > 0 && (
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full sm:max-w-md">
            <label
              htmlFor="courier-application-search"
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted-foreground"
            >
              Search applications
            </label>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="courier-application-search"
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Name, email, phone, or status..."
                className="min-h-11 w-full rounded-xl border border-input bg-background pl-9 pr-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {filteredApplications.length} of {applications.length} application
            {applications.length === 1 ? "" : "s"} · Page {currentPage} of{" "}
            {totalPages}
          </p>
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
      ) : filteredApplications.length === 0 ? (
        <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center">
          <div className="rounded-full bg-muted p-3">
            <CheckCircle2 className="size-7 text-muted-foreground" />
          </div>
          <h3 className="mt-3 font-semibold">
            {applications.length === 0
              ? "No pending applications"
              : "No matching applications"}
          </h3>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            {applications.length === 0
              ? "New courier applications will appear here after applicants register and submit their required documents."
              : "Try a different name, email, phone number, or status."}
          </p>
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setPage(1);
              }}
              className="mt-3 rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:bg-muted"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {visibleApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onReview={handleReview}
              isReviewing={reviewingUserId === application.user.id}
            />
          ))}
        </div>
      )}

      {!isLoading && !isError && filteredApplications.length > PAGE_SIZE && (
        <nav
          aria-label="Courier application pagination"
          className="flex flex-wrap items-center justify-center gap-3 border-t border-border pt-5"
        >
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setPage(Math.max(1, currentPage - 1))}
            className="inline-flex min-h-10 items-center gap-1 rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft aria-hidden="true" className="size-4" /> Previous
          </button>
          <span
            aria-live="polite"
            className="text-sm font-semibold text-muted-foreground"
          >
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
            className="inline-flex min-h-10 items-center gap-1 rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next <ChevronRight aria-hidden="true" className="size-4" />
          </button>
        </nav>
      )}
    </section>
  );
}
