import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

import CourierRegisterForm from "@/components/auth/courier-register-form";

const benefits = [
  "Submit your courier application",
  "Verify your email address",
  "Get reviewed by the administration team",
];

export default function CourierRegisterPage() {
  return (
    <main className="relative isolate min-h-[calc(100vh-76px)] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50/60 px-4 py-10 sm:px-6 sm:py-14">
      <div className="absolute -right-24 top-10 -z-10 size-80 rounded-full bg-orange-200/20 blur-3xl sm:size-96" />
      <div className="absolute -bottom-24 -left-24 -z-10 size-80 rounded-full bg-blue-100/30 blur-3xl" />

      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[#1D3557] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>

        <div className="grid overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-xl shadow-[#1D3557]/[0.06] lg:grid-cols-[0.9fr_1.1fr]">
          <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#1D3557] to-[#142943] p-8 text-white sm:p-10 lg:flex lg:flex-col lg:justify-between xl:p-12">
            <div className="absolute -right-16 -top-16 size-64 rounded-full bg-white/[0.04] blur-2xl" />
            <div className="absolute -bottom-20 -left-16 size-64 rounded-full bg-[#E76F51]/10 blur-2xl" />

            <div className="relative">
              <Link
                href="/"
                aria-label="ParcelRelay home"
                className="inline-flex items-center gap-3"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
                  <PackageCheck className="size-6" />
                </span>

                <span className="text-2xl font-extrabold tracking-tight">
                  Parcel<span className="text-[#E76F51]">Relay</span>
                </span>
              </Link>

              <p className="mt-12 text-xs font-extrabold uppercase tracking-[0.2em] text-[#F4A261]">
                Become a delivery partner
              </p>

              <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white xl:text-4xl">
                Join ParcelRelay as a courier.
              </h1>

              <p className="mt-5 text-sm leading-7 text-slate-300 xl:text-base">
                Submit your courier application, verify your email, and get
                reviewed by the ParcelRelay administration team.
              </p>

              <div className="mt-8 space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#F4A261]">
                      <CheckCircle2 className="size-4" />
                    </span>

                    <span className="text-sm font-medium text-slate-200">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-12 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-[#F4A261]">
                  <Truck className="size-5" />
                </span>

                <div>
                  <p className="text-sm font-bold text-white">
                    Grow with ParcelRelay
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-300">
                    Apply today to begin your courier journey
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="min-w-0 p-6 sm:p-9 lg:p-10 xl:p-12">
            <div className="mb-7 sm:mb-8">
              <Link
                href="/"
                aria-label="ParcelRelay home"
                className="inline-flex items-center gap-2 lg:hidden"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#1D3557] text-white">
                  <PackageCheck className="size-5" />
                </span>

                <span className="text-xl font-extrabold tracking-tight text-[#1D3557]">
                  Parcel<span className="text-[#E76F51]">Relay</span>
                </span>
              </Link>

              <h2 className="mt-6 text-2xl font-black tracking-tight text-[#1D3557] sm:text-3xl">
                Courier application
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Complete the form below to apply as a ParcelRelay courier.
              </p>
            </div>

            <div className="mb-6 flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#E76F51]" />

              <p className="text-xs leading-5 text-slate-600">
                Your application will be reviewed by the ParcelRelay
                administration team. Complete the form accurately.
              </p>
            </div>

            <CourierRegisterForm />
          </section>
        </div>
      </div>
    </main>
  );
}
