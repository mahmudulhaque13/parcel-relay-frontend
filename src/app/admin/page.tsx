"use client";

import { CircleDollarSign, Package, Truck, Users } from "lucide-react";

import { useAdminDashboardStats } from "@/hooks/use-admin-dashboard-stats";

export default function AdminDashboardPage() {
  const { data, isLoading, isError } = useAdminDashboardStats();

  if (isLoading) {
    return (
      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="h-9 w-56 animate-pulse rounded bg-muted" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["users", "shipments", "payments", "couriers"].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-xl bg-muted"
              />
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="h-80 animate-pulse rounded-xl bg-muted" />
            <div className="h-80 animate-pulse rounded-xl bg-muted" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !data?.data) {
    return (
      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
            <h1 className="text-xl font-semibold">Unable to load dashboard</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Dashboard statistics could not be loaded from the server.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const stats = data.data;

  const overviewCards = [
    {
      title: "Total Users",
      value: stats.users.total,
      description: `${stats.users.customers} customers`,
      icon: Users,
    },
    {
      title: "Total Shipments",
      value: stats.shipments.total,
      description: `${stats.shipments.delivered} delivered`,
      icon: Package,
    },
    {
      title: "Total Payments",
      value: stats.payments.total,
      description: `${stats.payments.paid} paid`,
      icon: CircleDollarSign,
    },
    {
      title: "Total Couriers",
      value: stats.couriers.total,
      description: `${stats.couriers.available} available`,
      icon: Truck,
    },
  ];

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>

          <p className="mt-2 text-muted-foreground">
            Overview of users, shipments, payments, and courier availability.
          </p>
        </div>

        {/* Overview */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {overviewCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-xl border bg-card p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>

                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>

                <p className="mt-3 text-3xl font-bold">{card.value}</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {card.description}
                </p>
              </div>
            );
          })}
        </section>

        {/* Shipments */}
        <section className="rounded-xl border bg-card p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold">Shipment Overview</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Current shipment distribution by status.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatItem
              label="Pending Payment"
              value={stats.shipments.pendingPayment}
            />

            <StatItem
              label="Ready for Assignment"
              value={stats.shipments.readyForAssignment}
            />

            <StatItem label="In Transit" value={stats.shipments.inTransit} />

            <StatItem label="Delivered" value={stats.shipments.delivered} />

            <StatItem label="Cancelled" value={stats.shipments.cancelled} />

            <StatItem label="Returned" value={stats.shipments.returned} />
          </div>
        </section>

        {/* Payments + Couriers */}
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Payment Overview</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Current payment attempt distribution.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <StatItem label="Paid" value={stats.payments.paid} />

              <StatItem label="Pending" value={stats.payments.pending} />

              <StatItem label="Failed" value={stats.payments.failed} />

              <StatItem label="Refunded" value={stats.payments.refunded} />
            </div>
          </section>

          <section className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Courier Availability</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Current courier availability status.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <StatItem label="Total Couriers" value={stats.couriers.total} />

              <StatItem label="Available" value={stats.couriers.available} />

              <StatItem
                label="Unavailable"
                value={stats.couriers.unavailable}
              />
            </div>
          </section>
        </div>

        {/* User Distribution */}
        <section className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">User Distribution</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Users grouped by their current role.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatItem label="Total Users" value={stats.users.total} />

            <StatItem label="Customers" value={stats.users.customers} />

            <StatItem label="Couriers" value={stats.users.couriers} />

            <StatItem label="Admins" value={stats.users.admins} />
          </div>
        </section>
      </div>
    </main>
  );
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
