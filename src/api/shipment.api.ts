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

export interface CreateShipmentPayload {
  originZoneId: string;
  destinationZoneId: string;
  recipientName: string;
  recipientPhone: string;
  deliveryAddress: string;
  packageDescription: string;
  weight: number;
  codAmount: number;
}

export async function createShipment(
  payload: CreateShipmentPayload,
): Promise<ApiResponse<Shipment>> {
  return apiClient<ApiResponse<Shipment>>("/shipments", {
    method: "POST",
    body: payload,
  });
}

export interface ShipmentDetails extends Shipment {
  paymentStatus: string;
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
  pricingRule: {
    id: string;
    name: string;
    basePrice: number;
    perKgPrice: number;
    codPercentage: number;
  } | null;
  events: ShipmentEvent[];
}

export interface ShipmentEvent {
  id: string;
  shipmentId: string;
  status: string;
  description: string | null;
  location: string | null;
  createdAt: string;
}

export interface ShipmentTimeline {
  shipment: {
    id: string;
    trackingNumber: string;
    status: string;
  };
  events: ShipmentEvent[];
}

export async function getShipmentById(
  shipmentId: string,
): Promise<ApiResponse<ShipmentDetails>> {
  return apiClient<ApiResponse<ShipmentDetails>>(`/shipments/${shipmentId}`);
}

export async function getShipmentTimeline(
  shipmentId: string,
): Promise<ApiResponse<ShipmentTimeline>> {
  return apiClient<ApiResponse<ShipmentTimeline>>(
    `/shipments/${shipmentId}/timeline`,
  );
}

export async function cancelShipment(
  shipmentId: string,
): Promise<ApiResponse<Shipment>> {
  return apiClient<ApiResponse<Shipment>>(`/shipments/${shipmentId}/cancel`, {
    method: "PATCH",
  });
}
