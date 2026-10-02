import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto max-w-3xl space-y-6 px-4 py-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-80" />
      </div>

      <div className="rounded-xl border border-border p-6">
        <div className="mb-6 flex items-center gap-4">
          <Skeleton className="size-16 rounded-full" />

          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {["field-1", "field-2", "field-3", "field-4"].map((id) => (
            <div key={id} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          ))}
        </div>

        <Skeleton className="mt-6 h-10 w-32" />
      </div>
    </main>
  );
}
