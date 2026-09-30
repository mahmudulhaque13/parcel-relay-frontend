import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export interface InitiatePaymentPayload {
  shipmentId: string;
}

export interface InitiatePaymentResponse {
  transactionId: string;
  amount: number;
  paymentUrl: string;
  sessionId: string;
}

export async function initiatePayment(
  payload: InitiatePaymentPayload,
): Promise<ApiResponse<InitiatePaymentResponse>> {
  return apiClient<ApiResponse<InitiatePaymentResponse>>("/payments/initiate", {
    method: "POST",
    body: payload,
  });
}

export interface PaymentStatus {
  shipment: {
    id: string;
    trackingNumber: string;
    status: string;
    paymentStatus: string;
    deliveryCharge: number;
  };
  payments: Array<{
    id: string;
    transactionId: string;
    amount: number;
    method: string;
    status: string;
    paidAt: string | null;
    createdAt: string;
    gatewayResponse: unknown;
  }>;
}

export async function getPaymentStatus(
  shipmentId: string,
): Promise<ApiResponse<PaymentStatus>> {
  return apiClient<ApiResponse<PaymentStatus>>(`/payments/${shipmentId}`);
}
