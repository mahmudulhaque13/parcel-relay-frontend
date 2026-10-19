import Link from "next/link";
import type { ReactNode } from "react";
import LogoutButton from "@/components/auth/logout-button";
import RoleGuard from "@/components/auth/role-guard";
import CustomerNavigation from "@/components/dashboard/customer-navigation";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allowedRoles={["CUSTOMER"]}>
      <div className="min-h-screen">
        <header className="border-b border-border bg-background">
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

              <LogoutButton />
            </div>

            <CustomerNavigation />
          </div>
        </header>

        {children}
      </div>
    </RoleGuard>
  );
}
