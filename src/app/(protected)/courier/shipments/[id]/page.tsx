"use client";

import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  User,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { useCourierShipmentDetails } from "@/hooks/use-courier-shipment-details";
import { useUpdateCourierShipmentStatus } from "@/hooks/use-update-courier-shipment-status";
import {
  getAllowedCourierShipmentStatuses,
  getCourierShipmentStatusLabel,
} from "@/lib/courier-shipment-status";

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

function formatEventDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleString();
}

export default function CourierShipmentDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const shipmentId = params.id;

  const [selectedStatus, setSelectedStatus] = useState("");

  const {
    data: shipmentResponse,
    isLoading,
    isError,
  } = useCourierShipmentDetails(shipmentId);

  const updateStatusMutation = useUpdateCourierShipmentStatus(shipmentId);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
          <div className="h-36 animate-pulse rounded-2xl bg-slate-200" />
          <div className="h-48 animate-pulse rounded-2xl bg-white" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
          <div className="h-64 animate-pulse rounded-2xl bg-white" />
        </div>
      </main>
    );
  }

  if (isError || !shipmentResponse?.data) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-5xl">
          <section
            role="alert"
            className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Package className="size-6" />
            </div>

            <h1 className="mt-4 text-xl font-extrabold text-[#1D3557]">
              Unable to load shipment
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              The shipment details could not be loaded. Please try again or
              return to your assigned shipments.
            </p>

            <Link
              href="/courier"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1D3557] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#142942] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
            >
              <ArrowLeft className="size-4" />
              Back to My Shipments
            </Link>
          </section>
        </div>
      </main>
    );
  }

  const shipment = shipmentResponse.data;
  const allowedStatuses = getAllowedCourierShipmentStatuses(shipment.status);

  const handleStatusUpdate = async () => {
    if (!selectedStatus) {
      toast.error("Please select a new shipment status.");
      return;
    }

    if (!allowedStatuses.some((status) => status === selectedStatus)) {
      toast.error("This status transition is not allowed.");
      return;
    }

    try {
      await updateStatusMutation.mutateAsync(selectedStatus);

      toast.success(
        `Shipment status updated to ${getCourierShipmentStatusLabel(
          selectedStatus,
        )}.`,
      );

      setSelectedStatus("");
    } catch (error) {
      console.error("Shipment status update failed:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update shipment status.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Page header */}
        <header>
          <button
            type="button"
            onClick={() => router.push("/courier")}
            className="mb-5 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-500 transition hover:text-[#1D3557] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
          >
            <ArrowLeft className="size-4" />
            Back to My Shipments
          </button>

          <section className="relative overflow-hidden rounded-3xl bg-[#1D3557] p-6 text-white shadow-lg shadow-[#1D3557]/10 sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-white/[0.05] blur-2xl" />
            <div className="pointer-events-none absolute -bottom-24 right-1/3 size-56 rounded-full bg-[#E76F51]/20 blur-3xl" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-200">
                  Shipment details
                </p>

                <h1 className="mt-3 break-all font-mono text-2xl font-black tracking-tight sm:text-3xl">
                  {shipment.trackingNumber}
                </h1>

                <p className="mt-2 text-sm leading-6 text-blue-100/80">
                  Review shipment information and manage its permitted status
                  updates.
                </p>
              </div>

              <span
                className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold ${getStatusClasses(
                  shipment.status,
                )}`}
              >
                <span className="size-2 rounded-full bg-current" />
                {getCourierShipmentStatusLabel(shipment.status)}
              </span>
            </div>
          </section>
        </header>

        {/* Status update */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#1D3557]/[0.06] text-[#1D3557]">
              <CheckCircle2 className="size-5" />
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-[#1D3557]">
                Update shipment status
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Select the next permitted status after completing the delivery
                task.
              </p>
            </div>
          </div>

          {allowedStatuses.length > 0 ? (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <div className="min-w-0 flex-1">
                <label
                  htmlFor="next-shipment-status"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500"
                >
                  Next status
                </label>

                <select
                  id="next-shipment-status"
                  value={selectedStatus}
                  onChange={(event) => setSelectedStatus(event.target.value)}
                  disabled={updateStatusMutation.isPending}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-[#1D3557] focus:bg-white focus:ring-4 focus:ring-[#1D3557]/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="">Select new status</option>

                  {allowedStatuses.map((status) => (
                    <option key={status} value={status}>
                      {getCourierShipmentStatusLabel(status)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:self-end">
                <button
                  type="button"
                  onClick={handleStatusUpdate}
                  disabled={!selectedStatus || updateStatusMutation.isPending}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1D3557] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#142942] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {updateStatusMutation.isPending ? (
                    <>
                      <span
                        className="loading loading-ring loading-sm"
                        aria-hidden="true"
                      />
                      Updating...
                    </>
                  ) : (
                    "Update status"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-700">
                No further status updates are available.
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                This shipment has reached a final status or has no permitted
                next transition.
              </p>
            </div>
          )}
        </section>

        {/* Shipment summary */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-extrabold text-[#1D3557]">
              Shipment overview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Package, delivery charge and payment information.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#1D3557]/[0.06] text-[#1D3557]">
                <Package className="size-5" />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Package weight
              </p>
              <p className="mt-1 text-xl font-extrabold text-[#1D3557]">
                {shipment.weight}{" "}
                <span className="text-sm font-semibold text-slate-500">kg</span>
              </p>
            </article>

            <article className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-xl bg-orange-50 text-[#E76F51]">
                <span className="text-sm font-black">৳</span>
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Cash on delivery
              </p>
              <p className="mt-1 break-words text-xl font-extrabold text-[#1D3557]">
                ৳{shipment.codAmount}
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Package className="size-5" />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Delivery charge
              </p>
              <p className="mt-1 break-words text-xl font-extrabold text-[#1D3557]">
                ৳{shipment.deliveryCharge}
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <CheckCircle2 className="size-5" />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Payment status
              </p>
              <p className="mt-1 break-words text-base font-extrabold text-[#1D3557]">
                {shipment.paymentStatus}
              </p>
            </article>
          </div>
        </section>

        {/* Recipient information */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#1D3557]/[0.06] text-[#1D3557]">
              <User className="size-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-[#1D3557]">
                Recipient information
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Contact and delivery details
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Recipient name
              </p>
              <p className="mt-2 break-words text-sm font-semibold text-slate-800">
                {shipment.recipientName}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Phone number
              </p>
              <p className="mt-2 break-all text-sm font-semibold text-slate-800">
                {shipment.recipientPhone}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Delivery address
              </p>
              <p className="mt-2 break-words text-sm leading-6 text-slate-700">
                {shipment.deliveryAddress}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Package description
              </p>
              <p className="mt-2 break-words text-sm leading-6 text-slate-700">
                {shipment.packageDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Delivery route */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-orange-50 text-[#E76F51]">
              <MapPin className="size-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-[#1D3557]">Delivery route</h2>
              <p className="mt-1 text-xs text-slate-500">
                Origin to destination
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Origin
              </p>
              <p className="mt-2 break-words font-bold text-[#1D3557]">
                {shipment.originZone.name}
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                Zone code: {shipment.originZone.code}
              </p>
            </div>

            <div className="rounded-xl border border-orange-100 bg-orange-50/40 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Destination
              </p>
              <p className="mt-2 break-words font-bold text-[#1D3557]">
                {shipment.destinationZone.name}
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                Zone code: {shipment.destinationZone.code}
              </p>
            </div>
          </div>
        </section>

        {/* Shipment timeline */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#1D3557]/[0.06] text-[#1D3557]">
              <Clock3 className="size-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-[#1D3557]">
                Shipment timeline
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Recorded shipment events
              </p>
            </div>
          </div>

          {shipment.events.length === 0 ? (
            <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
              <Clock3 className="mx-auto size-7 text-slate-400" />
              <p className="mt-3 text-sm font-semibold text-slate-700">
                No shipment events yet
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Shipment activity will appear here when events are recorded.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-0">
              {shipment.events.map((event, index) => (
                <div
                  key={event.id}
                  className="relative flex gap-4 pb-7 last:pb-0"
                >
                  {index !== shipment.events.length - 1 && (
                    <div className="absolute bottom-0 left-[15px] top-8 w-px bg-slate-200" />
                  )}

                  <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-[#1D3557]/10 bg-[#1D3557]/[0.06] text-[#1D3557]">
                    <span className="size-2.5 rounded-full bg-[#E76F51]" />
                  </div>

                  <div className="min-w-0 flex-1 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <span
                        className={`inline-flex w-fit rounded-full border px-2.5 py-1 text-xs font-bold ${getStatusClasses(
                          event.status,
                        )}`}
                      >
                        {getCourierShipmentStatusLabel(event.status)}
                      </span>

                      <time className="text-xs leading-5 text-slate-500">
                        {formatEventDate(event.createdAt)}
                      </time>
                    </div>

                    {event.description && (
                      <p className="mt-3 break-words text-sm leading-6 text-slate-700">
                        {event.description}
                      </p>
                    )}

                    {event.location && (
                      <p className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-slate-500">
                        <MapPin className="mt-0.5 size-3.5 shrink-0" />
                        <span className="break-words">{event.location}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
