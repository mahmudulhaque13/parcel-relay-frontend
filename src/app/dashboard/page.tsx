"use client";

import { useMyShipments } from "@/hooks/use-my-shipments";

export default function DashboardPage() {
  const { data, isLoading, isError } = useMyShipments({
    page: 1,
    limit: 10,
  });

  if (isLoading) {
    return (
      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="h-9 w-64 animate-pulse rounded-md bg-muted" />

          <div className="h-5 w-96 animate-pulse rounded-md bg-muted" />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-40 animate-pulse rounded-xl border bg-muted"
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
            Failed to load your shipments. Please try again.
          </div>
        </div>
      </main>
    );
  }

  const shipments = data?.data.data ?? [];

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Customer Dashboard</h1>

          <p className="mt-2 text-muted-foreground">
            Manage and track your ParcelRelay shipments.
          </p>
        </div>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">My Shipments</h2>

              <p className="text-sm text-muted-foreground">
                Your recent shipment activity
              </p>
            </div>

            <span className="text-sm text-muted-foreground">
              {data?.data.meta.total ?? 0} total
            </span>
          </div>

          {shipments.length === 0 ? (
            <div className="rounded-xl border border-dashed p-10 text-center">
              <h3 className="font-semibold">No shipments yet</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Your shipments will appear here after you create one.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {shipments.map((shipment) => (
                <article key={shipment.id} className="rounded-xl border p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Tracking number
                      </p>

                      <p className="mt-1 font-semibold">
                        {shipment.trackingNumber}
                      </p>
                    </div>

                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                      {shipment.status}
                    </span>
                  </div>

                  <div className="mt-5 space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Recipient:</span>{" "}
                      {shipment.recipientName}
                    </p>

                    <p>
                      <span className="text-muted-foreground">Phone:</span>{" "}
                      {shipment.recipientPhone}
                    </p>

                    <p>
                      <span className="text-muted-foreground">Address:</span>{" "}
                      {shipment.deliveryAddress}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
