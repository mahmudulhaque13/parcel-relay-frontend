import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  MapPin,
  Package,
  Route,
  ShieldCheck,
  Truck,
} from "lucide-react";

const services = [
  {
    icon: Package,
    title: "Shipment Creation",
    description:
      "Create delivery requests with origin and destination zones, package details, recipient information, and COD amount.",
  },
  {
    icon: Route,
    title: "Delivery Quote",
    description:
      "Get a delivery charge based on the selected zones, package weight, and cash-on-delivery amount before creating the shipment.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description:
      "Complete the required shipment payment through the integrated online payment flow before delivery assignment.",
  },
  {
    icon: Truck,
    title: "Courier Assignment",
    description:
      "Once payment requirements are completed, shipments can be assigned to couriers for delivery operations.",
  },
  {
    icon: MapPin,
    title: "Shipment Tracking",
    description:
      "View shipment status and follow delivery progress through the shipment timeline.",
  },
  {
    icon: ClipboardCheck,
    title: "Delivery Management",
    description:
      "Couriers can view assigned shipments and update delivery progress through their dedicated dashboard.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Create your shipment",
    description:
      "Select the origin and destination zones, provide package information, and add recipient details.",
  },
  {
    step: "02",
    title: "Review your quote",
    description:
      "Review the calculated delivery charge before confirming the shipment.",
  },
  {
    step: "03",
    title: "Complete payment",
    description:
      "Continue through the integrated payment flow to complete the required shipment payment.",
  },
  {
    step: "04",
    title: "Track delivery",
    description:
      "Follow your shipment status and timeline while the delivery moves through its lifecycle.",
  },
];

const lifecycle = [
  {
    number: "1",
    title: "Customer creates shipment",
    description:
      "Shipment and recipient information are submitted through the customer workflow.",
  },
  {
    number: "2",
    title: "Payment is processed",
    description:
      "The customer continues through the integrated payment process.",
  },
  {
    number: "3",
    title: "Courier manages delivery",
    description:
      "Assigned couriers can view shipments and update their delivery status.",
  },
  {
    number: "4",
    title: "Customer tracks progress",
    description:
      "Shipment status and timeline events remain available to follow the delivery journey.",
  },
];

export const metadata: Metadata = { title: "Services | ParcelRelay", description: "Explore ParcelRelay shipment creation, delivery quotes, online payment, courier operations, and shipment tracking." };

export default function ServicesPage() {
  return (
    <main className="overflow-hidden bg-white text-slate-700">
      {/* Hero */}
      <section className="relative isolate border-b border-slate-100">
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-slate-50 via-white to-orange-50/70" />
        <div className="absolute -right-24 -top-20 -z-10 size-80 rounded-full bg-orange-200/20 blur-3xl sm:size-[28rem]" />
        <div className="absolute -bottom-20 -left-24 -z-10 size-72 rounded-full bg-blue-100/30 blur-3xl" />

        <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-orange-200/80 bg-white/90 px-4 py-2 text-xs font-bold text-[#B84C32] shadow-sm sm:text-sm">
              <span className="flex size-8 items-center justify-center rounded-full bg-orange-50 text-[#E76F51]">
                <Truck className="size-4" />
              </span>
              ParcelRelay Services
            </div>

            <h1 className="mt-6 text-4xl font-black leading-[1.12] tracking-tight text-[#1D3557] sm:text-5xl lg:text-6xl">
              Everything you need to manage a{" "}
              <span className="text-[#E76F51]">delivery.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              ParcelRelay connects shipment creation, delivery quotes, payments,
              courier operations, and shipment tracking in one delivery
              management platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1D3557] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#1D3557]/15 transition duration-200 hover:-translate-y-0.5 hover:bg-[#29486f] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
              >
                Start Shipping
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/about"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-6 py-3 text-sm font-bold text-[#1D3557] transition-colors hover:border-[#1D3557]/25 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
              >
                About ParcelRelay
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-[#E76F51]" />
                Connected shipment workflow
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="size-4 shrink-0 text-[#E76F51]" />
                Role-based operations
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E76F51] sm:text-sm">
            Our Services
          </p>

          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#1D3557] sm:text-4xl">
            A connected delivery workflow
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Each service supports a specific part of the shipment lifecycle,
            from creating a shipment to tracking its delivery progress.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="group relative flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-900/[0.02] transition duration-300 hover:-translate-y-1 hover:border-[#E76F51]/30 hover:shadow-xl hover:shadow-[#1D3557]/[0.06] sm:p-7"
              >
                <span className="absolute right-5 top-5 text-sm font-extrabold tracking-wider text-slate-200 transition-colors group-hover:text-[#E76F51]/50">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="flex size-12 items-center justify-center rounded-2xl bg-orange-50 text-[#E76F51] ring-1 ring-orange-100/80 transition-colors group-hover:bg-[#E76F51] group-hover:text-white">
                  <Icon className="size-6" />
                </span>

                <h3 className="mt-6 text-lg font-extrabold leading-snug text-[#1D3557] sm:text-xl">
                  {service.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                  {service.description}
                </p>

                <div
                  aria-hidden="true"
                  className="mt-6 h-px w-full bg-slate-100 transition-colors group-hover:bg-orange-100"
                />
              </article>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden border-y border-slate-100 bg-slate-50/80">
        <div className="absolute -right-32 top-0 size-80 rounded-full bg-orange-100/40 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E76F51] sm:text-sm">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#1D3557] sm:text-4xl">
              From shipment request to delivery
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              ParcelRelay keeps the main steps of the delivery process connected
              in a single workflow.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {workflow.map((item) => (
              <article
                key={item.step}
                className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-900/[0.02] transition duration-200 hover:-translate-y-1 hover:border-[#E76F51]/30 hover:shadow-lg hover:shadow-[#1D3557]/[0.05] sm:p-7"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-orange-50 text-sm font-black text-[#E76F51] ring-1 ring-orange-100 transition-colors group-hover:bg-[#E76F51] group-hover:text-white">
                  {item.step}
                </span>

                <h3 className="mt-5 text-base font-extrabold leading-snug text-[#1D3557] sm:text-lg">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Shipment lifecycle and trust */}
      <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <span className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-orange-50 text-[#E76F51] ring-1 ring-orange-100">
              <ShieldCheck className="size-6" />
            </span>

            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E76F51] sm:text-sm">
              Built around your workflow
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#1D3557] sm:text-4xl">
              Designed around a clear shipment lifecycle
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              ParcelRelay keeps payment, assignment, delivery status, and
              shipment tracking connected so that each role can work with the
              information relevant to its responsibilities.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-5 sm:p-7">
            <div className="space-y-0">
              {lifecycle.map((item, index) => (
                <div key={item.number} className="flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#1D3557] text-sm font-bold text-white">
                      {item.number}
                    </span>

                    {index !== lifecycle.length - 1 && (
                      <span className="mt-2 min-h-6 w-px flex-1 bg-slate-200" />
                    )}
                  </div>

                  <div className="min-w-0 pb-1">
                    <h3 className="text-sm font-extrabold leading-6 text-[#1D3557] sm:text-base">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
              Ready to send a shipment?
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Sign in to your account and start the shipment process.
            </p>
          </div>

          <Link
            href="/login"
            className="relative inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#E76F51] px-6 py-3 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#d65e41] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Start Shipping
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
