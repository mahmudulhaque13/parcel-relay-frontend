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

export interface ShipmentQuotePayload {
  originZoneId: string;
  destinationZoneId: string;
  weight: number;
  codAmount: number;
}

export interface ShipmentQuote {
  originZone: {
    id: string;
    name: string;
    code: string;
  };

  destinationZone: {
    id: string;
    name: string;
    code: string;
  };

  pricing: {
    pricingRuleId: string;
    basePrice: number;
    perKgPrice: number;
    codPercentage: number;
    weightCharge: number;
    codCharge: number;
    deliveryCharge: number;
  };

  shipment: {
    weight: number;
    codAmount: number;
  };
}

export async function getMyShipments(
  query?: ShipmentQuery,
): Promise<ApiResponse<ShipmentListData>> {
  return apiClient<ApiResponse<ShipmentListData>>("/shipments", {
    query,
  });
}

export async function getShipmentQuote(
  payload: ShipmentQuotePayload,
): Promise<ApiResponse<ShipmentQuote>> {
  return apiClient<ApiResponse<ShipmentQuote>>("/shipments/quote", {
    method: "POST",
    body: payload,
  });
}
