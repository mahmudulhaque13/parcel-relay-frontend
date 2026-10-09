import type { Metadata } from "next";
import Link from "next/link";

import TrackingForm from "@/components/tracking/tracking-form";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ParcelRelay | Smarter Courier & Delivery Management",
  description:
    "Ship with confidence using ParcelRelay. Manage shipments, track deliveries, and simplify your courier experience.",
};

const services = [
  {
    icon: Package,
    title: "Easy Shipment Booking",
    description:
      "Create shipments, enter delivery details, and manage your parcels from one place.",
    number: "01",
  },
  {
    icon: MapPin,
    title: "Shipment Tracking",
    description:
      "Stay informed about shipment progress and follow delivery updates.",
    number: "02",
  },
  {
    icon: Truck,
    title: "Reliable Delivery Workflow",
    description:
      "Coordinate pickups, courier assignments, and delivery operations efficiently.",
    number: "03",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your shipment",
    description:
      "Provide pickup and delivery details to get your parcel moving.",
  },
  {
    number: "02",
    title: "Follow its progress",
    description:
      "Use your account to review shipment information and status updates.",
  },
  {
    number: "03",
    title: "Complete the delivery",
    description:
      "Follow the shipment through the delivery workflow until completion.",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* Hero */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50 via-white to-slate-50" />
        <div className="absolute -right-24 top-10 -z-10 size-80 rounded-full bg-orange-100/50 blur-3xl" />

        <div className="mx-auto grid min-h-[610px] w-full max-w-[1440px] items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-10 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3.5 py-2 text-xs font-bold text-[#B84C32] shadow-sm sm:text-sm">
              <span className="size-2 rounded-full bg-[#E76F51]" />A smarter way
              to deliver
            </div>

            <h1 className="mt-6 max-w-2xl text-4xl font-black leading-[1.12] tracking-tight text-[#1D3557] sm:text-5xl lg:text-6xl">
              Every parcel.
              <br />
              Every mile.
              <br />
              <span className="text-[#E76F51]">Handled better.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Simplify shipping with ParcelRelay. Create shipments, manage
              deliveries, and keep your logistics moving with one connected
              platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1D3557] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#1D3557]/15 transition hover:-translate-y-0.5 hover:bg-[#29486f]"
              >
                Get started
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/services"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-[#1D3557] transition hover:border-slate-300 hover:bg-slate-50"
              >
                Explore services
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#E76F51]" />
                Simple shipment management
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#E76F51]" />
                Account-based access
              </span>
            </div>
          </div>

          {/* Visual illustration — no fake shipment data */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rounded-[2rem] bg-[#1D3557]/5 blur-xl" />

            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-[#1D3557]/10 sm:p-7">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Your delivery workspace
                  </p>
                  <h2 className="mt-1 text-lg font-extrabold text-[#1D3557]">
                    Shipping made simpler
                  </h2>
                </div>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-orange-50 text-[#E76F51]">
                  <PackageCheck className="size-6" />
                </span>
              </div>

              <div className="mt-6 rounded-2xl bg-[#1D3557] p-5 text-white sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-300">
                      One connected platform
                    </p>
                    <p className="mt-2 text-2xl font-extrabold sm:text-3xl">
                      From pickup
                      <br />
                      to delivery.
                    </p>
                  </div>
                  <Truck className="size-9 shrink-0 text-[#F4A261]" />
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <span className="h-1.5 flex-1 rounded-full bg-[#E76F51]" />
                  <span className="h-1.5 flex-1 rounded-full bg-white/40" />
                  <span className="h-1.5 flex-1 rounded-full bg-white/20" />
                </div>
                <div className="mt-2 flex justify-between text-xs text-slate-300">
                  <span>Pickup</span>
                  <span>In transit</span>
                  <span>Delivery</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-100 p-4">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-orange-50 text-[#E76F51]">
                    <Package className="size-5" />
                  </span>
                  <p className="mt-3 text-sm font-bold text-[#1D3557]">
                    Shipment management
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Keep shipment details organized.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 p-4">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-[#1D3557]">
                    <Clock3 className="size-5" />
                  </span>
                  <p className="mt-3 text-sm font-bold text-[#1D3557]">
                    Status updates
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Follow progress through your account.
                  </p>
                </div>
              </div>

              <p className="mt-5 text-center text-xs text-slate-400">
                A clearer view of your delivery workflow
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrackingForm />

      {/* Services */}
      <section className="mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-6 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#E76F51]">
            What we offer
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#1D3557] sm:text-4xl">
            Everything moving in one direction
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            A streamlined workspace for managing the essential stages of courier
            and shipment operations.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.number}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-900/5 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-orange-50 text-[#E76F51] transition group-hover:bg-[#E76F51] group-hover:text-white">
                    <Icon className="size-6" />
                  </span>
                  <span className="text-sm font-extrabold text-slate-300">
                    {service.number}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-extrabold text-[#1D3557]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {service.description}
                </p>

                <Link
                  href="/services"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1D3557] transition group-hover:text-[#E76F51]"
                >
                  Explore service
                  <ArrowRight className="size-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-6 sm:py-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#E76F51]">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#1D3557] sm:text-4xl">
                Three steps to a smoother shipment
              </h2>
              <p className="mt-5 leading-7 text-slate-600">
                Manage the process through your ParcelRelay account, from
                creating a shipment to following its delivery progress.
              </p>

              <Link
                href="/register"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#1D3557] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#29486f]"
              >
                Create your account
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 sm:gap-6 sm:p-6"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-sm font-black text-[#E76F51]">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-[#1D3557]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-[#1D3557] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/10 text-[#F4A261]">
            <PackageCheck className="size-7" />
          </div>

          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl">
            Ready to simplify your delivery operations?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
            Get started with ParcelRelay and manage your shipments through one
            connected platform.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#E76F51] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#d65e41]"
            >
              Get started
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
