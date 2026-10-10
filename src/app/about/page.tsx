import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";

const features = [
  {
    icon: PackageCheck,
    title: "Simple Shipment Creation",
    description:
      "Create a shipment by selecting pickup and destination zones, package details, and recipient information.",
  },
  {
    icon: Truck,
    title: "Courier Delivery",
    description:
      "Assigned couriers can manage shipments and update delivery progress through the courier dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Shipment payments are processed through the integrated payment flow before delivery assignment.",
  },
  {
    icon: MapPin,
    title: "Shipment Tracking",
    description:
      "Customers can view shipment status and follow the progress of their deliveries through the timeline.",
  },
];

const roles = [
  {
    icon: Users,
    title: "Customers",
    description:
      "Create shipments, complete payments, track deliveries, and manage your profile from one dashboard.",
    number: "01",
  },
  {
    icon: Truck,
    title: "Couriers",
    description:
      "View assigned shipments, manage delivery status, and keep shipment progress up to date.",
    number: "02",
  },
  {
    icon: Boxes,
    title: "Admins",
    description:
      "Manage users, shipments, courier assignments, payments, and operational reports.",
    number: "03",
  },
];

const highlights = [
  {
    icon: PackageCheck,
    title: "Ship",
    description: "Create and manage delivery requests.",
  },
  {
    icon: Truck,
    title: "Deliver",
    description: "Couriers manage assigned shipments.",
  },
  {
    icon: MapPin,
    title: "Track",
    description: "Follow shipment status and timeline.",
  },
  {
    icon: ShieldCheck,
    title: "Manage",
    description: "Structured operations for every role.",
  },
];

