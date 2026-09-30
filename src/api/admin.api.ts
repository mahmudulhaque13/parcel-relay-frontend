import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export type AdminUserRole = "CUSTOMER" | "COURIER" | "ADMIN";

export type AdminUserStatus = "ACTIVE" | "INACTIVE" | "BLOCKED" | "DELETED";

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
  role: AdminUserRole;
  status: AdminUserStatus;
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
  role?: AdminUserRole;
  status?: AdminUserStatus;
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

export interface UpdateAdminUserRolePayload {
  role: AdminUserRole;
  phone?: string;
}

export interface UpdateAdminUserStatusPayload {
  status: AdminUserStatus;
}

export async function updateAdminUserRole(
  userId: string,
  payload: UpdateAdminUserRolePayload,
): Promise<ApiResponse<AdminUser>> {
  return apiClient<ApiResponse<AdminUser>>(`/admin/users/${userId}/role`, {
    method: "PATCH",
    body: payload,
  });
}

export async function updateAdminUserStatus(
  userId: string,
  payload: UpdateAdminUserStatusPayload,
): Promise<ApiResponse<AdminUser>> {
  return apiClient<ApiResponse<AdminUser>>(`/admin/users/${userId}/status`, {
    method: "PATCH",
    body: payload,
  });
}
