"use client";

import { ArrowLeft, MapPin, Package, Truck } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
