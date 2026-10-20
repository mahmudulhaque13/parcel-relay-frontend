import Link from "next/link";
import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import CustomerNavigation from "@/components/dashboard/customer-navigation";
import DashboardAccountMenu from "@/components/layout/dashboard-account-menu";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allowedRoles={["CUSTOMER"]}>
      <div className="min-h-screen">
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-sm backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/dashboard"
                className="text-xl font-black tracking-tight text-[#1D3557] dark:text-foreground"
              >
                ParcelRelay{" "}
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Customer
                </span>
              </Link>

              <DashboardAccountMenu />
            </div>

            <CustomerNavigation />
          </div>
        </header>

        {children}
      </div>
    </RoleGuard>
  );
}
