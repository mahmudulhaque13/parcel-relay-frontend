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

export type CourierShipmentStatus = (typeof courierShipmentStatuses)[number];

const allowedCourierTransitions: Record<
  CourierShipmentStatus,
  readonly CourierShipmentStatus[]
> = {
  ASSIGNED: ["PICKUP_SCHEDULED"],
  PICKUP_SCHEDULED: ["PICKED_UP", "CANCELLED"],
  PICKED_UP: ["AT_ORIGIN_HUB"],
  AT_ORIGIN_HUB: ["IN_TRANSIT"],
  IN_TRANSIT: ["AT_DESTINATION_HUB"],
  AT_DESTINATION_HUB: ["OUT_FOR_DELIVERY"],
  OUT_FOR_DELIVERY: ["DELIVERY_FAILED", "DELIVERED"],
  DELIVERY_FAILED: ["OUT_FOR_DELIVERY", "RETURN_INITIATED"],
  RETURN_INITIATED: ["RETURN_IN_TRANSIT"],
  RETURN_IN_TRANSIT: ["RETURNED_TO_SENDER"],
  DELIVERED: [],
  RETURNED_TO_SENDER: [],
  CANCELLED: [],
};

export function getAllowedCourierShipmentStatuses(
  currentStatus: string,
): readonly CourierShipmentStatus[] {
  if (
    !courierShipmentStatuses.includes(currentStatus as CourierShipmentStatus)
  ) {
    return [];
  }

  return allowedCourierTransitions[currentStatus as CourierShipmentStatus];
}

export function getCourierShipmentStatusLabel(status: string): string {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
