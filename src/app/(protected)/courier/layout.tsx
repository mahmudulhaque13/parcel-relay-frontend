import Link from "next/link";
import type { ReactNode } from "react";

import LogoutButton from "@/components/auth/logout-button";
import RoleGuard from "@/components/auth/role-guard";
import CourierNavigation from "@/components/courier/courier-navigation";

export default function CourierLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allowedRoles={["COURIER"]}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/courier"
                className="text-xl font-black tracking-tight text-[#1D3557] dark:text-foreground"
              >
                ParcelRelay{" "}
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Courier
                </span>
              </Link>

              <LogoutButton />
            </div>

            <CourierNavigation />
          </div>
        </header>

        <main>{children}</main>
      </div>
    </RoleGuard>
  );
}
