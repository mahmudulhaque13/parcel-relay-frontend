"use client";

import { Search, Truck } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useCourierShipments } from "@/hooks/use-courier-shipments";
import { getShipmentStatusLabel } from "@/lib/shipment-status";

const PAGE_SIZE = 9;

const courierShipmentStatuses = [
  "ASSIGNED",
  "PICKUP_SCHEDULED",
  "PICKED_UP",
  "AT_ORIGIN_HUB",
  "IN_TRANSIT",
  "AT_DESTINATION_HUB",
  "OUT_FOR_DELIVERY",
  "DELIVERY_FAILED",
  "RETURN_INITIATED",
  "RETURN_IN_TRANSIT",
  "DELIVERED",
  "RETURNED_TO_SENDER",
  "CANCELLED",
] as const;

export default function CourierPage() {
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

  const { data, isLoading, isError } = useCourierShipments({
    page,
    limit: PAGE_SIZE,
    ...(status ? { status } : {}),
    ...(query ? { q: query } : {}),
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
                className="h-72 animate-pulse rounded-xl border bg-muted"
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
            Failed to load your assigned shipments. Please refresh and try
            again.
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
            <h1 className="text-3xl font-bold">Courier Dashboard</h1>

            <p className="mt-2 text-muted-foreground">
              Manage your assigned shipments and delivery tasks.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm">
            <Truck className="h-4 w-4" />
            {meta?.total ?? 0} assigned shipments
          </div>
        </div>

        <section className="space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Assigned Shipments</h2>

              <p className="text-sm text-muted-foreground">
                Search and filter the shipments assigned to you.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search tracking or recipient..."
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring sm:w-72"
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

                {courierShipmentStatuses.map((shipmentStatus) => (
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
              <Truck className="mx-auto h-10 w-10 text-muted-foreground" />

              <h3 className="mt-4 font-semibold">No assigned shipments</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                No shipments match your current search or status filter.
              </p>
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

                      <p className="mt-1 break-all font-semibold">
                        {shipment.trackingNumber}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs font-medium">
                      {getShipmentStatusLabel(shipment.status)}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3 text-sm">
                    <p>
                      <span className="text-muted-foreground">Recipient:</span>{" "}
                      {shipment.recipientName}
                    </p>

                    <p>
                      <span className="text-muted-foreground">Phone:</span>{" "}
                      {shipment.recipientPhone}
                    </p>

                    <p>
                      <span className="text-muted-foreground">Route:</span>{" "}
                      {shipment.originZone.name} →{" "}
                      {shipment.destinationZone.name}
                    </p>

                    <p>
                      <span className="text-muted-foreground">
                        Delivery address:
                      </span>{" "}
                      {shipment.deliveryAddress}
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <p className="text-xs text-muted-foreground">Weight</p>
                        <p className="mt-1 font-medium">{shipment.weight} kg</p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">COD</p>
                        <p className="mt-1 font-medium">
                          ৳{shipment.codAmount}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/courier/shipments/${shipment.id}`}
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
