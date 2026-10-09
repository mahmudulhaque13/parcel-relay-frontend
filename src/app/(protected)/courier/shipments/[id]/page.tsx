"use client";

import { ArrowLeft, MapPin, Package, User } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { useCourierShipmentDetails } from "@/hooks/use-courier-shipment-details";
import { useUpdateCourierShipmentStatus } from "@/hooks/use-update-courier-shipment-status";
import {
  getAllowedCourierShipmentStatuses,
  getCourierShipmentStatusLabel,
} from "@/lib/courier-shipment-status";

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
      <main className="mx-auto max-w-5xl space-y-6 p-6">
        <div className="h-8 w-40 animate-pulse rounded bg-muted" />
        <div className="h-32 animate-pulse rounded-xl bg-muted" />
        <div className="h-48 animate-pulse rounded-xl bg-muted" />
        <div className="h-64 animate-pulse rounded-xl bg-muted" />
      </main>
    );
  }

  if (isError || !shipmentResponse?.data) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/5 p-6"
        >
          <h1 className="text-xl font-semibold">Unable to load shipment</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            The shipment details could not be loaded.
          </p>

          <Link
            href="/courier"
            className="mt-4 inline-flex rounded-md border px-4 py-2 text-sm"
          >
            Back to My Shipments
          </Link>
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
    <main className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => router.push("/courier")}
            className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Shipments
          </button>

          <p className="text-sm text-muted-foreground">Tracking number</p>

          <h1 className="break-all text-2xl font-bold">
            {shipment.trackingNumber}
          </h1>
        </div>

        <span className="inline-flex w-fit rounded-full border px-3 py-1 text-sm font-medium">
          {getCourierShipmentStatusLabel(shipment.status)}
        </span>
      </div>

      {/* Status Update */}
      <section className="rounded-xl border bg-card p-5 sm:p-6">
        <h2 className="text-lg font-semibold">Update Shipment Status</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Select the next permitted status after completing the delivery task.
        </p>

        {allowedStatuses.length > 0 ? (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              disabled={updateStatusMutation.isPending}
              className="h-10 min-w-0 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring sm:flex-1"
            >
              <option value="">Select new status</option>

              {allowedStatuses.map((status) => (
                <option key={status} value={status}>
                  {getCourierShipmentStatusLabel(status)}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleStatusUpdate}
              disabled={!selectedStatus || updateStatusMutation.isPending}
              className="h-10 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateStatusMutation.isPending ? "Updating..." : "Update Status"}
            </button>
          </div>
        ) : (
          <div className="mt-4 rounded-lg border border-dashed p-4">
            <p className="text-sm font-medium">
              No further status updates are available.
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              This shipment has reached a final status or has no permitted next
              transition.
            </p>
          </div>
        )}
      </section>

      {/* Shipment Summary */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-5">
          <Package className="mb-3 h-5 w-5" />

          <p className="text-sm text-muted-foreground">Weight</p>

          <p className="mt-1 text-lg font-semibold">{shipment.weight} kg</p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">COD Amount</p>

          <p className="mt-1 text-lg font-semibold">৳{shipment.codAmount}</p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Delivery Charge</p>

          <p className="mt-1 text-lg font-semibold">
            ৳{shipment.deliveryCharge}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Payment</p>

          <p className="mt-1 break-words text-lg font-semibold">
            {shipment.paymentStatus}
          </p>
        </div>
      </section>

      {/* Recipient */}
      <section className="rounded-xl border bg-card p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5" />

          <h2 className="text-lg font-semibold">Recipient Information</h2>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>

            <p className="mt-1 font-medium">{shipment.recipientName}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Phone</p>

            <p className="mt-1 font-medium">{shipment.recipientPhone}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-sm text-muted-foreground">Delivery Address</p>

            <p className="mt-1 break-words font-medium">
              {shipment.deliveryAddress}
            </p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-sm text-muted-foreground">Package Description</p>

            <p className="mt-1 break-words font-medium">
              {shipment.packageDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Route */}
      <section className="rounded-xl border bg-card p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />

          <h2 className="text-lg font-semibold">Delivery Route</h2>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Origin</p>

            <p className="mt-1 font-medium">
              {shipment.originZone.name} ({shipment.originZone.code})
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Destination</p>

            <p className="mt-1 font-medium">
              {shipment.destinationZone.name} ({shipment.destinationZone.code})
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="rounded-xl border bg-card p-5 sm:p-6">
        <h2 className="text-lg font-semibold">Shipment Timeline</h2>

        {shipment.events.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No shipment events available.
          </p>
        ) : (
          <div className="mt-6 space-y-6">
            {shipment.events.map((event) => (
              <div key={event.id} className="relative border-l pl-6">
                <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-primary" />

                <p className="font-medium">
                  {getCourierShipmentStatusLabel(event.status)}
                </p>

                {event.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {event.description}
                  </p>
                )}

                {event.location && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Location: {event.location}
                  </p>
                )}

                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(event.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
