import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  CircleHelp,
  Clock3,
  CreditCard,
  FileText,
  MapPin,
  Package,
  PackageCheck,
  Route,
  Search,
  ShieldCheck,
  Truck,
  UserRound,
  Workflow,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import TrackingForm from "@/components/tracking/tracking-form";

export const metadata: Metadata = {
  title: "ParcelRelay | Smarter Courier & Delivery Management",
  description:
    "Create shipments, track delivery progress, manage courier operations, and organize your parcels with ParcelRelay.",
};

const services = [
  {
    icon: Package,
    number: "01",
    title: "Shipment booking",
    description:
      "Create shipments and organize pickup, recipient, and delivery details through your account.",
    href: "/dashboard/shipments/create",
    linkLabel: "Create a shipment",
  },
  {
    icon: Search,
    number: "02",
    title: "Shipment tracking",
    description:
      "Use the tracking form to look up a parcel and follow the available shipment information.",
    href: "#tracking",
    linkLabel: "Track a parcel",
  },
  {
    icon: Route,
    number: "03",
    title: "Delivery coordination",
    description:
      "Follow shipment progress through a structured workflow for courier and delivery operations.",
    href: "/services",
    linkLabel: "Explore services",
  },
  {
    icon: CreditCard,
    number: "04",
    title: "Payment management",
    description:
      "Access your customer payment area to review the payment information available to your account.",
    href: "/dashboard/payments",
    linkLabel: "Payment options",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your shipment",
    description:
      "Register or sign in, then enter the required shipment and delivery details.",
    icon: Package,
  },
  {
    number: "02",
    title: "Follow shipment progress",
    description:
      "Use the tracking form or your account to review the available shipment information and status.",
    icon: MapPin,
  },
  {
    number: "03",
    title: "Manage delivery updates",
    description:
      "Follow the shipment through the available delivery workflow until its recorded status is complete.",
    icon: Truck,
  },
];

const customerFeatures = [
  {
    icon: ClipboardIcon,
    title: "Organized shipments",
    description:
      "Access your shipment workspace and keep delivery records together.",
  },
  {
    icon: Clock3,
    title: "Progress visibility",
    description:
      "Review available shipment statuses instead of relying only on scattered updates.",
  },
  {
    icon: UserRound,
    title: "Account management",
    description: "Manage your account details from your customer profile.",
  },
];

const courierFeatures = [
  {
    icon: PackageCheck,
    title: "Shipment workspace",
    description:
      "Access the courier shipment area to review assigned shipment information.",
  },
  {
    icon: Workflow,
    title: "Delivery workflow",
    description:
      "Work with the shipment statuses and operations available to your courier account.",
  },
  {
    icon: BadgeCheck,
    title: "Courier onboarding",
    description:
      "Start the courier application process and follow the verification steps provided.",
  },
];

const operationsFeatures = [
  {
    icon: Building2,
    title: "Operational configuration",
    description:
      "Authorized administrators can access the available hub, zone, and pricing management areas.",
  },
  {
    icon: UserRound,
    title: "Courier applications",
    description:
      "Review courier applications through the administration workspace.",
  },
  {
    icon: FileText,
    title: "Reports and management",
    description:
      "Use the existing administration pages to access reports and manage platform records.",
  },
];

const faqs = [
  {
    question: "How can I track a parcel?",
    answer:
      "Enter your shipment tracking information in the tracking section and follow the instructions provided by the form.",
  },
  {
    question: "Do I need an account to manage shipments?",
    answer:
      "Creating and managing shipments is available through the customer account area. Register or sign in to access those features.",
  },
  {
    question: "How can I become a courier?",
    answer:
      "Open the Become a courier page, submit the application information requested, and follow the verification process.",
  },
  {
    question: "Where can I find pricing information?",
    answer:
      "Visit the Pricing page to review the pricing information currently published by ParcelRelay.",
  },
  {
    question: "How can I contact ParcelRelay?",
    answer:
      "Visit the Contact page for the available contact information and communication options.",
  },
];

