"use client";

import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

import { getPaymentSuccess } from "@/api/payment.api";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");

  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      const message = "Stripe payment session was not found.";

      toast.error(message);
      setError(message);
      setIsLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await getPaymentSuccess(sessionId);

        setPaymentStatus(response.data.paymentStatus);
      } catch (error) {
        console.error("Payment verification failed:", error);

        const message = "We could not verify your payment with Stripe.";

        toast.error(message);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void verifyPayment();
  }, [sessionId]);

  if (isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg rounded-2xl border bg-card p-8 text-center shadow-sm">
          <Loader2 className="mx-auto mb-4 size-12 animate-spin text-primary" />

          <h1 className="text-2xl font-bold">Verifying Payment</h1>

          <p className="mt-3 text-muted-foreground">
            Please wait while we verify your Stripe payment.
          </p>
        </div>
      </main>
    );
  }

  if (error || paymentStatus !== "paid") {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg rounded-2xl border bg-card p-8 text-center shadow-sm">
          <XCircle className="mx-auto mb-4 size-16 text-destructive" />

          <h1 className="text-2xl font-bold">Payment Verification Failed</h1>

          <p className="mt-3 text-muted-foreground">
            {error ?? "The Stripe payment has not been confirmed as completed."}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard/payments"
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              View Payments
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-md border px-5 py-2.5 text-sm font-medium"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border bg-card p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto mb-4 size-16 text-green-600" />

        <h1 className="text-2xl font-bold">Payment Successful</h1>

        <p className="mt-3 text-muted-foreground">
          Your Stripe payment has been successfully verified. Your shipment will
          now continue through the delivery process.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard/payments"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            View Payments
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-md border px-5 py-2.5 text-sm font-medium"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
          <Loader2 className="size-10 animate-spin text-primary" />
        </main>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
