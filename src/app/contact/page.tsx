import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CircleHelp,
  MailCheck,
  PackageSearch,
  ShieldCheck,
  Truck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Support | ParcelRelay",
  description:
    "Find the right ParcelRelay workflow for shipment tracking, account support, and courier applications.",
  openGraph: {
    title: "Contact & Support | ParcelRelay",
    description:
      "Get help with shipment tracking, your ParcelRelay account, or courier applications.",
  },
};

const supportOptions = [
  {
    icon: PackageSearch,
    title: "Shipment or tracking question",
    description:
      "Look up a shipment using its tracking number. The public tracking page shows the latest available status and shipment timeline.",
    href: "/#tracking",
    action: "Track a shipment",
  },
  {
    icon: ShieldCheck,
    title: "Account or payment question",
    description:
      "Sign in to review your shipments, payment status, and account information. Never share your password or payment credentials with anyone.",
    href: "/login",
    action: "Sign in to your account",
  },
  {
    icon: Truck,
    title: "Become a courier",
    description:
      "Submit a courier application and check your application status through the courier registration workflow. Admin approval is required before courier operations are available.",
    href: "/courier/register",
    action: "Apply as a courier",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-[70vh] bg-white text-slate-700">
      <section className="border-b border-slate-100 bg-gradient-to-br from-slate-50 via-white to-orange-50/70">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#1D3557] text-white shadow-lg shadow-[#1D3557]/15">
              <CircleHelp className="size-7" />
            </span>
            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-[#E76F51] sm:text-sm">
              Contact & Support
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-[#1D3557] sm:text-5xl">
              How can we help?
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Choose the support path that matches your question. ParcelRelay
              keeps shipment tracking, account activity, and courier applications
              connected to their relevant workflows.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1440px] gap-5 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-3 lg:px-10">
        {supportOptions.map(({ icon: Icon, title, description, href, action }) => (
          <article
            key={title}
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1D3557]/20 hover:shadow-lg sm:p-7"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-orange-50 text-[#E76F51] ring-1 ring-orange-100">
              <Icon className="size-6" />
            </span>
            <h2 className="mt-5 text-xl font-extrabold text-[#1D3557]">{title}</h2>
            <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
              {description}
            </p>
            <Link
              href={href}
              className="mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-xl bg-[#1D3557] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#29486f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
            >
              {action}
              <ArrowRight className="size-4" />
            </Link>
          </article>
        ))}
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="flex items-start gap-3">
            <MailCheck className="mt-1 size-5 shrink-0 text-[#E76F51]" />
            <div>
              <h2 className="font-extrabold text-[#1D3557]">Still need help?</h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                Sign in and use the relevant shipment or account workflow so
                support questions can be tied to the correct account and record.
                Do not send passwords, OTPs, or payment secrets.
              </p>
            </div>
          </div>
          <Link
            href="/login"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-[#1D3557] transition hover:border-[#1D3557]/30 hover:bg-slate-100"
          >
            Open account access
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
