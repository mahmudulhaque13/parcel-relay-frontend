"use client";

import { useQuery } from "@tanstack/react-query";

import { getPaymentStatus } from "@/api/payment.api";

export function usePaymentStatus(shipmentId: string) {
  return useQuery({
    queryKey: ["payment-status", shipmentId],
    queryFn: () => getPaymentStatus(shipmentId),
    enabled: Boolean(shipmentId),
  });
}
