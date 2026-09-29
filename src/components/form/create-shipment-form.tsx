"use client";

import { useZones } from "@/hooks/use-zones";

export default function CreateShipmentForm() {
  const { data, isLoading, isError } = useZones();

  if (isLoading) {
    return (
      <div className="space-y-4 rounded-xl border p-6">
        <div className="h-6 w-40 animate-pulse rounded bg-muted" />
        <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
        <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
      >
        Failed to load delivery zones. Please try again.
      </div>
    );
  }

  const zones = data?.data ?? [];
  const activeZones = zones.filter((zone) => zone.isActive);

  if (activeZones.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center">
        <h2 className="font-semibold">No delivery zones available</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Please try again later.
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-xl border p-6">
      <div className="mb-6">
        <p className="text-sm font-medium text-muted-foreground">Step 1 of 4</p>

        <h2 className="mt-1 text-xl font-semibold">Delivery Zones</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Select where the shipment will be picked up and delivered.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-medium">Available Zones</p>

          <div className="grid gap-3 sm:grid-cols-2">
            {activeZones.map((zone) => (
              <div key={zone.id} className="rounded-lg border p-4">
                <p className="font-medium">{zone.name}</p>

                <p className="text-sm text-muted-foreground">{zone.code}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
