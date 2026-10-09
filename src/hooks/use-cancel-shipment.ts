"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelShipment } from "@/api/shipment.api";

export function useCancelShipment(shipmentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cancelShipment(shipmentId),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["shipment-details", shipmentId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["shipment-timeline", shipmentId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["my-shipments"],
        }),
      ]);
    },
  });
}
