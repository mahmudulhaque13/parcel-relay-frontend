"use client";

import { Search, Truck } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useMyShipments } from "@/hooks/use-my-shipments";
import {
  getShipmentStatusLabel,
  shipmentStatuses,
} from "@/lib/shipment-status";

const PAGE_SIZE = 9;

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const status = searchParams.get("status") ?? "";
  const query = searchParams.get("q") ?? "";

  const [search, setSearch] = useState(query);

  useEffect(() => {
    setSearch(query);
  }, [query]);

  const { data, isLoading, isError } = useMyShipments({
    page,
    limit: PAGE_SIZE,
    ...(status ? { status } : {}),
    ...(query ? { q: query } : {}),
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const shipments = data?.data.data ?? [];
  const meta = data?.data.meta;
  const totalPages = meta?.totalPage ?? 1;

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateParams({
      q: search.trim() || null,
      page: "1",
    });
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateParams({
      status: event.target.value || null,
      page: "1",
    });
  };

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) {
      return;
    }

    updateParams({
      page: String(nextPage),
    });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="h-9 w-64 animate-pulse rounded-md bg-muted" />
          <div className="h-5 w-96 animate-pulse rounded-md bg-muted" />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-52 animate-pulse rounded-xl border bg-muted"
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
            Failed to load your shipments. Please refresh and try again.
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Customer Dashboard</h1>

            <p className="mt-2 text-muted-foreground">
              Manage and track your ParcelRelay shipments.
            </p>
          </div>

          <Link
            href="/dashboard/shipments/create"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
          >
            <Truck className="h-4 w-4" />
            Create Shipment
          </Link>
        </div>

        <section className="space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold">My Shipments</h2>

              <p className="text-sm text-muted-foreground">
                Search, filter and track your shipments.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search tracking number..."
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring sm:w-64"
                />

                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border px-4 text-sm font-medium"
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </form>

              <select
                value={status}
                onChange={handleStatusChange}
                className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">All statuses</option>

                {shipmentStatuses.map((shipmentStatus) => (
                  <option key={shipmentStatus} value={shipmentStatus}>
                    {getShipmentStatusLabel(shipmentStatus)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{meta?.total ?? 0} total shipments</span>

            <span>
              Page {meta?.page ?? page} of {totalPages}
            </span>
          </div>

          {shipments.length === 0 ? (
            <div className="rounded-xl border border-dashed p-10 text-center">
              <h3 className="font-semibold">No shipments found</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Try changing your search or status filter.
              </p>

              <Link
                href="/dashboard/shipments/create"
                className="mt-5 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Create Shipment
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {shipments.map((shipment) => (
                <article
                  key={shipment.id}
                  className="rounded-xl border bg-card p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Tracking number
                      </p>

                      <p className="mt-1 font-semibold">
                        {shipment.trackingNumber}
                      </p>
                    </div>

                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                      {getShipmentStatusLabel(shipment.status)}
                    </span>
                  </div>

                  <div className="mt-5 space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Recipient:</span>{" "}
                      {shipment.recipientName}
                    </p>

                    <p>
                      <span className="text-muted-foreground">
                        Delivery charge:
                      </span>{" "}
                      ৳{shipment.deliveryCharge}
                    </p>

                    <p>
                      <span className="text-muted-foreground">COD:</span> ৳
                      {shipment.codAmount}
                    </p>

                    <p>
                      <span className="text-muted-foreground">Created:</span>{" "}
                      {new Date(shipment.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <Link
                    href={`/dashboard/shipments/${shipment.id}`}
                    className="mt-5 inline-flex w-full items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    View Shipment Details
                  </Link>
                </article>
              ))}
            </div>
          )}

          {shipments.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
                className="rounded-md border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-sm text-muted-foreground">
                {page} / {totalPages}
              </span>

              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}
                className="rounded-md border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
