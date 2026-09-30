"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCourierShipmentStatus } from "@/api/courier.api";

export function useUpdateCourierShipmentStatus(shipmentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: string) =>
      updateCourierShipmentStatus(shipmentId, { status }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courier-shipment-details", shipmentId],
      });

      queryClient.invalidateQueries({
        queryKey: ["courier-shipments"],
      });
    },
  });
}
