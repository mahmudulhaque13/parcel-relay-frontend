import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export interface CourierShipment {
  id: string;
  trackingNumber: string;
  customerId: string;
  courierId: string | null;
  originZoneId: string;
  destinationZoneId: string;
  recipientName: string;
  recipientPhone: string;
  deliveryAddress: string;
  packageDescription: string;
  weight: number;
  deliveryCharge: number;
  codAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
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
}

export interface CourierShipmentListData {
  data: CourierShipment[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface CourierShipmentQuery {
  page?: number;
  limit?: number;
  status?: string;
  q?: string;
  sortOrder?: "asc" | "desc";
}

export interface UpdateShipmentStatusPayload {
  status: string;
}

export async function getCourierShipments(
  query?: CourierShipmentQuery,
): Promise<ApiResponse<CourierShipmentListData>> {
  return apiClient<ApiResponse<CourierShipmentListData>>("/courier/shipments", {
    query,
  });
}

export async function getCourierShipmentById(
  shipmentId: string,
): Promise<ApiResponse<CourierShipment>> {
  return apiClient<ApiResponse<CourierShipment>>(
    `/courier/shipments/${shipmentId}`,
  );
}

export async function updateCourierShipmentStatus(
  shipmentId: string,
  payload: UpdateShipmentStatusPayload,
): Promise<ApiResponse<CourierShipment>> {
  return apiClient<ApiResponse<CourierShipment>>(
    `/courier/shipments/${shipmentId}/status`,
    {
      method: "PATCH",
      body: payload,
    },
  );
}

export interface CourierShipmentEvent {
  id: string;
  shipmentId: string;
  status: string;
  description: string | null;
  location: string | null;
  createdAt: string;
}

export interface CourierShipmentDetails extends CourierShipment {
  pickupRequest: {
    id: string;
    status: string;
    scheduledAt: string | null;
    pickedUpAt: string | null;
  } | null;
  transfers: Array<{
    id: string;
    fromZoneId: string;
    toZoneId: string;
    status: string;
    createdAt: string;
  }>;
  events: CourierShipmentEvent[];
}

export async function getCourierShipmentDetails(
  shipmentId: string,
): Promise<ApiResponse<CourierShipmentDetails>> {
  return apiClient<ApiResponse<CourierShipmentDetails>>(
    `/courier/shipments/${shipmentId}`,
  );
}
