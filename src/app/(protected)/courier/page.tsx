"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MapPin, Package, Search, Truck } from "lucide-react";

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

function getStatusClasses(status: string) {
  switch (status) {
    case "DELIVERED":
    case "RETURNED_TO_SENDER":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "DELIVERY_FAILED":
    case "CANCELLED":
      return "border-red-200 bg-red-50 text-red-700";

    case "IN_TRANSIT":
    case "OUT_FOR_DELIVERY":
    case "RETURN_IN_TRANSIT":
      return "border-blue-200 bg-blue-50 text-blue-700";

    case "PICKED_UP":
    case "AT_ORIGIN_HUB":
    case "AT_DESTINATION_HUB":
      return "border-violet-200 bg-violet-50 text-violet-700";

    default:
      return "border-amber-200 bg-amber-50 text-amber-700";
  }
}

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
  const totalShipments = meta?.total ?? 0;

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateParams({
      q: search.trim() || null,
      page: "1",
    });
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
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
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
          <div className="h-9 w-64 max-w-full animate-pulse rounded-lg bg-slate-200" />
          <div className="h-4 w-80 max-w-full animate-pulse rounded bg-slate-200" />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-7xl">
          <div
            role="alert"
            className="flex items-start gap-3 rounded-2xl border border-red-200 bg-white p-5 shadow-sm"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Package className="size-5" />
            </div>

            <div>
              <h1 className="font-bold text-slate-900">
                Unable to load shipments
              </h1>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Failed to load your assigned shipments. Please refresh the page
                and try again.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Dashboard heading */}
        <section className="relative overflow-hidden rounded-3xl bg-[#1D3557] px-6 py-8 text-white shadow-lg shadow-[#1D3557]/10 sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full bg-white/[0.05] blur-2xl" />
          <div className="pointer-events-none absolute -bottom-28 right-1/4 size-64 rounded-full bg-[#E76F51]/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100">
                <span className="size-2 rounded-full bg-emerald-400" />
                Courier workspace
              </div>

              <h1 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
                My Shipments
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100/80 sm:text-base">
                Manage your assigned deliveries, track shipment progress, and
                review recipient information from one place.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.08] p-4 sm:min-w-48">
              <div className="flex size-12 items-center justify-center rounded-xl bg-white/10 text-[#FFB39E]">
                <Truck className="size-6" />
              </div>

              <div>
                <p className="text-2xl font-black tabular-nums">
                  {totalShipments}
                </p>
                <p className="mt-1 text-xs font-medium text-blue-100/80">
                  Assigned shipments
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Shipment list */}
        <section className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-[#1D3557] sm:text-2xl">
                Delivery assignments
              </h2>

              <p className="mt-1.5 text-sm leading-6 text-slate-500">
                Search shipments or filter by their current status.
              </p>
            </div>

            <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600">
              <Package className="size-4 text-[#E76F51]" />
              {totalShipments} total
            </div>
          </div>

          {/* Search and status filter */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="grid grid-cols-1 items-end gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
              <form
                onSubmit={handleSearchSubmit}
                className="grid min-w-0 grid-cols-1 items-end gap-3 sm:grid-cols-[minmax(0,1fr)_auto]"
              >
                <div className="min-w-0">
                  <label
                    htmlFor="courier-shipment-search"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
                  >
                    Search shipments
                  </label>

                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                    <input
                      id="courier-shipment-search"
                      type="search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search tracking or recipient..."
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1D3557] focus:bg-white focus:ring-4 focus:ring-[#1D3557]/10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1D3557] px-5 text-sm font-bold text-white transition hover:bg-[#142942] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51] sm:w-auto"
                >
                  <Search className="size-4" />
                  Search
                </button>
              </form>

              <div className="min-w-0">
                <label
                  htmlFor="shipment-status"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
                >
                  Shipment status
                </label>

                <select
                  id="shipment-status"
                  value={status}
                  onChange={handleStatusChange}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-[#1D3557] focus:bg-white focus:ring-4 focus:ring-[#1D3557]/10"
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
          </div>

          {/* Results summary */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <p className="text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-800">
                {shipments.length}
              </span>{" "}
              shipments on this page
            </p>

            <p className="font-medium text-slate-500">
              Page{" "}
              <span className="font-bold text-[#1D3557]">
                {meta?.page ?? page}
              </span>{" "}
              of {totalPages}
            </p>
          </div>

          {/* Empty state */}
          {shipments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center sm:px-10">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#1D3557]/[0.06] text-[#1D3557]">
                <Truck className="size-7" />
              </div>

              <h3 className="mt-5 text-lg font-extrabold text-[#1D3557]">
                No assigned shipments
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                No shipments match your current search or status filter. Try
                changing your search terms or selecting another status.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {shipments.map((shipment) => (
                <article
                  key={shipment.id}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-[#1D3557]/[0.06]"
                >
                  <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Tracking number
                        </p>

                        <p className="mt-2 break-all font-mono text-sm font-bold leading-6 text-[#1D3557]">
                          {shipment.trackingNumber}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold leading-4 ${getStatusClasses(
                          shipment.status,
                        )}`}
                      >
                        {getShipmentStatusLabel(shipment.status)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-slate-400">
                          Recipient
                        </p>

                        <p className="mt-1 break-words text-sm font-bold text-slate-800">
                          {shipment.recipientName}
                        </p>

                        <p className="mt-1 break-all text-sm text-slate-500">
                          {shipment.recipientPhone}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-3.5">
                        <div className="flex items-start gap-2.5">
                          <MapPin className="mt-0.5 size-4 shrink-0 text-[#E76F51]" />

                          <div className="min-w-0">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                              Delivery route
                            </p>

                            <p className="mt-1.5 break-words text-sm font-semibold leading-5 text-slate-700">
                              {shipment.originZone.name}
                              <span className="mx-2 text-[#E76F51]">→</span>
                              {shipment.destinationZone.name}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 border-t border-slate-200/80 pt-3">
                          <p className="text-xs font-semibold text-slate-400">
                            Delivery address
                          </p>

                          <p className="mt-1 break-words text-sm leading-5 text-slate-600">
                            {shipment.deliveryAddress}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-slate-100 p-3.5">
                          <p className="text-xs font-semibold text-slate-400">
                            Package weight
                          </p>

                          <p className="mt-2 text-lg font-extrabold text-[#1D3557]">
                            {shipment.weight}{" "}
                            <span className="text-xs font-semibold text-slate-500">
                              kg
                            </span>
                          </p>
                        </div>

                        <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-3.5">
                          <p className="text-xs font-semibold text-slate-500">
                            Cash on delivery
                          </p>

                          <p className="mt-2 break-words text-lg font-extrabold text-[#1D3557]">
                            ৳{shipment.codAmount}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/courier/shipments/${shipment.id}`}
                      className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#1D3557]/15 px-4 py-2.5 text-sm font-bold text-[#1D3557] transition hover:border-[#1D3557] hover:bg-[#1D3557] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
                    >
                      View shipment details
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {shipments.length > 0 && totalPages > 1 && (
            <nav
              aria-label="Shipment pagination"
              className="flex flex-wrap items-center justify-center gap-3 border-t border-slate-200 pt-6"
            >
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
                className="min-h-10 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#1D3557] hover:text-[#1D3557] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E76F51] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="rounded-xl bg-[#1D3557]/[0.06] px-4 py-2.5 text-sm font-bold tabular-nums text-[#1D3557]">
                {page} / {totalPages}
              </span>

              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}
                className="min-h-10 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#1D3557] hover:text-[#1D3557] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E76F51] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </nav>
          )}
        </section>
      </div>
    </main>
  );
}
