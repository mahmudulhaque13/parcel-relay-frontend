import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export interface Zone {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ZonePayload {
  name: string;
  code: string;
  description?: string;
}

export async function getZones(): Promise<ApiResponse<Zone[]>> {
  return apiClient<ApiResponse<Zone[]>>("/zones");
}

export const getAdminZones = () =>
  apiClient<ApiResponse<Zone[]>>("/zones/admin/all");

export async function createZone(
  payload: ZonePayload,
): Promise<ApiResponse<Zone>> {
  return apiClient<ApiResponse<Zone>>("/zones", {
    method: "POST",
    body: payload,
  });
}

export async function updateZone(
  id: string,
  payload: Partial<ZonePayload>,
): Promise<ApiResponse<Zone>> {
  return apiClient<ApiResponse<Zone>>(`/zones/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

export async function deactivateZone(id: string): Promise<ApiResponse<Zone>> {
  return apiClient<ApiResponse<Zone>>(`/zones/${id}/deactivate`, {
    method: "PATCH",
  });
}

export const activateZone = (id: string) =>
  apiClient(`/zones/${id}/activate`, {
    method: "PATCH",
  });

export async function deleteZone(id: string): Promise<ApiResponse<Zone>> {
  return apiClient<ApiResponse<Zone>>(`/zones/${id}`, { method: "DELETE" });
}
