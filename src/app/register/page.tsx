import {
  ArrowLeft,
  CheckCircle2,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/components/auth/register-form";

const benefits = [
  "Create and manage shipments",
  "Track delivery progress",
  "Access your personalized dashboard",
];

export const metadata: Metadata = {
  title: "Create Account | ParcelRelay",
  description:
    "Create a ParcelRelay customer account to book shipments and track deliveries.",
};

export default function RegisterPage() {
  return (
    <main className="relative isolate min-h-[calc(100vh-76px)] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50/60 px-4 py-10 transition-colors duration-200 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 sm:px-6 sm:py-14 dark:to-slate-950 dark:via-slate-900">
      <div className="absolute -right-24 top-10 -z-10 size-80 rounded-full bg-orange-200/20 blur-3xl dark:bg-orange-500/[0.06] sm:size-96" />
      <div className="absolute -bottom-24 -left-24 -z-10 size-80 rounded-full bg-blue-100/30 blur-3xl dark:bg-blue-500/[0.06]" />

      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[#1D3557] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51] dark:text-slate-300 dark:hover:text-white dark:text-slate-400"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>

        <div className="grid overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-xl shadow-[#1D3557]/[0.06] transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/20 lg:grid-cols-[0.9fr_1.1fr] dark:bg-slate-900/95">
          {/* Brand panel */}
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
                Get started today
              </p>

              <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white xl:text-4xl">
                Start managing your deliveries with ease.
              </h1>

              <p className="mt-5 text-sm leading-7 text-slate-300 xl:text-base">
                Create your ParcelRelay account to create shipments, complete
                payments, and track your deliveries from one place.
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
                    One connected platform
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-300">
                    From shipment creation to delivery tracking
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Registration form */}
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

                <span className="text-xl font-extrabold tracking-tight text-[#1D3557] dark:text-white dark:text-foreground">
                  Parcel<span className="text-[#E76F51]">Relay</span>
                </span>
              </Link>

              <h2 className="mt-6 text-2xl font-black tracking-tight text-[#1D3557] dark:text-white sm:text-3xl dark:text-foreground">
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300 dark:text-slate-400">
                Register to start using ParcelRelay.
              </p>
            </div>

            <div className="mb-6 flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 transition-colors duration-200 dark:border-slate-700 dark:bg-slate-800 dark:border-slate-800 dark:bg-slate-950/80">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#E76F51]" />

              <p className="text-xs leading-5 text-slate-600 dark:text-slate-200 dark:text-slate-300">
                Set up your account to access shipment management and delivery
                tracking features.
              </p>
            </div>

            <RegisterForm />

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              By creating an account, you can access your personalized
              ParcelRelay workspace.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
