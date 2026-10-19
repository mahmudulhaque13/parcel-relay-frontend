export default function CourierApplicationsLoading() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="space-y-3">
          <div className="h-8 w-64 max-w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-96 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from(
            { length: 3 },
            (_, index) => `application-card-skeleton-${index}`,
          ).map((key) => (
            <div
              key={key}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="mb-4 size-10 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="mb-3 h-5 w-36 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-24 animate-pulse rounded bg-slate-100 dark:bg-slate-900" />
            </div>
          ))}
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700">
            <div className="h-6 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-10 w-full animate-pulse rounded-xl bg-slate-100 sm:w-64 dark:bg-slate-900" />
          </div>

          <div className="space-y-4 p-5">
            {Array.from(
              { length: 5 },
              (_, index) => `application-row-skeleton-${index}`,
            ).map((key) => (
              <div
                key={key}
                className="flex items-center gap-4 rounded-xl border border-slate-100 p-4 dark:border-slate-800"
              >
                <div className="size-11 shrink-0 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-40 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-56 max-w-full animate-pulse rounded bg-slate-100 dark:bg-slate-900" />
                </div>
                <div className="hidden h-9 w-24 animate-pulse rounded-lg bg-slate-100 sm:block dark:bg-slate-900" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
