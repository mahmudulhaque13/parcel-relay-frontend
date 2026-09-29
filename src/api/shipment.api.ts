import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export interface Shipment {
  id: string;
  trackingNumber: string;
  status: string;
  recipientName: string;
  recipientPhone: string;
  deliveryAddress: string;
  packageDescription: string;
  weight: number;
  codAmount: number;
  deliveryCharge: number;
  createdAt: string;
  updatedAt: string;
}

export interface ShipmentListData {
  data: Shipment[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface ShipmentQuery {
  page?: number;
  limit?: number;
  status?: string;
  q?: string;
  sortBy?: "createdAt" | "updatedAt" | "deliveryCharge";
  sortOrder?: "asc" | "desc";
}

export async function getMyShipments(
  query?: ShipmentQuery,
): Promise<ApiResponse<ShipmentListData>> {
  return apiClient<ApiResponse<ShipmentListData>>("/shipments", {
    query,
  });
}
