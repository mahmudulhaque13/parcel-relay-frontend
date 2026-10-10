import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  MapPinned,
  Package,
  Scale,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Delivery Pricing & Quotes | ParcelRelay",
  description:
    "Learn how ParcelRelay calculates delivery quotes using route zones, package weight, and applicable cash-on-delivery charges.",
  openGraph: {
    title: "Delivery Pricing & Quotes | ParcelRelay",
    description:
      "Review the factors used for a ParcelRelay delivery quote before creating a shipment.",
  },
};

const factors = [
  {
    icon: MapPinned,
    title: "Origin and destination zones",
    description:
      "The selected pickup and delivery zones determine which configured delivery pricing rule applies.",
  },
  {
    icon: Scale,
    title: "Package weight",
    description:
      "Package weight is included in the quote according to the active pricing rule configured for the route.",
  },
  {
    icon: Package,
    title: "Cash-on-delivery amount",
    description:
      "If cash on delivery applies, its configured percentage is included in the quote calculation.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-[70vh] bg-white text-slate-700">
      <section className="border-b border-slate-100 bg-gradient-to-br from-slate-50 via-white to-orange-50/70">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-bold text-[#B84C32] sm:text-sm">
              <Calculator className="size-4" />
              Transparent delivery quotes
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-[#1D3557] sm:text-5xl lg:text-6xl">
              Know your delivery charge before you ship.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              ParcelRelay calculates a shipment quote from the pricing rules
              configured for your route and package. The exact amount is shown
              in the shipment workflow before you confirm the request.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1D3557] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#1D3557]/15 transition hover:-translate-y-0.5 hover:bg-[#29486f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
              >
                Get a shipment quote
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-[#1D3557] transition hover:bg-slate-50"
              >
                Need help?
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 py-14 sm:px-6 sm:py-16 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E76F51] sm:text-sm">
            Quote factors
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#1D3557] sm:text-4xl">
            What affects your price?
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Quotes use the active pricing configuration rather than a static
            price advertised on this page.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {factors.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-orange-50 text-[#E76F51] ring-1 ring-orange-100">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-extrabold text-[#1D3557]">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 size-5 shrink-0 text-[#E76F51]" />
            <div>
              <h2 className="font-extrabold text-[#1D3557]">Payment clarity</h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                Review the generated quote in the customer shipment flow. Online
                payment is handled through the integrated payment provider; do
                not treat this information page as a payment confirmation.
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
            <CheckCircle2 className="size-4 text-[#E76F51]" />
            Quote calculated from active rules
          </div>
        </div>
      </section>
    </main>
  );
}
