"use client";

import {
  Activity,
  CircleDollarSign,
  Package,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";

import { useAdminDashboardStats } from "@/hooks/use-admin-dashboard-stats";

export default function AdminDashboardPage() {
  const { data, isLoading, isError } = useAdminDashboardStats();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
          <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200" />
          <div className="h-20 animate-pulse rounded-2xl bg-slate-200" />
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {["users", "shipments", "payments", "couriers"].map((item) => (
              <div
                key={item}
                className="h-36 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="h-64 animate-pulse rounded-2xl bg-white" />
            <div className="h-64 animate-pulse rounded-2xl bg-white" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !data?.data) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-red-50 p-3 text-red-600">
                <Activity className="size-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">
                  Unable to load dashboard
                </h1>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Dashboard statistics could not be loaded from the server.
                  Please try refreshing the page.
                </p>
              </div>
            </div>
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
      accent: "bg-blue-50 text-[#1D3557]",
    },
    {
      title: "Total Shipments",
      value: stats.shipments.total,
      description: `${stats.shipments.delivered} delivered`,
      icon: Package,
      accent: "bg-orange-50 text-[#E76F51]",
    },
    {
      title: "Total Payments",
      value: stats.payments.total,
      description: `${stats.payments.paid} paid`,
      icon: CircleDollarSign,
      accent: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Total Couriers",
      value: stats.couriers.total,
      description: `${stats.couriers.available} available`,
      icon: Truck,
      accent: "bg-violet-50 text-violet-700",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Page heading */}
        <section className="flex flex-col gap-5 rounded-2xl bg-[#1D3557] p-6 text-white shadow-sm sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90">
              <ShieldCheck className="size-4" />
              Administration
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
              Monitor users, shipment operations, payments and courier
              availability from one place.
            </p>
          </div>

          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#F4A261] sm:size-16">
            <Activity className="size-8" />
          </div>
        </section>

        {/* Main statistics */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Platform Overview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Current statistics from your platform.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {overviewCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-slate-500">
                      {card.title}
                    </p>
                    <div className={`rounded-xl p-3 ${card.accent}`}>
                      <Icon className="size-5" />
                    </div>
                  </div>

                  <p className="mt-4 break-words text-3xl font-bold tracking-tight text-slate-900">
                    {card.value.toLocaleString("en-BD")}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {card.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Shipment overview */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-[#1D3557]/10 p-3 text-[#1D3557]">
              <Package className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Shipment Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Current shipment distribution by status.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <StatItem
              label="Pending Payment"
              value={stats.shipments.pendingPayment}
              accent="coral"
            />
            <StatItem
              label="Ready for Assignment"
              value={stats.shipments.readyForAssignment}
              accent="navy"
            />
            <StatItem
              label="In Transit"
              value={stats.shipments.inTransit}
              accent="navy"
            />
            <StatItem
              label="Delivered"
              value={stats.shipments.delivered}
              accent="green"
            />
            <StatItem
              label="Cancelled"
              value={stats.shipments.cancelled}
              accent="coral"
            />
            <StatItem
              label="Returned"
              value={stats.shipments.returned}
              accent="slate"
            />
          </div>
        </section>

        {/* Payments and courier availability */}
        <div className="grid min-w-0 gap-6 lg:grid-cols-2">
          <section className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                <CircleDollarSign className="size-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Payment Overview
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Current payment attempt distribution.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <StatItem
                label="Paid"
                value={stats.payments.paid}
                accent="green"
              />
              <StatItem
                label="Pending"
                value={stats.payments.pending}
                accent="coral"
              />
              <StatItem
                label="Failed"
                value={stats.payments.failed}
                accent="coral"
              />
              <StatItem
                label="Refunded"
                value={stats.payments.refunded}
                accent="slate"
              />
            </div>
          </section>

          <section className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-violet-50 p-3 text-violet-700">
                <Truck className="size-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Courier Availability
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Current courier availability status.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <StatItem
                label="Total Couriers"
                value={stats.couriers.total}
                accent="navy"
              />
              <StatItem
                label="Available"
                value={stats.couriers.available}
                accent="green"
              />
              <StatItem
                label="Unavailable"
                value={stats.couriers.unavailable}
                accent="slate"
              />
            </div>
          </section>
        </div>

        {/* User distribution */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-[#1D3557]/10 p-3 text-[#1D3557]">
              <Users className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                User Distribution
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Users grouped by their current role.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatItem
              label="Total Users"
              value={stats.users.total}
              accent="navy"
            />
            <StatItem
              label="Customers"
              value={stats.users.customers}
              accent="navy"
            />
            <StatItem
              label="Couriers"
              value={stats.users.couriers}
              accent="coral"
            />
            <StatItem
              label="Admins"
              value={stats.users.admins}
              accent="slate"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function StatItem({
  label,
  value,
  accent = "navy",
}: {
  label: string;
  value: number;
  accent?: "navy" | "coral" | "green" | "slate";
}) {
  const accentStyles = {
    navy: "border-l-[#1D3557]",
    coral: "border-l-[#E76F51]",
    green: "border-l-emerald-600",
    slate: "border-l-slate-400",
  };

  return (
    <div
      className={`min-w-0 rounded-xl border border-slate-200 bg-slate-50/70 p-4 border-l-4 ${accentStyles[accent]}`}
    >
      <p className="text-sm leading-5 text-slate-500">{label}</p>
      <p className="mt-2 break-words text-2xl font-bold tracking-tight text-slate-900">
        {value.toLocaleString("en-BD")}
      </p>
    </div>
  );
}
