"use client";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BarChart3,
  Package,
  Search,
  Weight,
} from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useMemo, useState } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { AdminShipmentReportQuery } from "@/api/admin.api";

import { useAdminShipmentReports } from "@/hooks/use-admin-shipment-reports";

import { useZones } from "@/hooks/use-zones";

const shipmentStatuses = [
  "PENDING_PAYMENT",

  "READY_FOR_ASSIGNMENT",

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

function getStatusLabel(status: string) {
  return status

    .toLowerCase()

    .split("_")

    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))

    .join(" ");
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",

    currency: "BDT",

    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-BD").format(value);
}

export default function AdminReportsPage() {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const querySearch = searchParams.get("q") ?? "";

  const status = searchParams.get("status") ?? "";

  const originZoneId = searchParams.get("originZoneId") ?? "";

  const destinationZoneId = searchParams.get("destinationZoneId") ?? "";

  const sortByParam = searchParams.get("sortBy");

  const sortBy: AdminShipmentReportQuery["sortBy"] =
    sortByParam === "updatedAt" || sortByParam === "deliveryCharge"
      ? sortByParam
      : "createdAt";

  const sortOrderParam = searchParams.get("sortOrder");

  const sortOrder: AdminShipmentReportQuery["sortOrder"] =
    sortOrderParam === "asc" ? "asc" : "desc";

  const pageParam = Number(searchParams.get("page") ?? "1");

  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  const [search, setSearch] = useState(querySearch);

  useEffect(() => {
    setSearch(querySearch);
  }, [querySearch]);

  const { data: zonesResponse, isLoading: isZonesLoading } = useZones();

  const zones = zonesResponse?.data ?? [];

  const query = useMemo<AdminShipmentReportQuery>(
    () => ({
      page,

      limit: 10,

      q: querySearch || undefined,

      status: status || undefined,

      originZoneId: originZoneId || undefined,

      destinationZoneId: destinationZoneId || undefined,

      sortBy,

      sortOrder,
    }),

    [
      page,

      querySearch,

      status,

      originZoneId,

      destinationZoneId,

      sortBy,

      sortOrder,
    ],
  );

  const {
    data: reportsResponse,

    isLoading,

    isError,

    error,
  } = useAdminShipmentReports(query);

  const reportData = reportsResponse?.data;

  const totalPages = reportData?.meta.totalPage ?? 1;

  const totalResults = reportData?.meta.total ?? 0;

  /*

   * Chart data comes directly from the current API result.

   *

   * Important:

   * The backend report endpoint is paginated, so these charts

   * represent the currently loaded page of shipments.

   * The summary cards above still represent the full filtered dataset.

   */

  const chartData = useMemo(
    () =>
      (reportData?.data ?? []).map((shipment) => ({
        trackingNumber: shipment.trackingNumber,

        shortTrackingNumber: shipment.trackingNumber.slice(-8),

        deliveryCharge: shipment.deliveryCharge,

        codAmount: shipment.codAmount,

        weight: shipment.weight,
      })),

    [reportData?.data],
  );

  function updateUrl(updates: {
    q?: string;

    status?: string;

    originZoneId?: string;

    destinationZoneId?: string;

    sortBy?: AdminShipmentReportQuery["sortBy"];

    sortOrder?: AdminShipmentReportQuery["sortOrder"];

    page?: number;
  }) {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.q !== undefined) {
      if (updates.q) {
        params.set("q", updates.q);
      } else {
        params.delete("q");
      }
    }

    if (updates.status !== undefined) {
      if (updates.status) {
        params.set("status", updates.status);
      } else {
        params.delete("status");
      }
    }

    if (updates.originZoneId !== undefined) {
      if (updates.originZoneId) {
        params.set("originZoneId", updates.originZoneId);
      } else {
        params.delete("originZoneId");
      }
    }

    if (updates.destinationZoneId !== undefined) {
      if (updates.destinationZoneId) {
        params.set("destinationZoneId", updates.destinationZoneId);
      } else {
        params.delete("destinationZoneId");
      }
    }

    if (updates.sortBy !== undefined) {
      params.set("sortBy", updates.sortBy);
    }

    if (updates.sortOrder !== undefined) {
      params.set("sortOrder", updates.sortOrder);
    }

    if (updates.page !== undefined) {
      params.set("page", String(updates.page));
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    updateUrl({
      q: search.trim(),

      page: 1,
    });
  }

  function handleStatusChange(value: string) {
    updateUrl({
      status: value,

      page: 1,
    });
  }

  function handleOriginZoneChange(value: string) {
    updateUrl({
      originZoneId: value,

      page: 1,
    });
  }

  function handleDestinationZoneChange(value: string) {
    updateUrl({
      destinationZoneId: value,

      page: 1,
    });
  }

  function handleSortByChange(value: AdminShipmentReportQuery["sortBy"]) {
    if (!value) return;

    updateUrl({
      sortBy: value,

      page: 1,
    });
  }

  function toggleSortOrder() {
    updateUrl({
      sortOrder: sortOrder === "asc" ? "desc" : "asc",

      page: 1,
    });
  }

  function clearFilters() {
    const params = new URLSearchParams();

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  }

  function goToPage(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages) {
      return;
    }

    updateUrl({
      page: nextPage,
    });
  }

  const hasActiveFilters =
    Boolean(querySearch) ||
    Boolean(status) ||
    Boolean(originZoneId) ||
    Boolean(destinationZoneId) ||
    sortBy !== "createdAt" ||
    sortOrder !== "desc";

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}

      <div>
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <BarChart3 className="size-4" />

          <span>Admin</span>

          <span>/</span>

          <span>Reports</span>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-[#1D3557]">
          Shipment Reports
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Analyze shipment activity, delivery charges, COD amounts and total
          shipment weight.
        </p>
      </div>

      {/* Summary */}

      {isLoading ? (
        <SummarySkeleton />
      ) : isError ? (
        <ErrorState
          message={
            error instanceof Error
              ? error.message
              : "Failed to load shipment reports."
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Shipments"
            value={formatNumber(reportData?.summary.totalShipments ?? 0)}
            icon={<Package className="size-5" />}
          />

          <SummaryCard
            title="Delivery Charge"
            value={formatCurrency(reportData?.summary.totalDeliveryCharge ?? 0)}
            icon={<BarChart3 className="size-5" />}
          />

          <SummaryCard
            title="Total COD"
            value={formatCurrency(reportData?.summary.totalCodAmount ?? 0)}
            icon={<span className="text-lg font-bold">৳</span>}
          />

          <SummaryCard
            title="Total Weight"
            value={`${formatNumber(reportData?.summary.totalWeight ?? 0)} kg`}
            icon={<Weight className="size-5" />}
          />
        </div>
      )}

      {/* Filters */}

      <div className="rounded-xl border bg-card p-4">
        <div className="grid gap-4 xl:grid-cols-3">
          {/* Search */}

          <form onSubmit={handleSearch}>
            <label
              htmlFor="report-search"
              className="mb-2 block text-sm font-medium"
            >
              Search
            </label>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  id="report-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Tracking, recipient or phone..."
                  className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="inline-flex h-10 items-center gap-2 rounded-md border bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                <Search className="size-4" />
                Search
              </button>
            </div>
          </form>

          {/* Status */}

          <div>
            <label
              htmlFor="report-status"
              className="mb-2 block text-sm font-medium"
            >
              Status
            </label>

            <select
              id="report-status"
              value={status}
              onChange={(event) => handleStatusChange(event.target.value)}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
            >
              <option value="">All Statuses</option>

              {shipmentStatuses.map((item) => (
                <option key={item} value={item}>
                  {getStatusLabel(item)}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}

          <div>
            <label
              htmlFor="report-sort"
              className="mb-2 block text-sm font-medium"
            >
              Sort By
            </label>

            <div className="flex gap-2">
              <select
                id="report-sort"
                value={sortBy}
                onChange={(event) =>
                  handleSortByChange(
                    event.target.value as AdminShipmentReportQuery["sortBy"],
                  )
                }
                className="h-10 flex-1 rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
              >
                <option value="createdAt">Created Date</option>

                <option value="updatedAt">Updated Date</option>

                <option value="deliveryCharge">Delivery Charge</option>
              </select>

              <button
                type="button"
                onClick={toggleSortOrder}
                className="inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-medium transition hover:bg-muted"
                title={sortOrder === "asc" ? "Ascending" : "Descending"}
              >
                {sortOrder === "asc" ? (
                  <ArrowUp className="size-4" />
                ) : (
                  <ArrowDown className="size-4" />
                )}

                <span className="hidden sm:inline">
                  {sortOrder === "asc" ? "Ascending" : "Descending"}
                </span>
              </button>
            </div>
          </div>

          {/* Origin Zone */}

          <div>
            <label
              htmlFor="origin-zone"
              className="mb-2 block text-sm font-medium"
            >
              Origin Zone
            </label>

            <select
              id="origin-zone"
              value={originZoneId}
              onChange={(event) => handleOriginZoneChange(event.target.value)}
              disabled={isZonesLoading}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="">All Origin Zones</option>

              {zones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.name}

                  {zone.code ? ` (${zone.code})` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Destination Zone */}

          <div>
            <label
              htmlFor="destination-zone"
              className="mb-2 block text-sm font-medium"
            >
              Destination Zone
            </label>

            <select
              id="destination-zone"
              value={destinationZoneId}
              onChange={(event) =>
                handleDestinationZoneChange(event.target.value)
              }
              disabled={isZonesLoading}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="">All Destination Zones</option>

              {zones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.name}

                  {zone.code ? ` (${zone.code})` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Clear */}

          <div className="flex items-end">
            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="h-10 w-full rounded-md border px-4 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Active Filters */}

        {hasActiveFilters ? (
          <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
            {querySearch ? (
              <FilterChip label={`Search: ${querySearch}`} />
            ) : null}

            {status ? (
              <FilterChip label={`Status: ${getStatusLabel(status)}`} />
            ) : null}

            {originZoneId ? (
              <FilterChip
                label={`Origin: ${
                  zones.find((zone) => zone.id === originZoneId)?.name ??
                  "Selected"
                }`}
              />
            ) : null}

            {destinationZoneId ? (
              <FilterChip
                label={`Destination: ${
                  zones.find((zone) => zone.id === destinationZoneId)?.name ??
                  "Selected"
                }`}
              />
            ) : null}

            {sortBy !== "createdAt" ? (
              <FilterChip
                label={`Sort: ${
                  sortBy === "updatedAt" ? "Updated Date" : "Delivery Charge"
                }`}
              />
            ) : null}

            {sortOrder !== "desc" ? <FilterChip label="Ascending" /> : null}
          </div>
        ) : null}
      </div>

      {/* Analytics */}

      {!isLoading && !isError && chartData.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Financial Chart */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-5">
              <h2 className="text-lg font-semibold">
                Shipment Financial Overview
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Delivery charge and COD amount for the current filtered results.
              </p>
            </div>

            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 10,

                    right: 10,

                    left: 0,

                    bottom: 10,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />

                  <XAxis
                    dataKey="shortTrackingNumber"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />

                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="deliveryCharge"
                    name="Delivery Charge"
                    radius={[4, 4, 0, 0]}
                  />

                  <Bar
                    dataKey="codAmount"
                    name="COD Amount"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weight Chart */}

          <div className="rounded-xl border bg-card p-5">
            <div className="mb-5">
              <h2 className="text-lg font-semibold">Shipment Weight</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Weight distribution for the current filtered results.
              </p>
            </div>

            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 10,

                    right: 10,

                    left: 0,

                    bottom: 10,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />

                  <XAxis
                    dataKey="shortTrackingNumber"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />

                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    unit=" kg"
                  />

                  <Tooltip />

                  <Bar
                    dataKey="weight"
                    name="Weight (kg)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : null}

      {/* Report Table */}

      <div className="rounded-xl border bg-card">
        {isLoading ? (
          <TableSkeleton />
        ) : isError ? (
          <ErrorState
            message={
              error instanceof Error
                ? error.message
                : "Failed to load shipment reports."
            }
          />
        ) : !reportData?.data.length ? (
          <EmptyState />
        ) : (
          <>
            {/* Desktop Table */}

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30 text-left text-sm">
                    <th className="px-5 py-4 font-medium">Shipment</th>

                    <th className="px-5 py-4 font-medium">Customer</th>

                    <th className="px-5 py-4 font-medium">Route</th>

                    <th className="px-5 py-4 font-medium">Status</th>

                    <th className="px-5 py-4 font-medium">Payment</th>

                    <th className="px-5 py-4 font-medium">Weight</th>

                    <th className="px-5 py-4 text-right font-medium">Charge</th>
                  </tr>
                </thead>

                <tbody>
                  {reportData.data.map((shipment) => (
                    <tr key={shipment.id} className="border-b last:border-0">
                      <td className="px-5 py-4">
                        <p className="font-medium">{shipment.trackingNumber}</p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {shipment.recipientName}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium">
                          {shipment.customer.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {shipment.customer.email}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm">{shipment.originZone.name}</p>

                        <p className="text-xs text-muted-foreground">
                          → {shipment.destinationZone.name}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full border px-2.5 py-1 text-xs font-medium">
                          {getStatusLabel(shipment.status)}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm">
                        {getStatusLabel(shipment.paymentStatus)}
                      </td>

                      <td className="px-5 py-4 text-sm">
                        {shipment.weight} kg
                      </td>

                      <td className="px-5 py-4 text-right text-sm font-medium">
                        {formatCurrency(shipment.deliveryCharge)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}

            <div className="divide-y md:hidden">
              {reportData.data.map((shipment) => (
                <div key={shipment.id} className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{shipment.trackingNumber}</p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {shipment.recipientName}
                      </p>
                    </div>

                    <span className="rounded-full border px-2.5 py-1 text-xs font-medium">
                      {getStatusLabel(shipment.status)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Customer</p>

                      <p className="mt-1 font-medium">
                        {shipment.customer.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Payment</p>

                      <p className="mt-1 font-medium">
                        {getStatusLabel(shipment.paymentStatus)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Route</p>

                      <p className="mt-1">{shipment.originZone.name}</p>

                      <p className="text-xs text-muted-foreground">
                        → {shipment.destinationZone.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Weight</p>

                      <p className="mt-1 font-medium">{shipment.weight} kg</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Delivery Charge
                      </p>

                      <p className="mt-1 font-medium">
                        {formatCurrency(shipment.deliveryCharge)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">COD</p>

                      <p className="mt-1 font-medium">
                        {formatCurrency(shipment.codAmount)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}

            <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {reportData.data.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {totalResults}
                </span>{" "}
                shipments
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={page <= 1}
                  className="inline-flex h-9 items-center gap-1 rounded-md border px-3 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ArrowLeft className="size-4" />

                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="min-w-24 text-center text-sm font-medium">
                  Page {page} of {totalPages}
                </div>

                <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={page >= totalPages}
                  className="inline-flex h-9 items-center gap-1 rounded-md border px-3 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="hidden sm:inline">Next</span>

                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/* Components                                                                  */

/* -------------------------------------------------------------------------- */

function SummaryCard({
  title,

  value,

  icon,
}: {
  title: string;

  value: string;

  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{title}</p>

        <div className="rounded-xl bg-[#1D3557]/10 p-2 text-[#1D3557]">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}

function FilterChip({ label }: { label: string }) {
  return (
    <span className="rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium">
      {label}
    </span>
  );
}

function SummarySkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {["shipments", "charge", "cod", "weight"].map((item) => (
        <div
          key={item}
          className="h-32 animate-pulse rounded-xl border bg-muted/40"
        />
      ))}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-4 p-5">
      {["row-1", "row-2", "row-3", "row-4", "row-5"].map((item) => (
        <div key={item} className="h-12 animate-pulse rounded-md bg-muted/50" />
      ))}
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center p-6 text-center">
      <h2 className="font-semibold">Failed to load reports</h2>

      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center p-6 text-center">
      <h2 className="font-semibold">No shipment reports found</h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Try changing your search or filters.
      </p>
    </div>
  );
}
