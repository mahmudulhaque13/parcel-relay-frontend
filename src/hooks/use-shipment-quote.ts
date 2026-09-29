"use client";

import { useMutation } from "@tanstack/react-query";

import {
  getShipmentQuote,
  type ShipmentQuotePayload,
} from "@/api/shipment.api";

export function useShipmentQuote() {
  return useMutation({
    mutationFn: (payload: ShipmentQuotePayload) => getShipmentQuote(payload),
  });
}