function ClipboardIcon({ className }: { className?: string }) {
  return <FileText aria-hidden="true" className={className} />;
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C65338] dark:text-[#FF9B80] sm:text-sm">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#1D3557] dark:text-white sm:text-4xl lg:text-5xl dark:text-foreground">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* 1. Hero */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-slate-50 via-white to-orange-50/70 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:to-slate-950 dark:via-slate-900" />
        <div className="absolute -right-24 top-0 -z-10 size-80 rounded-full bg-orange-200/20 blur-3xl dark:bg-orange-500/10 sm:size-[28rem]" />
        <div className="absolute -left-32 bottom-0 -z-10 size-80 rounded-full bg-blue-100/30 blur-3xl dark:bg-blue-500/10" />

        <div className="mx-auto grid min-h-[60vh] w-full max-w-[1440px] items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:min-h-[65vh] lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-orange-200/80 bg-white/90 px-4 py-2 text-xs font-bold text-[#A6412B] shadow-sm dark:border-orange-400/20 dark:bg-slate-900/90 dark:text-orange-200 sm:text-sm">
              <span className="size-2 rounded-full bg-[#E76F51]" />A smarter way
              to deliver
            </div>

            <h1 className="mt-6 max-w-2xl text-4xl font-black leading-[1.1] tracking-tight text-[#1D3557] dark:text-white sm:text-5xl lg:text-6xl xl:text-[4.25rem] dark:text-foreground">
              Every parcel.
              <br />
              Every mile.
              <br />
              <span className="text-[#C65338] dark:text-[#FF9B80]">
                Handled better.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              Simplify shipping with ParcelRelay. Create shipments, review
              delivery progress, and manage your logistics through one connected
              platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1D3557] px-6 py-3 text-sm font-bold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#29486f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
              >
                Get started
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>

              <Link
                href="#tracking"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-6 py-3 text-sm font-bold text-[#1D3557] transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51] dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 dark:text-foreground dark:bg-slate-900/90"
              >
                Track a parcel
                <Search aria-hidden="true" className="size-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-300 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-[#C65338] dark:text-[#FF9B80]" />
                Shipment management
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="size-4 shrink-0 text-[#C65338] dark:text-[#FF9B80]" />
                Account-based access
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="absolute -inset-4 rounded-[2rem] bg-[#1D3557]/[0.06] blur-2xl dark:bg-blue-300/[0.05] sm:-inset-6" />

            <div className="relative rounded-[1.75rem] border border-slate-200/80 bg-white/95 p-4 shadow-2xl shadow-[#1D3557]/[0.08] dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-black/20 sm:rounded-[2rem] sm:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 sm:text-xs">
                    Your delivery workspace
                  </p>
                  <h2 className="mt-2 text-lg font-extrabold tracking-tight text-[#1D3557] dark:text-white sm:text-xl dark:text-foreground">
                    Shipping made simpler
                  </h2>
                </div>

                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-[#C65338] ring-1 ring-orange-100 dark:bg-orange-400/10 dark:text-[#FF9B80] dark:ring-orange-300/20 sm:size-12">
                  <PackageCheck aria-hidden="true" className="size-6" />
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

                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-orange-200 ring-1 ring-white/10 sm:size-12">
                    <Truck aria-hidden="true" className="size-6" />
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
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-800/60 sm:p-4">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-orange-50 text-[#C65338] dark:bg-orange-400/10 dark:text-[#FF9B80]">
                    <Package aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold leading-5 text-[#1D3557] dark:text-white dark:text-foreground">
                    Shipment management
                  </h3>
                  <p className="mt-1.5 text-xs leading-5 text-slate-600 dark:text-slate-300">
                    Keep shipment details organized.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-800/60 sm:p-4">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-[#1D3557] dark:bg-blue-400/10 dark:text-blue-200 dark:text-foreground">
                    <Clock3 aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold leading-5 text-[#1D3557] dark:text-white dark:text-foreground">
                    Status updates
                  </h3>
                  <p className="mt-1.5 text-xs leading-5 text-slate-600 dark:text-slate-300">
                    Follow progress through your account.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <ShieldCheck className="size-4 text-[#C65338] dark:text-[#FF9B80]" />
                A clearer view of your delivery workflow
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shipment tracking */}
      <section
        id="tracking"
        className="scroll-mt-24 border-y border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/70 dark:border-slate-700 dark:bg-slate-950/80"
      >
        <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
          <TrackingForm />
        </div>
      </section>

      {/* 3. Services overview */}
      <section
        id="services"
        className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <SectionHeading
          eyebrow="What we offer"
          title="Everything moving in one direction"
          description="A connected workspace for managing the essential stages of courier and shipment operations."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.number}
                className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-300/70 hover:shadow-xl dark:border-slate-700 dark:hover:border-orange-300/40 sm:p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-orange-50 text-[#C65338] ring-1 ring-orange-100 transition-colors group-hover:bg-[#E76F51] group-hover:text-white dark:bg-orange-400/10 dark:text-[#FF9B80] dark:ring-orange-300/20">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <span className="text-sm font-extrabold tracking-wider text-slate-400 dark:text-slate-500">
                    {service.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-extrabold leading-snug text-[#1D3557] dark:text-white dark:text-foreground">
                  {service.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#1D3557] hover:text-[#C65338] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51] dark:text-white dark:hover:text-[#FF9B80] dark:text-foreground"
                >
                  {service.linkLabel}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4. How it works */}
      <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900/70 dark:bg-slate-950">
        <div className="absolute -right-32 top-0 size-80 rounded-full bg-orange-100/40 blur-3xl dark:bg-orange-400/5" />

        <div className="relative mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#C65338] dark:text-[#FF9B80] sm:text-sm">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#1D3557] dark:text-white sm:text-4xl dark:text-foreground">
                Three steps to a smoother shipment
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                Manage the process through your ParcelRelay account, from
                creating a shipment to following its delivery progress.
              </p>
              <Link
                href="/register"
                className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1D3557] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#29486f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
              >
                Create your account
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.number}
                    className="flex gap-4 rounded-2xl border border-slate-200/80 bg-card p-5 shadow-sm transition hover:border-orange-300/50 hover:shadow-md dark:border-slate-700 sm:gap-6 sm:p-6"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#C65338] ring-1 ring-orange-100 dark:bg-orange-400/10 dark:text-[#FF9B80] dark:ring-orange-300/20">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400">
                        STEP {step.number}
                      </p>
                      <h3 className="mt-1 text-base font-extrabold leading-snug text-[#1D3557] dark:text-white sm:text-lg dark:text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {step.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer features */}
      <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <SectionHeading
          eyebrow="For customers"
          title="Keep your shipment details in one place"
          description="Use the customer workspace to access the shipment and account features available to you."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {customerFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-card p-6 transition-colors hover:border-orange-300/60 dark:border-slate-700 sm:p-8"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-orange-50 text-[#C65338] dark:bg-orange-400/10 dark:text-[#FF9B80]">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-[#1D3557] dark:text-white dark:text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/dashboard"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-[#1D3557] transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 dark:text-foreground"
          >
            Customer dashboard
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      {/* 6. Courier features */}
      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/70 dark:border-slate-700 dark:bg-slate-950">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <SectionHeading
            eyebrow="For couriers"
            title="A dedicated space for delivery work"
            description="Courier accounts provide access to the shipment workspace and the relevant delivery workflow."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {courierFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 sm:p-8"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-[#1D3557] dark:bg-blue-400/10 dark:text-blue-200 dark:text-foreground">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold text-[#1D3557] dark:text-white dark:text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/courier/register"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1D3557] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#29486f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
            >
              Apply to become a courier
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Admin operations */}
      <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <SectionHeading
          eyebrow="Operations"
          title="Tools for managing delivery operations"
          description="ParcelRelay includes administration areas for authorized users to manage important platform workflows."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {operationsFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-card p-6 dark:border-slate-700 sm:p-8"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-orange-50 text-[#C65338] dark:bg-orange-400/10 dark:text-[#FF9B80]">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-[#1D3557] dark:text-white dark:text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* 8. Shipment lifecycle */}
      <section className="bg-[#1D3557] text-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-200 sm:text-sm">
                Shipment lifecycle
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                Follow the journey, one stage at a time
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
                Shipment information and status updates help you understand
                where a parcel is in the delivery process. The available details
                depend on the shipment and its recorded progress.
              </p>
              <Link
                href="#tracking"
                className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#E76F51] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#d65e41] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Track a shipment
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-5 sm:p-8">
              {[
                {
                  label: "Pickup",
                  description: "Shipment enters the delivery workflow.",
                  icon: Package,
                },
                {
                  label: "In transit",
                  description:
                    "Follow progress using available status information.",
                  icon: Route,
                },
                {
                  label: "Delivery",
                  description: "Review the final recorded delivery status.",
                  icon: PackageCheck,
                },
              ].map((stage, index) => {
                const Icon = stage.icon;

                return (
                  <div
                    key={stage.label}
                    className={`flex gap-4 ${
                      index < 2 ? "border-b border-white/10 pb-5" : "pb-0"
                    } ${index > 0 ? "pt-5" : ""}`}
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-200">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-bold">{stage.label}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-200">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Account access and support links */}
      <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <SectionHeading
          eyebrow="Get started"
          title="Find the right place to begin"
          description="Whether you are sending a parcel, applying as a courier, or looking for service information, start from the appropriate page."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Create an account",
              description: "Register to access customer shipment features.",
              href: "/register",
              label: "Register",
            },
            {
              title: "Explore pricing",
              description:
                "Review the pricing information available on the site.",
              href: "/pricing",
              label: "View pricing",
            },
            {
              title: "Learn about us",
              description: "Read about ParcelRelay and its services.",
              href: "/about",
              label: "About ParcelRelay",
            },
            {
              title: "Contact support",
              description:
                "Visit the contact page for available communication options.",
              href: "/contact",
              label: "Contact us",
            },
          ].map((item) => (
            <article
              key={item.href}
              className="flex flex-col rounded-2xl border border-slate-200 bg-card p-6 dark:border-slate-700"
            >
              <h3 className="text-lg font-extrabold text-[#1D3557] dark:text-white dark:text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {item.description}
              </p>
              <Link
                href={item.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1D3557] hover:text-[#C65338] dark:text-white dark:hover:text-[#FF9B80] dark:text-foreground"
              >
                {item.label}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* 10. Frequently asked questions */}
      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/70 dark:border-slate-700 dark:bg-slate-950">
        <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            description="Quick answers to help you navigate the ParcelRelay platform."
          />

          <div className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-card p-5 open:border-orange-300/60 dark:border-slate-700 dark:open:border-orange-300/40 sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-bold text-[#1D3557] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51] dark:text-white [&::-webkit-details-marker]:hidden dark:text-foreground">
                  <span>{faq.question}</span>
                  <CircleHelp
                    aria-hidden="true"
                    className="size-5 shrink-0 text-[#C65338] transition-transform group-open:rotate-12 dark:text-[#FF9B80]"
                  />
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#1D3557] to-[#142943] px-6 py-12 text-center shadow-xl shadow-[#1D3557]/10 sm:rounded-[2rem] sm:px-12 sm:py-16">
          <div className="absolute -right-20 -top-24 size-64 rounded-full bg-white/[0.04] blur-2xl" />
          <div className="absolute -bottom-32 -left-20 size-72 rounded-full bg-[#E76F51]/10 blur-2xl" />

          <div className="relative">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/10 text-orange-200 ring-1 ring-white/10">
              <PackageCheck aria-hidden="true" className="size-7" />
            </span>

            <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
              Ready to simplify your delivery operations?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
              Get started with ParcelRelay and manage your shipments through one
              connected platform.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#E76F51] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#d65e41] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Get started
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>

              <Link
                href="/login"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-white/50 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
