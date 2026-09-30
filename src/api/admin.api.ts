import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export interface AdminDashboardStats {
  users: {
    total: number;
    customers: number;
    couriers: number;
    admins: number;
  };

  shipments: {
    total: number;
    pendingPayment: number;
    readyForAssignment: number;
    inTransit: number;
    delivered: number;
    cancelled: number;
    returned: number;
  };

  payments: {
    total: number;
    paid: number;
    pending: number;
    failed: number;
    refunded: number;
  };

  couriers: {
    total: number;
    available: number;
    unavailable: number;
  };
}

export async function getAdminDashboardStats(): Promise<
  ApiResponse<AdminDashboardStats>
> {
  return apiClient<ApiResponse<AdminDashboardStats>>("/admin/dashboard-stats");
}
