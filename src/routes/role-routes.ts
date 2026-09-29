import type { UserRole } from "@/types/auth";

export const roleRouteMap: Record<UserRole, string> = {
  CUSTOMER: "/dashboard",
  COURIER: "/courier",
  ADMIN: "/admin",
};

export function getRoleHome(role: UserRole): string {
  return roleRouteMap[role];
}
