import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto space-y-6 px-4 py-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-border p-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-5 w-56" />
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-5 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="space-y-4 rounded-xl border border-border p-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>

      <div className="rounded-xl border border-border p-6">
        <Skeleton className="mb-5 h-6 w-48" />

        <div className="space-y-4">
          {["event-1", "event-2", "event-3", "event-4"].map((id) => (
            <div key={id} className="flex items-start gap-4">
              <Skeleton className="mt-1 size-3 rounded-full" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-64" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
