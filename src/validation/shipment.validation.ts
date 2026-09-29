import { z } from "zod";

export const shipmentZoneSchema = z.object({
  originZoneId: z.string().min(1, "Select an origin zone"),
  destinationZoneId: z.string().min(1, "Select a destination zone"),
});

export const shipmentPackageSchema = z.object({
  weight: z.number().positive("Weight must be greater than 0"),

  codAmount: z.number().min(0, "COD amount cannot be negative"),
});

export type ShipmentZoneValues = z.infer<typeof shipmentZoneSchema>;

export type ShipmentPackageValues = z.infer<typeof shipmentPackageSchema>;

export const shipmentFormSchema = shipmentZoneSchema.merge(
  shipmentPackageSchema,
);

export type ShipmentFormValues = z.infer<typeof shipmentFormSchema>;
