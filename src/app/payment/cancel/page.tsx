import type { Metadata } from "next";
import { CircleX } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Payment Cancelled | ParcelRelay", description: "Review your cancelled ParcelRelay payment and return to your shipment." };

export default function PaymentCancelPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border bg-card p-8 text-center shadow-sm">
        <CircleX className="mx-auto mb-4 h-16 w-16 text-destructive" />

        <h1 className="text-2xl font-bold">Payment Cancelled</h1>

        <p className="mt-3 text-muted-foreground">
          Your payment was cancelled or could not be completed. Your shipment
          has not been marked as paid.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/dashboard/shipments/create"
            className="inline-flex items-center justify-center rounded-md border px-5 py-2.5 text-sm font-medium"
          >
            Try Again
          </Link>
        </div>
      </div>
    </main>
  );
}
