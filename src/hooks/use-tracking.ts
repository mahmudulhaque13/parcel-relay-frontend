"use client";

import { useQuery } from "@tanstack/react-query";
import { getTrackingInfo } from "@/api/tracking.api";

export function useTracking(trackingNumber: string | null) {
  return useQuery({
    queryKey: ["shipment-tracking", trackingNumber],
    queryFn: () => getTrackingInfo(trackingNumber!),
    enabled: Boolean(trackingNumber),
    retry: false,
  });
}
