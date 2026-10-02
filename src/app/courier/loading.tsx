import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto space-y-6 px-4 py-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-80" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {["stat-1", "stat-2", "stat-3", "stat-4"].map((id) => (
          <Skeleton key={id} className="h-28 rounded-xl" />
        ))}
      </div>

      <div className="rounded-xl border border-border p-6">
        <Skeleton className="mb-5 h-6 w-44" />

        <div className="space-y-4">
          {["shipment-1", "shipment-2", "shipment-3", "shipment-4"].map(
            (id) => (
              <div
                key={id}
                className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center"
              >
                <Skeleton className="size-10 rounded-lg" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>

                <Skeleton className="h-8 w-24" />
              </div>
            ),
          )}
        </div>
      </div>
    </main>
  );
}
