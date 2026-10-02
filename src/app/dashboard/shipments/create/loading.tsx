import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto max-w-4xl space-y-6 px-4 py-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="rounded-xl border border-border p-6">
        <Skeleton className="mb-6 h-6 w-48" />

        <div className="grid gap-5 sm:grid-cols-2">
          {[
            "field-1",
            "field-2",
            "field-3",
            "field-4",
            "field-5",
            "field-6",
          ].map((id) => (
            <div key={id} className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>

        <div className="mt-6 flex justify-end">
          <Skeleton className="h-10 w-36" />
        </div>
      </div>
    </main>
  );
}
