import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto space-y-6 px-4 py-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-10 w-full sm:w-72" />
        <Skeleton className="h-10 w-28" />
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        <div className="space-y-4 p-4">
          {["row-1", "row-2", "row-3", "row-4", "row-5"].map((id) => (
            <div
              key={id}
              className="flex items-center gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
            >
              <Skeleton className="size-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-56" />
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
