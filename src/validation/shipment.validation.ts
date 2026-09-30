import { z } from "zod";

export const shipmentZoneSchema = z.object({
  originZoneId: z.string().min(1, "Select an origin zone"),
  destinationZoneId: z.string().min(1, "Select a destination zone"),
});

export const shipmentPackageSchema = z.object({
  weight: z.number().positive("Weight must be greater than 0"),
  codAmount: z.number().min(0, "COD amount cannot be negative"),
});

export const shipmentRecipientSchema = z.object({
  recipientName: z
    .string()
    .min(2, "Recipient name must be at least 2 characters"),

  recipientPhone: z.string().min(7, "Invalid recipient phone number"),

  deliveryAddress: z
    .string()
    .min(5, "Delivery address must be at least 5 characters"),

  packageDescription: z
    .string()
    .min(2, "Package description must be at least 2 characters"),
});

export const shipmentFormSchema = shipmentZoneSchema
  .merge(shipmentPackageSchema)
  .merge(shipmentRecipientSchema);

export type ShipmentZoneValues = z.infer<typeof shipmentZoneSchema>;
export type ShipmentPackageValues = z.infer<typeof shipmentPackageSchema>;
export type ShipmentRecipientValues = z.infer<typeof shipmentRecipientSchema>;
export type ShipmentFormValues = z.infer<typeof shipmentFormSchema>;
