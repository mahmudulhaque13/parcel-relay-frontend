"use client";

import { useMutation } from "@tanstack/react-query";

import { type CreateShipmentPayload, createShipment } from "@/api/shipment.api";

export function useCreateShipment() {
  return useMutation({
    mutationFn: (payload: CreateShipmentPayload) => createShipment(payload),
  });
}
