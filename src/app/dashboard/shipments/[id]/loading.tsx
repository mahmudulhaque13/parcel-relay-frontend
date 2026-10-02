import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto space-y-6 px-4 py-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-border p-6">
          <Skeleton className="h-6 w-44" />

          <div className="space-y-3">
            {["detail-1", "detail-2", "detail-3", "detail-4", "detail-5"].map(
              (id) => (
                <div
                  key={id}
                  className="flex items-center justify-between gap-4"
                >
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-40" />
                </div>
              ),
            )}
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-border p-6">
          <Skeleton className="h-6 w-40" />

          <div className="space-y-5">
            {["event-1", "event-2", "event-3", "event-4"].map((id) => (
              <div key={id} className="flex items-start gap-4">
                <Skeleton className="mt-1 size-3 rounded-full" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-44" />
                  <Skeleton className="h-3 w-64" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border p-6">
        <Skeleton className="mb-4 h-6 w-40" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>
    </main>
  );
}
