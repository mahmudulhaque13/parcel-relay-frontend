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
      "Create shipments, enter delivery details, and manage your parcels from one convenient workspace.",
    number: "01",
  },
  {
    icon: MapPin,
    title: "Shipment Tracking",
    description:
      "Stay informed about shipment progress and review delivery updates through your account.",
    number: "02",
  },
  {
    icon: Truck,
    title: "Reliable Delivery Workflow",
    description:
      "Coordinate pickups, courier assignments, and delivery operations with a structured workflow.",
    number: "03",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your shipment",
    description:
      "Provide the pickup and delivery details to get your parcel moving.",
  },
  {
    number: "02",
    title: "Follow its progress",
    description:
      "Review shipment information and follow status updates through your account.",
  },
  {
    number: "03",
    title: "Complete the delivery",
    description:
      "Follow your shipment through the delivery workflow until completion.",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-white text-slate-700">
      {/* Hero */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#f8fafc] via-white to-orange-50/70" />

        <div className="absolute -right-24 top-0 -z-10 size-80 rounded-full bg-orange-200/20 blur-3xl sm:size-[28rem]" />

        <div className="absolute -left-32 bottom-0 -z-10 size-80 rounded-full bg-blue-100/30 blur-3xl" />

        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-orange-200/80 bg-white/90 px-4 py-2 text-xs font-bold text-[#B84C32] shadow-sm sm:text-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#E76F51]/40" />
                <span className="relative inline-flex size-2 rounded-full bg-[#E76F51]" />
              </span>
              A smarter way to deliver
            </div>

            <h1 className="mt-6 max-w-2xl text-4xl font-black leading-[1.1] tracking-tight text-[#1D3557] sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
              Every parcel.
              <br />
              Every mile.
              <br />
              <span className="text-[#E76F51]">Handled better.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Simplify shipping with ParcelRelay. Create shipments, manage
              deliveries, and keep your logistics moving through one connected
              platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1D3557] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#1D3557]/15 transition duration-200 hover:-translate-y-0.5 hover:bg-[#29486f] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
              >
                Get started
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/services"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-6 py-3 text-sm font-bold text-[#1D3557] transition duration-200 hover:border-[#1D3557]/25 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
              >
                Explore services
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-[#E76F51]" />
                Simple shipment management
              </span>

              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="size-4 shrink-0 text-[#E76F51]" />
                Account-based access
              </span>
            </div>
          </div>

          {/* Product-style illustration; no fabricated shipment metrics */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="absolute -inset-4 rounded-[2rem] bg-[#1D3557]/[0.06] blur-2xl sm:-inset-6" />

            <div className="relative rounded-[1.75rem] border border-slate-200/80 bg-white/95 p-4 shadow-2xl shadow-[#1D3557]/[0.08] sm:rounded-[2rem] sm:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
                    Your delivery workspace
                  </p>
                  <h2 className="mt-2 text-lg font-extrabold tracking-tight text-[#1D3557] sm:text-xl">
                    Shipping made simpler
                  </h2>
                </div>

                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-[#E76F51] ring-1 ring-orange-100 sm:size-12">
                  <PackageCheck className="size-6" />
                </span>
              </div>

              <div className="mt-5 rounded-2xl bg-gradient-to-br from-[#1D3557] to-[#29486f] p-5 text-white sm:mt-6 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-blue-100">
                      One connected platform
                    </p>
                    <p className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                      From pickup
                      <br />
                      to delivery.
                    </p>
                  </div>

                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#F4A261] ring-1 ring-white/10 sm:size-12">
                    <Truck className="size-6" />
                  </span>
                </div>

                <div
                  className="mt-7 flex items-center gap-2"
                  aria-hidden="true"
                >
                  <span className="h-1.5 flex-1 rounded-full bg-[#E76F51]" />
                  <span className="h-1.5 flex-1 rounded-full bg-white/40" />
                  <span className="h-1.5 flex-1 rounded-full bg-white/20" />
                </div>

                <div className="mt-2 flex justify-between gap-2 text-[11px] font-medium text-blue-100 sm:text-xs">
                  <span>Pickup</span>
                  <span>In transit</span>
                  <span>Delivery</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 transition-colors hover:border-orange-100 hover:bg-orange-50/30 sm:p-4">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-orange-50 text-[#E76F51]">
                    <Package className="size-5" />
                  </span>

                  <h3 className="mt-3 text-sm font-bold leading-5 text-[#1D3557]">
                    Shipment management
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-slate-500">
                    Keep shipment details organized.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 transition-colors hover:border-blue-100 hover:bg-blue-50/30 sm:p-4">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-[#1D3557]">
                    <Clock3 className="size-5" />
                  </span>

                  <h3 className="mt-3 text-sm font-bold leading-5 text-[#1D3557]">
                    Status updates
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-slate-500">
                    Follow progress through your account.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-400">
                <ShieldCheck className="size-4 text-[#E76F51]" />A clearer view
                of your delivery workflow
              </div>
            </div>

            <div className="absolute -bottom-4 -left-2 -z-10 size-20 rounded-3xl bg-orange-100/60 sm:-bottom-5 sm:-left-5 sm:size-24" />
          </div>
        </div>
      </section>

      {/* Shipment tracking */}
      <section
        id="tracking"
        className="scroll-mt-24 border-y border-slate-100 bg-slate-50/80"
      >
        <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
          <TrackingForm />
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E76F51] sm:text-sm">
            What we offer
          </p>

          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#1D3557] sm:text-4xl">
            Everything moving in one direction
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            A streamlined workspace for managing the essential stages of courier
            and shipment operations.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.number}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-900/[0.02] transition duration-300 hover:-translate-y-1 hover:border-[#E76F51]/30 hover:shadow-xl hover:shadow-[#1D3557]/[0.06] sm:p-7 lg:p-8"
              >
                <span className="absolute right-5 top-5 text-sm font-extrabold tracking-wider text-slate-200 transition-colors group-hover:text-[#E76F51]/40">
                  {service.number}
                </span>

                <span className="flex size-12 items-center justify-center rounded-2xl bg-orange-50 text-[#E76F51] ring-1 ring-orange-100/80 transition duration-200 group-hover:bg-[#E76F51] group-hover:text-white">
                  <Icon className="size-6" />
                </span>

                <h3 className="mt-6 text-lg font-extrabold leading-snug text-[#1D3557] sm:text-xl">
                  {service.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                  {service.description}
                </p>

                <Link
                  href="/services"
                  className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#1D3557] transition-colors hover:text-[#E76F51] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
                >
                  Explore service
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden bg-slate-50">
        <div className="absolute -right-32 top-0 size-80 rounded-full bg-orange-100/40 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E76F51] sm:text-sm">
                How it works
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#1D3557] sm:text-4xl">
                Three steps to a smoother shipment
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                Manage the process through your ParcelRelay account, from
                creating a shipment to following its delivery progress.
              </p>

              <Link
                href="/register"
                className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1D3557] px-5 py-3 text-sm font-bold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#29486f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
              >
                Create your account
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/[0.02] transition duration-200 hover:border-[#1D3557]/20 hover:shadow-md sm:gap-6 sm:p-6"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-sm font-black text-[#E76F51] ring-1 ring-orange-100 sm:size-12">
                    {step.number}
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-base font-extrabold leading-snug text-[#1D3557] sm:text-lg">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#1D3557] to-[#142943] px-6 py-12 text-center shadow-xl shadow-[#1D3557]/10 sm:rounded-[2rem] sm:px-12 sm:py-16">
          <div className="absolute -right-20 -top-24 size-64 rounded-full bg-white/[0.04] blur-2xl" />
          <div className="absolute -bottom-32 -left-20 size-72 rounded-full bg-[#E76F51]/10 blur-2xl" />

          <div className="relative">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/10 text-[#F4A261] ring-1 ring-white/10">
              <PackageCheck className="size-7" />
            </span>

            <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
              Ready to simplify your delivery operations?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Get started with ParcelRelay and manage your shipments through one
              connected platform.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#E76F51] px-6 py-3 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#d65e41] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Get started
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/login"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-sm font-bold text-white transition duration-200 hover:border-white/50 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
