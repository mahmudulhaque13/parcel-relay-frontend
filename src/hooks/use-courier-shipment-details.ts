"use client";

import { useQuery } from "@tanstack/react-query";

import { getCourierShipmentDetails } from "@/api/courier.api";

export function useCourierShipmentDetails(shipmentId: string) {
  return useQuery({
    queryKey: ["courier-shipment-details", shipmentId],
    queryFn: () => getCourierShipmentDetails(shipmentId),
    enabled: Boolean(shipmentId),
  });
}
