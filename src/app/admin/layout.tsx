import type { ReactNode } from "react";
import Link from "next/link";

import LogoutButton from "@/components/auth/logout-button";
import RoleGuard from "@/components/auth/role-guard";
import AdminNavigation from "@/components/admin/admin-navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/admin"
                className="text-xl font-black tracking-tight text-[#1D3557]"
              >
                ParcelRelay{" "}
                <span className="text-sm font-semibold text-slate-500">
                  Admin
                </span>
              </Link>

              <LogoutButton />
            </div>

            <AdminNavigation />
          </div>
        </header>

        <main>{children}</main>
      </div>
    </RoleGuard>
  );
}
