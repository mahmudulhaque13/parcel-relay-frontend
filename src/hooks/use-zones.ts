"use client";

import { useQuery } from "@tanstack/react-query";
import { getZones } from "@/api/zone.api";

export function useZones() {
  return useQuery({
    queryKey: ["zones"],
    queryFn: getZones,
  });
}
