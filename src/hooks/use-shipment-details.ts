"use client";

import { useQuery } from "@tanstack/react-query";

import { getShipmentById } from "@/api/shipment.api";

export function useShipmentDetails(shipmentId: string) {
  return useQuery({
    queryKey: ["shipment-details", shipmentId],
    queryFn: () => getShipmentById(shipmentId),
    enabled: Boolean(shipmentId),
  });
}
