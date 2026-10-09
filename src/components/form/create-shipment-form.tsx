"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import type { Shipment, ShipmentQuotePayload } from "@/api/shipment.api";
import { useCreateShipment } from "@/hooks/use-create-shipment";
import { useInitiatePayment } from "@/hooks/use-initiate-payment";
import { useShipmentQuote } from "@/hooks/use-shipment-quote";
import { useZones } from "@/hooks/use-zones";
import type { ApiResponse } from "@/types/api";
import {
  type ShipmentFormValues,
  shipmentPackageSchema,
  shipmentRecipientSchema,
  shipmentZoneSchema,
} from "@/validation/shipment.validation";

export default function CreateShipmentForm() {
  const { data, isLoading, isError } = useZones();

  const shipmentQuote = useShipmentQuote();
  const createShipmentMutation = useCreateShipment();
  const initiatePaymentMutation = useInitiatePayment();

  const [currentStep, setCurrentStep] = useState(1);
  const [quotedPayload, setQuotedPayload] =
    useState<ShipmentQuotePayload | null>(null);

  const zones = data?.data ?? [];

  const form = useForm({
    defaultValues: {
      originZoneId: "",
      destinationZoneId: "",
      weight: 0,
      codAmount: 0,
      recipientName: "",
      recipientPhone: "",
      deliveryAddress: "",
      packageDescription: "",
    } as ShipmentFormValues,

    onSubmit: async ({ value }) => {
      console.log("Shipment form submitted:", value);
    },
  });

  const getCurrentQuotePayload = (): ShipmentQuotePayload => ({
    originZoneId: form.getFieldValue("originZoneId"),
    destinationZoneId: form.getFieldValue("destinationZoneId"),
    weight: form.getFieldValue("weight"),
    codAmount: form.getFieldValue("codAmount"),
  });

  const isQuoteCurrent =
    quotedPayload !== null &&
    quotedPayload.originZoneId === form.getFieldValue("originZoneId") &&
    quotedPayload.destinationZoneId ===
      form.getFieldValue("destinationZoneId") &&
    quotedPayload.weight === form.getFieldValue("weight") &&
    quotedPayload.codAmount === form.getFieldValue("codAmount") &&
    shipmentQuote.data?.success === true;

  const selectedOrigin = zones.find(
    (zone) => zone.id === form.getFieldValue("originZoneId"),
  );

  const selectedDestination = zones.find(
    (zone) => zone.id === form.getFieldValue("destinationZoneId"),
  );

  const invalidateQuote = () => {
    setQuotedPayload(null);
    shipmentQuote.reset();
  };

  const handleStepOneNext = () => {
    const values = {
      originZoneId: form.getFieldValue("originZoneId"),
      destinationZoneId: form.getFieldValue("destinationZoneId"),
    };

    const result = shipmentZoneSchema.safeParse(values);

    if (!result.success) {
      toast.error(
        result.error.issues[0]?.message ?? "Please select valid zones.",
      );
      return;
    }

    setCurrentStep(2);
  };

  const handleStepTwoNext = () => {
    const values = {
      weight: form.getFieldValue("weight"),
      codAmount: form.getFieldValue("codAmount"),
    };

    const result = shipmentPackageSchema.safeParse(values);

    if (!result.success) {
      toast.error(
        result.error.issues[0]?.message ??
          "Please enter valid package details.",
      );
      return;
    }

    setCurrentStep(3);
  };

  const handleGetQuote = async (): Promise<boolean> => {
    const payload = getCurrentQuotePayload();

    const zoneResult = shipmentZoneSchema.safeParse({
      originZoneId: payload.originZoneId,
      destinationZoneId: payload.destinationZoneId,
    });

    const packageResult = shipmentPackageSchema.safeParse({
      weight: payload.weight,
      codAmount: payload.codAmount,
    });

    if (!zoneResult.success || !packageResult.success) {
      const message =
        zoneResult.error?.issues[0]?.message ??
        packageResult.error?.issues[0]?.message ??
        "Please check your shipment details.";

      toast.error(message);
      return false;
    }

    setQuotedPayload(null);
    shipmentQuote.reset();

    try {
      const response = await shipmentQuote.mutateAsync(payload);

      const currentPayload = getCurrentQuotePayload();

      const inputsUnchanged =
        currentPayload.originZoneId === payload.originZoneId &&
        currentPayload.destinationZoneId === payload.destinationZoneId &&
        currentPayload.weight === payload.weight &&
        currentPayload.codAmount === payload.codAmount;

      if (!response.success) {
        toast.error("Unable to calculate the delivery charge.");
        return false;
      }

      if (!inputsUnchanged) {
        return false;
      }

      setQuotedPayload(payload);
      return true;
    } catch (error) {
      console.error("Quote calculation failed:", error);
      toast.error("Failed to calculate delivery charge. Please try again.");
      return false;
    }
  };

  const handleStepThreeNext = async () => {
    if (!isQuoteCurrent) {
      const quoteSucceeded = await handleGetQuote();

      if (!quoteSucceeded) {
        return;
      }
    }

    setCurrentStep(4);
  };

  const handleStepFourSubmit = async () => {
    const recipientValues = {
      recipientName: form.getFieldValue("recipientName"),
      recipientPhone: form.getFieldValue("recipientPhone"),
      deliveryAddress: form.getFieldValue("deliveryAddress"),
      packageDescription: form.getFieldValue("packageDescription"),
    };

    const recipientResult = shipmentRecipientSchema.safeParse(recipientValues);

    if (!recipientResult.success) {
      toast.error(
        recipientResult.error.issues[0]?.message ??
          "Please check the recipient details.",
      );
      return;
    }

    // Recheck the quote before creating a shipment.
    if (!isQuoteCurrent) {
      toast.error("Your quote is outdated. Please calculate it again.");
      setCurrentStep(3);
      return;
    }

    let shipmentResponse: ApiResponse<Shipment>;

    try {
      shipmentResponse = await createShipmentMutation.mutateAsync({
        originZoneId: form.getFieldValue("originZoneId"),
        destinationZoneId: form.getFieldValue("destinationZoneId"),
        recipientName: form.getFieldValue("recipientName"),
        recipientPhone: form.getFieldValue("recipientPhone"),
        deliveryAddress: form.getFieldValue("deliveryAddress"),
        packageDescription: form.getFieldValue("packageDescription"),
        weight: form.getFieldValue("weight"),
        codAmount: form.getFieldValue("codAmount"),
      });
    } catch (error) {
      console.error("Shipment creation failed:", error);
      toast.error("Failed to create shipment. Please try again.");
      return;
    }

    try {
      const paymentResponse = await initiatePaymentMutation.mutateAsync({
        shipmentId: shipmentResponse.data.id,
      });

      toast.success("Shipment created. Redirecting to payment...");
      window.location.href = paymentResponse.data.paymentUrl;
    } catch (error) {
      console.error("Payment initiation failed:", error);
      toast.error("Failed to start payment. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 animate-pulse rounded-lg bg-muted" />
        <div className="h-10 animate-pulse rounded-lg bg-muted" />
        <div className="h-10 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
        <p className="text-sm text-destructive">
          Failed to load delivery zones. Please try again.
        </p>
      </div>
    );
  }

  if (zones.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-center">
        <p className="text-muted-foreground">
          No delivery zones are currently available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="grid grid-cols-4 gap-2">
        {["Zones", "Package", "Quote", "Recipient"].map((label, index) => {
          const step = index + 1;

          return (
            <div
              key={label}
              className={`rounded-lg border px-3 py-2 text-center text-sm ${
                currentStep >= step
                  ? "border-primary bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <span className="block font-medium">{step}</span>
              <span>{label}</span>
            </div>
          );
        })}
      </div>

      {/* Step 1: Zones */}
      {currentStep === 1 && (
        <div className="space-y-6 rounded-xl border p-6">
          <div>
            <h2 className="text-xl font-semibold">Delivery Zones</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Select the origin and destination zones.
            </p>
          </div>

          <form.Field name="originZoneId">
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="text-sm font-medium">
                  Origin Zone
                </label>

                <select
                  id={field.name}
                  value={field.state.value}
                  onChange={(event) => {
                    invalidateQuote();
                    field.handleChange(event.target.value);
                  }}
                  className="w-full rounded-lg border px-3 py-2"
                >
                  <option value="">Select origin zone</option>
                  {zones.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name} ({zone.code})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </form.Field>

          <form.Field name="destinationZoneId">
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="text-sm font-medium">
                  Destination Zone
                </label>

                <select
                  id={field.name}
                  value={field.state.value}
                  onChange={(event) => {
                    invalidateQuote();
                    field.handleChange(event.target.value);
                  }}
                  className="w-full rounded-lg border px-3 py-2"
                >
                  <option value="">Select destination zone</option>
                  {zones.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name} ({zone.code})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </form.Field>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleStepOneNext}
              className="rounded-lg border px-5 py-2 font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Package */}
      {currentStep === 2 && (
        <div className="space-y-6 rounded-xl border p-6">
          <div>
            <h2 className="text-xl font-semibold">Package Details</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter the package weight and cash-on-delivery amount.
            </p>
          </div>

          <form.Field name="weight">
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="text-sm font-medium">
                  Weight (kg)
                </label>

                <input
                  id={field.name}
                  type="number"
                  min="0"
                  step="0.01"
                  value={field.state.value || ""}
                  onChange={(event) => {
                    invalidateQuote();
                    field.handleChange(Number(event.target.value));
                  }}
                  placeholder="e.g. 2.5"
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="codAmount">
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="text-sm font-medium">
                  COD Amount
                </label>

                <input
                  id={field.name}
                  type="number"
                  min="0"
                  step="0.01"
                  value={field.state.value || ""}
                  onChange={(event) => {
                    invalidateQuote();
                    field.handleChange(Number(event.target.value));
                  }}
                  placeholder="e.g. 500"
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>
            )}
          </form.Field>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="rounded-lg border px-5 py-2 font-medium"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleStepTwoNext}
              className="rounded-lg border px-5 py-2 font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Quote */}
      {currentStep === 3 && (
        <div className="space-y-6 rounded-xl border p-6">
          <div>
            <h2 className="text-xl font-semibold">Quote &amp; Review</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Review your shipment details and calculate the delivery charge.
            </p>
          </div>

          <div className="grid gap-4 rounded-lg bg-muted/40 p-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Origin</p>
              <p className="font-medium">
                {selectedOrigin?.name} ({selectedOrigin?.code})
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Destination</p>
              <p className="font-medium">
                {selectedDestination?.name} ({selectedDestination?.code})
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Weight</p>
              <p className="font-medium">{form.getFieldValue("weight")} kg</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">COD Amount</p>
              <p className="font-medium">৳{form.getFieldValue("codAmount")}</p>
            </div>
          </div>

          {isQuoteCurrent && shipmentQuote.data?.success && (
            <div className="space-y-3 rounded-lg border p-4">
              <h3 className="font-semibold">Delivery Charge</h3>

              <div className="flex justify-between text-sm">
                <span>Base Price</span>
                <span>৳{shipmentQuote.data.data.pricing.basePrice}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Weight Charge</span>
                <span>৳{shipmentQuote.data.data.pricing.weightCharge}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>COD Charge</span>
                <span>৳{shipmentQuote.data.data.pricing.codCharge}</span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total Delivery Charge</span>
                  <span>৳{shipmentQuote.data.data.pricing.deliveryCharge}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="rounded-lg border px-5 py-2 font-medium"
            >
              Back
            </button>

            <div className="flex gap-3">
              {!isQuoteCurrent && (
                <button
                  type="button"
                  onClick={handleGetQuote}
                  disabled={shipmentQuote.isPending}
                  className="rounded-lg border px-5 py-2 font-medium disabled:opacity-50"
                >
                  {shipmentQuote.isPending ? "Calculating..." : "Get Quote"}
                </button>
              )}

              {isQuoteCurrent && (
                <button
                  type="button"
                  onClick={handleStepThreeNext}
                  disabled={shipmentQuote.isPending}
                  className="rounded-lg border px-5 py-2 font-medium disabled:opacity-50"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Recipient */}
      {currentStep === 4 && (
        <div className="space-y-6 rounded-xl border p-6">
          <div>
            <h2 className="text-xl font-semibold">Recipient Details</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter the recipient information for this shipment.
            </p>
          </div>

          <form.Field name="recipientName">
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="text-sm font-medium">
                  Recipient Name
                </label>

                <input
                  id={field.name}
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Enter recipient name"
                  className="w-full rounded-lg border px-3 py-2"
                />

                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="recipientPhone">
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="text-sm font-medium">
                  Recipient Phone
                </label>

                <input
                  id={field.name}
                  type="tel"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Enter recipient phone"
                  className="w-full rounded-lg border px-3 py-2"
                />

                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="deliveryAddress">
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="text-sm font-medium">
                  Delivery Address
                </label>

                <textarea
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Enter complete delivery address"
                  rows={4}
                  className="w-full rounded-lg border px-3 py-2"
                />

                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="packageDescription">
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="text-sm font-medium">
                  Package Description
                </label>

                <textarea
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Describe the package contents"
                  rows={3}
                  className="w-full rounded-lg border px-3 py-2"
                />

                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">
                    {String(field.state.meta.errors[0])}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Final review */}
          <div className="space-y-3 rounded-lg bg-muted/40 p-4">
            <h3 className="font-semibold">Shipment Summary</h3>

            <div className="text-sm">
              <span className="text-muted-foreground">Route: </span>
              {selectedOrigin?.name} → {selectedDestination?.name}
            </div>

            <div className="text-sm">
              <span className="text-muted-foreground">Weight: </span>
              {form.getFieldValue("weight")} kg
            </div>

            <div className="text-sm">
              <span className="text-muted-foreground">COD: </span>৳
              {form.getFieldValue("codAmount")}
            </div>

            {isQuoteCurrent && shipmentQuote.data?.success && (
              <div className="text-sm font-semibold">
                Delivery Charge: ৳
                {shipmentQuote.data.data.pricing.deliveryCharge}
              </div>
            )}

            {!isQuoteCurrent && (
              <p className="text-sm text-destructive">
                The quote is no longer valid. Go back and calculate it again.
              </p>
            )}
          </div>

          <div className="flex justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="rounded-lg border px-5 py-2 font-medium"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleStepFourSubmit}
              disabled={
                createShipmentMutation.isPending ||
                initiatePaymentMutation.isPending ||
                !isQuoteCurrent
              }
              className="rounded-lg border px-5 py-2 font-medium disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createShipmentMutation.isPending ||
              initiatePaymentMutation.isPending ? (
                <>
                  <span className="loading loading-ring loading-sm" />{" "}
                  Processing...
                </>
              ) : (
                "Continue to Payment"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
