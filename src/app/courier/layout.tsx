import type { ReactNode } from "react";

import RoleGuard from "@/components/auth/role-guard";

export default function CourierLayout({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRoles={["COURIER"]}>{children}</RoleGuard>;
}
