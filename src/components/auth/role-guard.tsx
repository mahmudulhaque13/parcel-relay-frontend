"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";
import type { UserRole } from "@/types/auth";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-ring loading-lg" />
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Access denied</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You do not have permission to access this area.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
