"use client";

import { useMutation } from "@tanstack/react-query";

import {
  type InitiatePaymentPayload,
  initiatePayment,
} from "@/api/payment.api";

export function useInitiatePayment() {
  return useMutation({
    mutationFn: (payload: InitiatePaymentPayload) => initiatePayment(payload),
  });
}
