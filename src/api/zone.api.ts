import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export interface Zone {
  id: string;
  name: string;
  code: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getZones(): Promise<ApiResponse<Zone[]>> {
  return apiClient<ApiResponse<Zone[]>>("/zones");
}
