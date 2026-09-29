"use client";

import { useQuery } from "@tanstack/react-query";

import { getMyShipments, type ShipmentQuery } from "@/api/shipment.api";

export function useMyShipments(query?: ShipmentQuery) {
  return useQuery({
    queryKey: ["my-shipments", query],
    queryFn: () => getMyShipments(query),
  });
}
