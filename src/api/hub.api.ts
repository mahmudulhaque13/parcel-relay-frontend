import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export interface Hub {
  id: string;
  name: string;
  code: string;
  address: string;
  zoneId: string;
  zone?: { id: string; name: string; code: string };
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface HubPayload {
  name: string;
  code: string;
  address: string;
  zoneId: string;
}

export async function getHubs(): Promise<ApiResponse<Hub[]>> {
  return apiClient<ApiResponse<Hub[]>>("/hubs");
}

export async function createHub(
  payload: HubPayload,
): Promise<ApiResponse<Hub>> {
  return apiClient<ApiResponse<Hub>>("/hubs", {
    method: "POST",
    body: payload,
  });
}

export async function updateHub(
  id: string,
  payload: Partial<HubPayload>,
): Promise<ApiResponse<Hub>> {
  return apiClient<ApiResponse<Hub>>(`/hubs/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

export async function deactivateHub(id: string): Promise<ApiResponse<Hub>> {
  return apiClient<ApiResponse<Hub>>(`/hubs/${id}/deactivate`, {
    method: "PATCH",
  });
}

export const activateHub = (id: string) =>
  apiClient(`/hubs/${id}/activate`, {
    method: "PATCH",
  });

export async function deleteHub(id: string): Promise<ApiResponse<Hub>> {
  return apiClient<ApiResponse<Hub>>(`/hubs/${id}`, { method: "DELETE" });
}
