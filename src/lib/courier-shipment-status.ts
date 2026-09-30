export const courierShipmentStatuses = [
  "ASSIGNED",
  "PICKUP_SCHEDULED",
  "PICKED_UP",
  "AT_ORIGIN_HUB",
  "IN_TRANSIT",
  "AT_DESTINATION_HUB",
  "OUT_FOR_DELIVERY",
  "DELIVERY_FAILED",
  "RETURN_INITIATED",
  "RETURN_IN_TRANSIT",
  "DELIVERED",
  "RETURNED_TO_SENDER",
  "CANCELLED",
] as const;

export function getCourierShipmentStatusLabel(status: string): string {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
