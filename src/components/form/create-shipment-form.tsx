"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import { useShipmentQuote } from "@/hooks/use-shipment-quote";
import { useZones } from "@/hooks/use-zones";
import {
  type ShipmentFormValues,
  shipmentPackageSchema,
  shipmentZoneSchema,
} from "@/validation/shipment.validation";

export default function CreateShipmentForm() {
  const { data, isLoading, isError, refetch } = useZones();
  const shipmentQuote = useShipmentQuote();

  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm({
    defaultValues: {
      originZoneId: "",
      destinationZoneId: "",
      weight: 0,
      codAmount: 0,
    } satisfies ShipmentFormValues,

    onSubmit: async ({ value }) => {
      if (currentStep === 1) {
        const result = shipmentZoneSchema.safeParse({
          originZoneId: value.originZoneId,
          destinationZoneId: value.destinationZoneId,
        });

        if (!result.success) {
          return;
        }

        setCurrentStep(2);
        return;
      }

      if (currentStep === 2) {
        const result = shipmentPackageSchema.safeParse({
          weight: value.weight,
          codAmount: value.codAmount,
        });

        if (!result.success) {
          return;
        }

        setCurrentStep(3);
      }
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4 rounded-xl border p-6">
        <div className="h-6 w-32 animate-pulse rounded bg-muted" />
        <div className="h-10 w-full animate-pulse rounded bg-muted" />
        <div className="h-10 w-full animate-pulse rounded bg-muted" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border p-6">
        <p className="text-sm text-red-600">Failed to load delivery zones.</p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-md border px-4 py-2 text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  const zones = data?.data ?? [];
  const activeZones = zones.filter((zone) => zone.isActive);

  if (activeZones.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center">
        <h2 className="font-semibold">No delivery zones available</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Please try again later.
        </p>
      </div>
    );
  }

  const selectedOrigin = activeZones.find(
    (zone) => zone.id === form.getFieldValue("originZoneId"),
  );

  const selectedDestination = activeZones.find(
    (zone) => zone.id === form.getFieldValue("destinationZoneId"),
  );

  const handleGetQuote = async () => {
    const result = shipmentPackageSchema.safeParse({
      weight: form.getFieldValue("weight"),
      codAmount: form.getFieldValue("codAmount"),
    });

    if (!result.success) {
      return;
    }

    await shipmentQuote.mutateAsync({
      originZoneId: form.getFieldValue("originZoneId"),
      destinationZoneId: form.getFieldValue("destinationZoneId"),
      weight: form.getFieldValue("weight"),
      codAmount: form.getFieldValue("codAmount"),
    });
  };

  return (
    <div className="rounded-xl border p-6">
      {/* Progress */}
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">Step {currentStep} of 4</p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* STEP 1 */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Delivery Zones</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Select the origin and destination of your shipment.
              </p>
            </div>

            <form.Field name="originZoneId">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="originZoneId" className="text-sm font-medium">
                    Origin Zone
                  </label>

                  <select
                    id="originZoneId"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    className="w-full rounded-md border bg-background px-4 py-3 text-sm"
                  >
                    <option value="">Select origin zone</option>

                    {activeZones.map((zone) => (
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
                  <label
                    htmlFor="destinationZoneId"
                    className="text-sm font-medium"
                  >
                    Destination Zone
                  </label>

                  <select
                    id="destinationZoneId"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    className="w-full rounded-md border bg-background px-4 py-3 text-sm"
                  >
                    <option value="">Select destination zone</option>

                    {activeZones.map((zone) => (
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
                type="submit"
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Next
              </button>
            </div>

            {(selectedOrigin || selectedDestination) && (
              <div className="rounded-lg border bg-muted/30 p-4">
                <h3 className="font-semibold">Zones Selected</h3>

                {selectedOrigin && (
                  <p className="mt-2 text-sm">Origin: {selectedOrigin.name}</p>
                )}

                {selectedDestination && (
                  <p className="mt-1 text-sm">
                    Destination: {selectedDestination.name}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Package Details</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Enter the package weight and cash-on-delivery amount.
              </p>
            </div>

            <form.Field name="weight">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="weight" className="text-sm font-medium">
                    Weight (kg)
                  </label>

                  <input
                    id="weight"
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="e.g. 2.5"
                    value={field.state.value === 0 ? "" : field.state.value}
                    onChange={(event) =>
                      field.handleChange(Number(event.target.value))
                    }
                    className="w-full rounded-md border bg-background px-4 py-3 text-sm"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="codAmount">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="codAmount" className="text-sm font-medium">
                    COD Amount (BDT)
                  </label>

                  <input
                    id="codAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g. 500"
                    value={field.state.value === 0 ? "" : field.state.value}
                    onChange={(event) =>
                      field.handleChange(Number(event.target.value))
                    }
                    className="w-full rounded-md border bg-background px-4 py-3 text-sm"
                  />
                </div>
              )}
            </form.Field>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="rounded-md border px-5 py-2.5 text-sm font-medium"
              >
                Back
              </button>

              <button
                type="submit"
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Quote & Review</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Review your shipment details and calculate the delivery charge.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm">
                Origin:{" "}
                <span className="font-medium">
                  {selectedOrigin?.name} ({selectedOrigin?.code})
                </span>
              </p>

              <p className="mt-2 text-sm">
                Destination:{" "}
                <span className="font-medium">
                  {selectedDestination?.name} ({selectedDestination?.code})
                </span>
              </p>

              <p className="mt-2 text-sm">
                Weight:{" "}
                <span className="font-medium">
                  {form.getFieldValue("weight")} kg
                </span>
              </p>

              <p className="mt-2 text-sm">
                COD Amount:{" "}
                <span className="font-medium">
                  BDT {form.getFieldValue("codAmount")}
                </span>
              </p>
            </div>

            {shipmentQuote.isError && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-600">
                  Failed to calculate delivery charge. Please try again.
                </p>
              </div>
            )}

            {shipmentQuote.isSuccess && shipmentQuote.data.data && (
              <div className="rounded-lg border bg-muted/30 p-5">
                <h3 className="font-semibold">Delivery Quote</h3>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Base Price</span>
                    <span>BDT {shipmentQuote.data.data.pricing.basePrice}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Weight Charge</span>
                    <span>
                      BDT {shipmentQuote.data.data.pricing.weightCharge}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>COD Charge</span>
                    <span>BDT {shipmentQuote.data.data.pricing.codCharge}</span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-base font-semibold">
                      <span>Delivery Charge</span>
                      <span>
                        BDT {shipmentQuote.data.data.pricing.deliveryCharge}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="rounded-md border px-5 py-2.5 text-sm font-medium"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleGetQuote}
                disabled={shipmentQuote.isPending}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                {shipmentQuote.isPending ? "Calculating..." : "Get Quote"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
