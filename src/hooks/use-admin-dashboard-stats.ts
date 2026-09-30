"use client";

import { useQuery } from "@tanstack/react-query";

import { getAdminDashboardStats } from "@/api/admin.api";

export function useAdminDashboardStats() {
  return useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: getAdminDashboardStats,
  });
}
