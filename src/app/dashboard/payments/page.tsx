"use client";

import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Eye,
  Loader2,
  Receipt,
  Search,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { initiatePayment } from "@/api/payment.api";
import { useMyShipments } from "@/hooks/use-my-shipments";
import { usePaymentStatus } from "@/hooks/use-payment-status";
import {
  getShipmentStatusLabel,
  shipmentStatuses,
} from "@/lib/shipment-status";

function PaymentDetails({ shipmentId }: { shipmentId: string }) {
  const { data, isLoading, isError } = usePaymentStatus(shipmentId);

  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="mt-4 space-y-2 rounded-lg border bg-muted/30 p-4">
        <div className="h-4 w-40 animate-pulse rounded bg-muted" />
        <div className="h-4 w-56 animate-pulse rounded bg-muted" />
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div
        role="alert"
        className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600"
      >
        Failed to load payment information.
      </div>
    );
  }

  const paymentData = data.data;

  const canPay =
    paymentData.shipment.paymentStatus !== "PAID" &&
    paymentData.shipment.status === "PENDING_PAYMENT";

  const handlePayment = async () => {
    if (isPaying) return;

    setPaymentError(null);
    setIsPaying(true);

    try {
      const response = await initiatePayment({
        shipmentId,
      });

      const paymentUrl = response.data.paymentUrl;

      if (!paymentUrl) {
        throw new Error("Stripe payment URL was not returned.");
      }

      window.location.href = paymentUrl;
    } catch {
      setPaymentError("Unable to start the payment. Please try again.");
      setIsPaying(false);
    }
  };

  return (
    <div className="mt-4 space-y-4 rounded-lg border bg-muted/20 p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs text-muted-foreground">Payment Status</p>

          <p className="mt-1 font-medium">
            {paymentData.shipment.paymentStatus}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Delivery Charge</p>

          <p className="mt-1 font-medium">
            ৳{paymentData.shipment.deliveryCharge}
          </p>
        </div>
      </div>

      {canPay && (
        <div className="rounded-lg border bg-background p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">Payment Required</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Complete your Stripe payment to continue processing this
                shipment.
              </p>
            </div>

            <button
              type="button"
              onClick={handlePayment}
              disabled={isPaying}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPaying ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Redirecting...
                </>
              ) : (
                <>
                  <CreditCard className="size-4" />
                  Pay Now
                </>
              )}
            </button>
          </div>

          {paymentError && (
            <p role="alert" className="mt-3 text-sm text-destructive">
              {paymentError}
            </p>
          )}
        </div>
      )}

      {paymentData.payments.length === 0 ? (
        <div className="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">
          No payment transaction found for this shipment.
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />

            <h3 className="font-medium">Payment Transactions</h3>
          </div>

          {paymentData.payments.map((payment) => (
            <div
              key={payment.id}
              className="rounded-md border bg-background p-4"
            >
              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Transaction ID
                  </p>

                  <p className="mt-1 break-all font-medium">
                    {payment.transactionId}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Amount</p>

                  <p className="mt-1 font-medium">৳{payment.amount}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Method</p>

                  <p className="mt-1 font-medium">{payment.method}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Status</p>

                  <p className="mt-1 font-medium">{payment.status}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Created</p>

                  <p className="mt-1">
                    {new Date(payment.createdAt).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Paid At</p>

                  <p className="mt-1">
                    {payment.paidAt
                      ? new Date(payment.paidAt).toLocaleString()
                      : "Not paid yet"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PaymentsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const status = searchParams.get("status") ?? "";
  const query = searchParams.get("q") ?? "";
  const [search, setSearch] = useState(query);
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setSearch(query);
  }, [query]);

  const previousFilters = useRef({ page, status, query });

  useEffect(() => {
    const previous = previousFilters.current;

    if (
      previous.page !== page ||
      previous.status !== status ||
      previous.query !== query
    ) {
      setSelectedShipmentId(null);
    }

    previousFilters.current = { page, status, query };
  }, [page, status, query]);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useMyShipments({
      page,
      limit: 10,
      sortBy: "createdAt",
      sortOrder: "desc",
      ...(query ? { q: query } : {}),
      ...(status ? { status } : {}),
    });

  const shipments = data?.data.data ?? [];
  const meta = data?.data.meta;
  const totalPages = Math.max(1, meta?.totalPage ?? 1);

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    const nextQuery = params.toString();
    router.push(nextQuery ? `${pathname}?${nextQuery}` : pathname);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateParams({ q: search.trim() || null, page: null });
  }

  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    updateParams({ status: event.target.value || null, page: null });
  }

  function handlePageChange(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages || isFetching) return;
    updateParams({ page: nextPage === 1 ? null : String(nextPage) });
  }

  if (isLoading) {
    return (
      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="h-9 w-48 animate-pulse rounded-md bg-muted" />
          <div className="h-5 w-96 max-w-full animate-pulse rounded-md bg-muted" />
          <div className="h-12 animate-pulse rounded-xl border bg-muted" />
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-36 animate-pulse rounded-xl border bg-muted"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-7xl">
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600"
          >
            <p>
              Failed to load your payment records.{" "}
              {error instanceof Error ? error.message : "Please try again."}
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-3 rounded-md border border-red-300 px-3 py-2 font-semibold hover:bg-red-100"
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="mt-2 text-muted-foreground">
            Search and filter shipment payment status, then open transaction
            details.
          </p>
        </div>

        <section
          aria-label="Payment filters"
          className="grid gap-4 rounded-xl border border-border bg-card p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_260px]"
        >
          <form
            onSubmit={handleSearchSubmit}
            className="flex min-w-0 flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="payment-shipment-search" className="sr-only">
              Search by tracking number, recipient, or address
            </label>
            <div className="relative min-w-0 flex-1">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="payment-shipment-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Tracking number or recipient..."
                className="min-h-11 w-full rounded-xl border border-input bg-background pl-9 pr-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              <Search aria-hidden="true" className="size-4" /> Search
            </button>
          </form>
          <div>
            <label
              htmlFor="payment-status-filter"
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-muted-foreground"
            >
              Shipment status
            </label>
            <select
              id="payment-status-filter"
              value={status}
              onChange={handleStatusChange}
              className="min-h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">All statuses</option>
              {shipmentStatuses.map((item) => (
                <option key={item} value={item}>
                  {getShipmentStatusLabel(item)}
                </option>
              ))}
            </select>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>
            {meta?.total ?? shipments.length} shipment
            {(meta?.total ?? shipments.length) === 1 ? "" : "s"} found
          </p>
          <p>
            Page {meta?.page ?? page} of {totalPages}
          </p>
        </div>

        {shipments.length === 0 ? (
          <div className="rounded-xl border border-dashed p-10 text-center">
            <CreditCard className="mx-auto h-10 w-10 text-muted-foreground" />
            <h2 className="mt-4 font-semibold">
              {query || status
                ? "No matching payment records"
                : "No shipments found"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {query || status
                ? "Try changing the search term or status filter."
                : "Create a shipment to see its payment information here."}
            </p>
            {!query && !status && (
              <Link
                href="/dashboard/shipments/create"
                className="mt-5 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Create Shipment
              </Link>
            )}
          </div>
        ) : (
          <section aria-label="Shipment payments" className="space-y-4">
            {shipments.map((shipment) => {
              const isSelected = selectedShipmentId === shipment.id;
              return (
                <article
                  key={shipment.id}
                  className="rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Tracking Number
                        </p>
                        <p className="break-all font-semibold">
                          {shipment.trackingNumber}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="rounded-full bg-muted px-3 py-1">
                          {getShipmentStatusLabel(shipment.status)}
                        </span>
                        <span className="rounded-full bg-muted px-3 py-1">
                          Delivery: ৳{shipment.deliveryCharge}
                        </span>
                        <span className="rounded-full bg-muted px-3 py-1">
                          COD: ৳{shipment.codAmount}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-expanded={isSelected}
                      onClick={() =>
                        setSelectedShipmentId(isSelected ? null : shipment.id)
                      }
                      className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
                    >
                      <Eye aria-hidden="true" className="size-4" />
                      {isSelected ? "Hide Payment" : "View Payment"}
                    </button>
                  </div>
                  {isSelected && <PaymentDetails shipmentId={shipment.id} />}
                </article>
              );
            })}
          </section>
        )}

        {shipments.length > 0 && totalPages > 1 && (
          <nav
            aria-label="Payment shipment pagination"
            className="flex flex-wrap items-center justify-center gap-3 border-t border-border pt-6"
          >
            <button
              type="button"
              disabled={page <= 1 || isFetching}
              onClick={() => handlePageChange(page - 1)}
              className="inline-flex min-h-10 items-center gap-1 rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft aria-hidden="true" className="size-4" /> Previous
            </button>
            <span className="rounded-xl bg-muted px-4 py-2.5 text-sm font-bold tabular-nums">
              {meta?.page ?? page} / {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages || isFetching}
              onClick={() => handlePageChange(page + 1)}
              className="inline-flex min-h-10 items-center gap-1 rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next <ChevronRight aria-hidden="true" className="size-4" />
            </button>
          </nav>
        )}
      </div>
    </main>
  );
}
