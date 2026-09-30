"use client";

import { CreditCard, Eye, Receipt } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useMyShipments } from "@/hooks/use-my-shipments";
import { usePaymentStatus } from "@/hooks/use-payment-status";
import { getShipmentStatusLabel } from "@/lib/shipment-status";

function PaymentDetails({ shipmentId }: { shipmentId: string }) {
  const { data, isLoading, isError } = usePaymentStatus(shipmentId);

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
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(
    null,
  );

  const { data, isLoading, isError } = useMyShipments({
    page: 1,
    limit: 50,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const shipments = data?.data.data ?? [];

  if (isLoading) {
    return (
      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="h-9 w-48 animate-pulse rounded-md bg-muted" />
          <div className="h-5 w-96 animate-pulse rounded-md bg-muted" />

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
            Failed to load your payment records. Please refresh and try again.
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>

          <p className="mt-2 text-muted-foreground">
            View payment status and transaction details for your shipments.
          </p>
        </div>

        {shipments.length === 0 ? (
          <div className="rounded-xl border border-dashed p-10 text-center">
            <CreditCard className="mx-auto h-10 w-10 text-muted-foreground" />

            <h2 className="mt-4 font-semibold">No shipments found</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Create a shipment to see its payment information here.
            </p>

            <Link
              href="/dashboard/shipments/create"
              className="mt-5 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Create Shipment
            </Link>
          </div>
        ) : (
          <section className="space-y-4">
            {shipments.map((shipment) => {
              const isSelected = selectedShipmentId === shipment.id;

              return (
                <article
                  key={shipment.id}
                  className="rounded-xl border bg-card p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Tracking Number
                        </p>

                        <p className="font-semibold">
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
                      onClick={() =>
                        setSelectedShipmentId(isSelected ? null : shipment.id)
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      <Eye className="h-4 w-4" />

                      {isSelected ? "Hide Payment" : "View Payment"}
                    </button>
                  </div>

                  {isSelected && <PaymentDetails shipmentId={shipment.id} />}
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}
