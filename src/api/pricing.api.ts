import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export interface PricingRule {
  id: string;
  name: string;
  basePrice: number | string;
  perKgPrice: number | string;
  codPercentage: number | string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PricingPayload {
  name: string;
  basePrice: number;
  perKgPrice: number;
  codPercentage: number;
}

export async function getPricingRules(): Promise<ApiResponse<PricingRule[]>> {
  return apiClient<ApiResponse<PricingRule[]>>("/pricing");
}

export async function createPricingRule(payload: PricingPayload): Promise<ApiResponse<PricingRule>> {
  return apiClient<ApiResponse<PricingRule>>("/pricing", { method: "POST", body: payload });
}

export async function updatePricingRule(id: string, payload: Partial<PricingPayload>): Promise<ApiResponse<PricingRule>> {
  return apiClient<ApiResponse<PricingRule>>(`/pricing/${id}`, { method: "PATCH", body: payload });
}

export async function deactivatePricingRule(id: string): Promise<ApiResponse<PricingRule>> {
  return apiClient<ApiResponse<PricingRule>>(`/pricing/${id}/deactivate`, { method: "PATCH" });
}

export async function deletePricingRule(id: string): Promise<ApiResponse<PricingRule>> {
  return apiClient<ApiResponse<PricingRule>>(`/pricing/${id}`, { method: "DELETE" });
}
