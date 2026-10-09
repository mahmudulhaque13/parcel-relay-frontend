"use client";

import {
  ArrowLeft,
  Ban,
  CreditCard,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useParams } from "next/navigation";

import { useInitiatePayment } from "@/hooks/use-initiate-payment";
import { useCancelShipment } from "@/hooks/use-cancel-shipment";
import { useShipmentDetails } from "@/hooks/use-shipment-details";
import { useShipmentTimeline } from "@/hooks/use-shipment-timeline";
import { getShipmentStatusLabel } from "@/lib/shipment-status";

export default function ShipmentDetailsPage() {
  const params = useParams<{ id: string }>();
  const shipmentId = params.id;

  const {
    data: shipmentResponse,
    isLoading: isShipmentLoading,
    isError: isShipmentError,
  } = useShipmentDetails(shipmentId);

  const { data: timelineResponse, isLoading: isTimelineLoading } =
    useShipmentTimeline(shipmentId);

  const {
    mutate: initiatePayment,
    isPending: isPaymentInitiating,
    error: paymentError,
  } = useInitiatePayment();

  const { mutate: cancelShipmentMutation, isPending: isCancelling } =
    useCancelShipment(shipmentId);

  if (isShipmentLoading) {
    return (
      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
          <div className="h-56 animate-pulse rounded-xl bg-muted" />
          <div className="h-64 animate-pulse rounded-xl bg-muted" />
        </div>
      </main>
    );
  }

  if (isShipmentError || !shipmentResponse?.data) {
    return (
      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-5xl">
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600"
          >
            Failed to load shipment details.
          </div>

          <Link
            href="/dashboard"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  const shipment = shipmentResponse.data;
  const events = timelineResponse?.data.events ?? [];

  const isPaid = shipment.paymentStatus === "PAID";

  const canCancelShipment =
    ["PENDING_PAYMENT", "READY_FOR_ASSIGNMENT"].includes(shipment.status) &&
    shipment.paymentStatus === "PENDING";

  const handlePayment = () => {
    initiatePayment(
      { shipmentId },
      {
        onSuccess: (response) => {
          const paymentUrl = response.data.paymentUrl;

          if (!paymentUrl) {
            toast.error("Payment URL was not returned. Please try again.");
            return;
          }

          window.location.href = paymentUrl;
        },
        onError: (error) => {
          console.error("Payment initiation failed:", error);

          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to start payment. Please try again.",
          );
        },
      },
    );
  };

  const handleCancelShipment = () => {
    if (isCancelling) return;

    const confirmed = window.confirm(
      `Are you sure you want to cancel shipment ${shipment.trackingNumber}? This action cannot be undone.`,
    );

    if (!confirmed) return;

    cancelShipmentMutation(undefined, {
      onSuccess: () => {
        toast.success("Shipment cancelled successfully.");
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to cancel shipment. Please try again.",
        );
      },
    });
  };

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <section className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tracking Number</p>

              <h1 className="mt-1 text-2xl font-bold">
                {shipment.trackingNumber}
              </h1>
            </div>

            <span className="w-fit rounded-full bg-muted px-3 py-1 text-sm font-medium">
              {getShipmentStatusLabel(shipment.status)}
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Payment</p>
              <p className="mt-1 font-semibold">
                {getShipmentStatusLabel(shipment.paymentStatus)}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Delivery Charge</p>
              <p className="mt-1 font-semibold">৳{shipment.deliveryCharge}</p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Weight</p>
              <p className="mt-1 font-semibold">{shipment.weight} kg</p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">COD</p>
              <p className="mt-1 font-semibold">৳{shipment.codAmount}</p>
            </div>
          </div>

          {!isPaid && shipment.status !== "CANCELLED" && (
            <div className="mt-6 rounded-lg border bg-muted/30 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">Payment Required</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Complete the payment to continue processing this shipment.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={isPaymentInitiating || isCancelling}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CreditCard className="h-4 w-4" />
                  {isPaymentInitiating ? "Redirecting..." : "Pay Now"}
                </button>
              </div>

              {paymentError && (
                <p role="alert" className="mt-3 text-sm text-destructive">
                  Failed to start payment. Please try again.
                </p>
              )}
            </div>
          )}

          {isPaid && (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              Payment completed successfully.
            </div>
          )}

          {canCancelShipment && (
            <div className="mt-4 flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-red-700">Cancel Shipment</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  You can cancel this shipment before processing begins.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCancelShipment}
                disabled={isCancelling || isPaymentInitiating}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-300 bg-white px-5 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Ban className="h-4 w-4" />
                {isCancelling ? "Cancelling..." : "Cancel Shipment"}
              </button>
            </div>
          )}

          {shipment.status === "CANCELLED" && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              This shipment has been cancelled.
            </div>
          )}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Shipment Details</h2>
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground">Recipient</p>
                <p className="font-medium">{shipment.recipientName}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="font-medium">{shipment.recipientPhone}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Delivery Address</p>
                <p className="font-medium">{shipment.deliveryAddress}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Package Description</p>
                <p className="font-medium">{shipment.packageDescription}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Route</h2>
            </div>

            <div className="mt-5 space-y-5">
              <div>
                <p className="text-sm text-muted-foreground">Origin</p>
                <p className="font-medium">
                  {shipment.originZone.name} ({shipment.originZone.code})
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Destination</p>
                <p className="font-medium">
                  {shipment.destinationZone.name} (
                  {shipment.destinationZone.code})
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Shipment Timeline</h2>
          </div>

          {isTimelineLoading ? (
            <div className="mt-5 space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-16 animate-pulse rounded-lg bg-muted"
                />
              ))}
            </div>
          ) : events.length === 0 ? (
            <p className="mt-5 text-sm text-muted-foreground">
              No shipment events available yet.
            </p>
          ) : (
            <div className="mt-6 space-y-6">
              {events.map((event) => (
                <div key={event.id} className="relative border-l pl-6">
                  <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary" />

                  <p className="font-semibold">
                    {getShipmentStatusLabel(event.status)}
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
      </div>
    </main>
  );
}
