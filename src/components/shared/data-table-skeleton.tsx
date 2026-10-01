interface DataTableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function DataTableSkeleton({
  rows = 5,
  columns = 4,
}: DataTableSkeletonProps) {
  const rowItems = Array.from({ length: rows }, (_, index) => ({
    id: `skeleton-row-${index}`,
  }));

  const columnItems = Array.from({ length: columns }, (_, index) => ({
    id: `skeleton-column-${index}`,
  }));

  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="space-y-0">
        {rowItems.map((row) => (
          <div
            key={row.id}
            className="grid gap-4 border-b p-4 last:border-b-0"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {columnItems.map((column) => (
              <div
                key={`${row.id}-${column.id}`}
                className="h-5 animate-pulse rounded bg-muted"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
