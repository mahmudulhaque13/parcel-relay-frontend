import type { ReactNode } from "react";

import LogoutButton from "@/components/auth/logout-button";
import RoleGuard from "@/components/auth/role-guard";

export default function CourierLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allowedRoles={["COURIER"]}>
      <div className="min-h-screen">
        <header className="border-b border-border bg-background">
          <div className="mx-auto flex max-w-7xl items-center justify-end px-4 py-3 sm:px-6 lg:px-8">
            <LogoutButton />
          </div>
        </header>

        {children}
      </div>
    </RoleGuard>
  );
}
