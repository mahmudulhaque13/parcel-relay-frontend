"use client";

import { useState } from "react";
import { useTracking } from "@/hooks/use-tracking";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  MapPin,
  PackageSearch,
  Truck,
} from "lucide-react";

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function TrackingForm() {
  const [input, setInput] = useState("");
  const [submittedNumber, setSubmittedNumber] = useState<string | null>(null);
  const [validationError, setValidationError] = useState("");

  const trackingQuery = useTracking(submittedNumber);
  const result = trackingQuery.data?.data;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trackingNumber = input.trim();

    if (!trackingNumber) {
      setValidationError("Please enter your tracking number.");
      setSubmittedNumber(null);
      return;
    }

    setValidationError("");
    setSubmittedNumber(trackingNumber);
  }

  return (
    <section
      id="track-shipment"
      className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
        <div className="bg-[#1D3557] px-6 py-8 text-white sm:px-9 sm:py-10">
          <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/10 text-[#F4A261]">
            <PackageSearch className="size-6" />
          </span>

          <h2 className="mt-4 text-2xl font-black sm:text-3xl">
            Track your shipment
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            Enter your tracking number to check the latest shipment status and
            available tracking updates.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <label className="sr-only" htmlFor="tracking-number">
              Tracking number
            </label>

            <input
              id="tracking-number"
              name="trackingNumber"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setValidationError("");
              }}
              placeholder="Enter your tracking number"
              autoComplete="off"
              className="min-h-12 min-w-0 flex-1 rounded-xl border border-white/20 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/30"
              aria-invalid={Boolean(validationError)}
              aria-describedby={
                validationError ? "tracking-validation-error" : undefined
              }
            />

            <button
              type="submit"
              disabled={trackingQuery.isFetching}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#E76F51] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#d65e41] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {trackingQuery.isFetching ? "Searching..." : "Track parcel"}
              {!trackingQuery.isFetching && <ArrowRight className="size-4" />}
            </button>
          </form>

          {validationError && (
            <p
              id="tracking-validation-error"
              role="alert"
              className="mt-3 text-sm font-medium text-orange-200"
            >
              {validationError}
            </p>
          )}
        </div>

        <div className="p-6 sm:p-9">
          {trackingQuery.isFetching && (
            <div
              role="status"
              className="flex items-center gap-3 py-5 text-sm text-slate-600"
            >
              <span
                className="size-6 animate-spin rounded-full border-2 border-slate-200 border-t-[#E76F51]"
                aria-hidden="true"
              />
              Searching for your shipment...
            </div>
          )}

          {trackingQuery.isError && !trackingQuery.isFetching && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4"
            >
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-600" />

              <div>
                <h3 className="font-bold text-red-800">
                  Unable to find shipment
                </h3>
                <p className="mt-1 text-sm leading-6 text-red-700">
                  No shipment found with this tracking number. Please check the
                  number and try again.
                </p>
              </div>
            </div>
          )}

          {trackingQuery.isSuccess && result && (
            <div>
              <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Tracking number
                  </p>
                  <p className="mt-1 break-all font-bold text-[#1D3557]">
                    {result.trackingNumber}
                  </p>
                </div>

                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-sm font-bold text-green-800">
                  <CheckCircle2 className="size-4" />
                  {formatStatus(result.currentStatus)}
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#1D3557]">
                    <MapPin className="size-4 text-[#E76F51]" />
                    Origin
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    {result.originZone?.name ?? "Not available"}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#1D3557]">
                    <Truck className="size-4 text-[#E76F51]" />
                    Destination
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    {result.destinationZone?.name ?? "Not available"}
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <h3 className="flex items-center gap-2 font-extrabold text-[#1D3557]">
                  <Clock3 className="size-5 text-[#E76F51]" />
                  Shipment timeline
                </h3>

                {result.timeline?.length ? (
                  <ol className="mt-5 space-y-5">
                    {result.timeline.map((event, index) => (
                      <li
                        key={`${event.status}-${event.createdAt}-${index}`}
                        className="flex gap-3"
                      >
                        <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-50 text-[#E76F51]">
                          <CheckCircle2 className="size-4" />
                        </span>

                        <div className="min-w-0 flex-1 border-b border-slate-100 pb-4">
                          <p className="font-bold text-[#1D3557]">
                            {formatStatus(event.status)}
                          </p>

                          {event.description && (
                            <p className="mt-1 text-sm leading-6 text-slate-600">
                              {event.description}
                            </p>
                          )}

                          {event.location && (
                            <p className="mt-1 text-sm text-slate-500">
                              {event.location}
                            </p>
                          )}

                          <time
                            dateTime={event.createdAt}
                            className="mt-2 block text-xs text-slate-400"
                          >
                            {new Date(event.createdAt).toLocaleString()}
                          </time>
                        </div>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                    No tracking events are available yet.
                  </p>
                )}
              </div>
            </div>
          )}

          {!submittedNumber &&
            !validationError &&
            !trackingQuery.isFetching && (
              <p className="text-center text-sm leading-6 text-slate-500">
                Your shipment status and timeline will appear here after you
                submit a tracking number.
              </p>
            )}
        </div>
      </div>
    </section>
  );
}