export const metadata: Metadata = { title: "About ParcelRelay | Courier & Logistics", description: "Learn how ParcelRelay connects customers, couriers, and administrators through shipment management, delivery tracking, and online payments." };

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-700">
      {/* Hero */}
      <section className="relative isolate border-b border-slate-100">
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-slate-50 via-white to-orange-50/70" />
        <div className="absolute -right-24 -top-16 -z-10 size-80 rounded-full bg-orange-200/20 blur-3xl sm:size-[28rem]" />
        <div className="absolute -bottom-20 -left-24 -z-10 size-72 rounded-full bg-blue-100/30 blur-3xl" />

        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:flex-row lg:items-center lg:gap-16 lg:px-10 lg:py-24">
          <div className="max-w-3xl flex-1">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-orange-200/80 bg-white/90 px-4 py-2 text-xs font-bold text-[#B84C32] shadow-sm sm:text-sm">
              <span className="flex size-8 items-center justify-center rounded-full bg-orange-50 text-[#E76F51]">
                <PackageCheck className="size-4" />
              </span>
              ParcelRelay Delivery Platform
            </div>

            <h1 className="mt-6 text-4xl font-black leading-[1.12] tracking-tight text-[#1D3557] sm:text-5xl lg:text-6xl">
              Delivery management made{" "}
              <span className="text-[#E76F51]">simple.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              ParcelRelay is a delivery management platform designed to connect
              customers, couriers, and administrators in one streamlined system.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1D3557] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#1D3557]/15 transition duration-200 hover:-translate-y-0.5 hover:bg-[#29486f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
              >
                Create an Account
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/services"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-6 py-3 text-sm font-bold text-[#1D3557] transition-colors hover:border-[#1D3557]/25 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
              >
                Explore Services
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-[#E76F51]" />
                Connected workflows
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="size-4 shrink-0 text-[#E76F51]" />
                Role-based access
              </span>
            </div>
          </div>

          {/* Platform overview */}
          <div className="relative mx-auto w-full max-w-xl flex-1 lg:ml-auto">
            <div className="absolute -inset-4 rounded-[2rem] bg-[#1D3557]/[0.06] blur-2xl sm:-inset-6" />

            <div className="relative rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-2xl shadow-[#1D3557]/[0.08] sm:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
                    One connected platform
                  </p>
                  <h2 className="mt-2 text-xl font-extrabold tracking-tight text-[#1D3557]">
                    The delivery journey
                  </h2>
                </div>

                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-[#E76F51] ring-1 ring-orange-100">
                  <PackageCheck className="size-6" />
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {highlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-colors hover:border-orange-100 hover:bg-orange-50/30 sm:p-5"
                    >
                      <span className="flex size-10 items-center justify-center rounded-xl bg-orange-50 text-[#E76F51]">
                        <Icon className="size-5" />
                      </span>

                      <h3 className="mt-4 text-base font-extrabold text-[#1D3557]">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl bg-gradient-to-br from-[#1D3557] to-[#29486f] p-5 text-white sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                  Designed for collaboration
                </p>

                <p className="mt-2 text-lg font-extrabold leading-snug sm:text-xl">
                  Customers, couriers, and admins.
                  <br />
                  One connected workflow.
                </p>

                <div className="mt-5 flex gap-2" aria-hidden="true">
                  <span className="h-1.5 flex-1 rounded-full bg-[#E76F51]" />
                  <span className="h-1.5 flex-1 rounded-full bg-white/50" />
                  <span className="h-1.5 flex-1 rounded-full bg-white/25" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E76F51] sm:text-sm">
              About ParcelRelay
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#1D3557] sm:text-4xl">
              One platform for the complete delivery journey.
            </h2>
          </div>

          <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base">
            <p>
              ParcelRelay brings the main parts of a delivery workflow together
              in one platform. Customers can create shipments and complete
              payments, while couriers can manage assigned deliveries and update
              shipment progress.
            </p>

            <p>
              Administrators have dedicated tools for managing users, shipments,
              courier assignments, payments, and operational reports. This
              role-based structure keeps each workflow focused on the
              responsibilities of the user.
            </p>

            <p>
              The platform is designed around a clear shipment lifecycle, from
              creating a shipment and processing its payment to courier
              assignment, delivery progress, and shipment completion.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative overflow-hidden border-y border-slate-100 bg-slate-50/80">
        <div className="absolute -right-32 top-0 size-80 rounded-full bg-orange-100/40 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E76F51] sm:text-sm">
              What ParcelRelay Provides
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#1D3557] sm:text-4xl">
              Everything connected in one workflow
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              The platform connects shipment creation, payment, delivery
              operations, and tracking into a single experience.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-900/[0.02] transition duration-300 hover:-translate-y-1 hover:border-[#E76F51]/30 hover:shadow-xl hover:shadow-[#1D3557]/[0.06]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-orange-50 text-[#E76F51] ring-1 ring-orange-100 transition-colors group-hover:bg-[#E76F51] group-hover:text-white">
                      <Icon className="size-5" />
                    </span>

                    <span className="text-sm font-extrabold tracking-wider text-slate-200 transition-colors group-hover:text-[#E76F51]/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 text-base font-extrabold leading-snug text-[#1D3557]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E76F51] sm:text-sm">
            Built Around Three Roles
          </p>

          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#1D3557] sm:text-4xl">
            A focused experience for every user
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Each role gets the tools needed for its part of the delivery
            workflow.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-12">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <article
                key={role.title}
                className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-900/[0.02] transition duration-300 hover:-translate-y-1 hover:border-[#E76F51]/30 hover:shadow-xl hover:shadow-[#1D3557]/[0.06] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-orange-50 text-[#E76F51] ring-1 ring-orange-100 transition-colors group-hover:bg-[#E76F51] group-hover:text-white">
                    <Icon className="size-6" />
                  </span>

                  <span className="text-sm font-extrabold tracking-wider text-slate-200">
                    {role.number}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-extrabold text-[#1D3557]">
                  {role.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {role.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-100 bg-slate-50/80 px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <div className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-7 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1D3557] to-[#142943] px-6 py-10 shadow-xl shadow-[#1D3557]/10 sm:px-10 sm:py-12 md:flex-row md:items-center md:justify-between lg:px-12">
          <div className="absolute -right-16 -top-24 size-64 rounded-full bg-white/[0.04] blur-2xl" />

          <div className="relative">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#F4A261] sm:text-sm">
              Get started with ParcelRelay
            </p>

            <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl">
              Ready to manage your deliveries?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
              Create your account and start using ParcelRelay.
            </p>
          </div>

          <div className="relative flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#E76F51] px-6 py-3 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#d65e41] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Get Started
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-white/50 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Contact Us
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
