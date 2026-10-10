import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export interface Hub {
  id: string;
  name: string;
  code: string;
  address: string;
  zoneId: string;
  isActive: boolean;
  isDeleted?: boolean;
  zone?: { id: string; name: string; code: string; isActive: boolean };
  createdAt?: string;
  updatedAt?: string;
}

export interface HubPayload {
  name: string;
  code: string;
  address: string;
  zoneId: string;
}

export const getHubs = () =>
  apiClient<ApiResponse<Hub[]>>("/hubs/admin/all");

export const createHub = (payload: HubPayload) =>
  apiClient<ApiResponse<Hub>>("/hubs", { method: "POST", body: payload });

export const updateHub = (id: string, payload: Partial<HubPayload>) =>
  apiClient<ApiResponse<Hub>>(`/hubs/${id}`, { method: "PATCH", body: payload });

export const activateHub = (id: string) =>
  apiClient<ApiResponse<Hub>>(`/hubs/${id}/activate`, { method: "PATCH" });

export const deactivateHub = (id: string) =>
  apiClient<ApiResponse<Hub>>(`/hubs/${id}/deactivate`, { method: "PATCH" });

export const deleteHub = (id: string) =>
  apiClient<ApiResponse<Hub>>(`/hubs/${id}`, { method: "DELETE" });
