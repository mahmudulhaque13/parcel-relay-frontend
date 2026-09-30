"use client";

import { useQuery } from "@tanstack/react-query";

import {
  type AdminShipmentReportQuery,
  getAdminShipmentReports,
} from "@/api/admin.api";

export function useAdminShipmentReports(query?: AdminShipmentReportQuery) {
  return useQuery({
    queryKey: ["admin-shipment-reports", query],
    queryFn: () => getAdminShipmentReports(query),
  });
}
