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

export interface CourierApplicationPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  identityDocument: File;
  profilePhoto: File;
}

export interface CourierApplicationResponse {
  id: string;
  name: string;
  email: string;
  role: "COURIER";
  status: string;
  applicationStatus: "PENDING";
}

export async function applyAsCourier(
  payload: CourierApplicationPayload,
): Promise<ApiResponse<CourierApplicationResponse>> {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("password", payload.password);
  formData.append("phone", payload.phone);
  formData.append("identityDocument", payload.identityDocument);
  formData.append("profilePhoto", payload.profilePhoto);

  return apiClient<ApiResponse<CourierApplicationResponse>>("/courier/apply", {
    method: "POST",
    body: formData,
  });
}

export interface VerifyCourierEmailPayload {
  email: string;
  otp: string;
}

export interface VerifyCourierEmailResponse {
  id: string;
  name: string;
  email: string;
  role: "COURIER";
  status: string;
  emailVerified: boolean;
  applicationStatus: "PENDING";
}

export async function verifyCourierEmail(
  payload: VerifyCourierEmailPayload,
): Promise<ApiResponse<VerifyCourierEmailResponse>> {
  return apiClient<ApiResponse<VerifyCourierEmailResponse>>(
    "/courier/verify-email",
    {
      method: "POST",
      body: payload,
    },
  );
}

export interface CourierApplication {
  id: string;
  phone: string;
  applicationStatus: "PENDING" | "APPROVED" | "REJECTED";
  identityDocumentUrl: string | null;
  profilePhotoUrl: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    status: string;
    emailVerified: boolean;
    createdAt: string;
  };
}

export type ReviewCourierApplicationPayload = {
  action: "APPROVE" | "REJECT";
};

export async function getCourierApplications(): Promise<
  ApiResponse<CourierApplication[]>
> {
  return apiClient<ApiResponse<CourierApplication[]>>("/courier/applications");
}

export async function reviewCourierApplication(
  applicationId: string,
  payload: ReviewCourierApplicationPayload,
): Promise<
  ApiResponse<{
    id: string;
    name: string;
    email: string;
    role: "COURIER";
    status: string;
    emailVerified: boolean;
    applicationStatus: "APPROVED" | "REJECTED";
  }>
> {
  return apiClient(`/courier/applications/${applicationId}/review`, {
    method: "PATCH",
    body: payload,
  });
}
