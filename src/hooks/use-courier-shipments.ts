"use client";

import { useQuery } from "@tanstack/react-query";

import {
  type CourierShipmentQuery,
  getCourierShipments,
} from "@/api/courier.api";

export function useCourierShipments(query?: CourierShipmentQuery) {
  return useQuery({
    queryKey: ["courier-shipments", query],
    queryFn: () => getCourierShipments(query),
  });
}
