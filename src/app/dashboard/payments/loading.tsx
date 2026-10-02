import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto space-y-6 px-4 py-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-4 w-80" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {["payment-1", "payment-2", "payment-3"].map((id) => (
          <Skeleton key={id} className="h-24 rounded-xl" />
        ))}
      </div>

      <div className="rounded-xl border border-border p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-9 w-28" />
        </div>

        <div className="space-y-4">
          {["row-1", "row-2", "row-3", "row-4"].map((id) => (
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
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
