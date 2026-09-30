"use client";

import { useQuery } from "@tanstack/react-query";

import { type AdminUserQuery, getAdminUsers } from "@/api/admin.api";

export function useAdminUsers(query?: AdminUserQuery) {
  return useQuery({
    queryKey: ["admin-users", query],
    queryFn: () => getAdminUsers(query),
  });
}
