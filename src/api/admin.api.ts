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

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  authProvider: string;
  emailVerified: boolean;
  imageUrl: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUserListData {
  data: AdminUser[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface AdminUserQuery {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
  q?: string;
  sortOrder?: "asc" | "desc";
}

export async function getAdminUsers(
  query?: AdminUserQuery,
): Promise<ApiResponse<AdminUserListData>> {
  return apiClient<ApiResponse<AdminUserListData>>("/admin/users", {
    query,
  });
}
