import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export interface Zone {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  isActive: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ZonePayload {
  name: string;
  code: string;
  description?: string;
}

export const getZones = () =>
  apiClient<ApiResponse<Zone[]>>("/zones");

// Admin-only endpoint: includes active and inactive zones.
export const getAdminZones = () =>
  apiClient<ApiResponse<Zone[]>>("/zones/admin/all");

export const createZone = (payload: ZonePayload) =>
  apiClient<ApiResponse<Zone>>("/zones", { method: "POST", body: payload });

export const updateZone = (id: string, payload: Partial<ZonePayload>) =>
  apiClient<ApiResponse<Zone>>(`/zones/${id}`, { method: "PATCH", body: payload });

export const activateZone = (id: string) =>
  apiClient<ApiResponse<Zone>>(`/zones/${id}/activate`, { method: "PATCH" });

export const deactivateZone = (id: string) =>
  apiClient<ApiResponse<Zone>>(`/zones/${id}/deactivate`, { method: "PATCH" });

export const deleteZone = (id: string) =>
  apiClient<ApiResponse<Zone>>(`/zones/${id}`, { method: "DELETE" });
