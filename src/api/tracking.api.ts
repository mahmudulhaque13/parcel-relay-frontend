import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export interface TrackingShipment {
  recipientName: string;
  deliveryAddress: string;
  weight: string;
  deliveryCharge: string;
  codAmount: string;
}

export interface TrackingZone {
  name: string;
  code: string;
}

export interface TrackingEvent {
  status: string;
  description: string | null;
  location: string | null;
  createdAt: string;
}

export interface TrackingInfo {
  trackingNumber: string;
  currentStatus: string;
  shipment: TrackingShipment;
  originZone: TrackingZone;
  destinationZone: TrackingZone;
  timeline: TrackingEvent[];
}

export async function getTrackingInfo(
  trackingNumber: string,
): Promise<ApiResponse<TrackingInfo>> {
  const normalizedTrackingNumber = trackingNumber.trim();

  if (!normalizedTrackingNumber) {
    throw new Error("Please enter a tracking number.");
  }

  return apiClient<ApiResponse<TrackingInfo>>(
    `/tracking/${encodeURIComponent(normalizedTrackingNumber)}`,
  );
}
