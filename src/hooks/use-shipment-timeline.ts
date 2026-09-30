"use client";

import { useQuery } from "@tanstack/react-query";

import { getShipmentTimeline } from "@/api/shipment.api";

export function useShipmentTimeline(shipmentId: string) {
  return useQuery({
    queryKey: ["shipment-timeline", shipmentId],
    queryFn: () => getShipmentTimeline(shipmentId),
    enabled: Boolean(shipmentId),
  });
}
