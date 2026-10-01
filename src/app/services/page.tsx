import {
  ArrowRight,
  ClipboardCheck,
  CreditCard,
  MapPin,
  Package,
  Route,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Link from "next/link";

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

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b bg-base-200/50">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm font-medium">
              <Truck className="size-4" />
              ParcelRelay Services
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Everything you need to manage a{" "}
              <span className="text-primary">delivery.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              ParcelRelay connects shipment creation, delivery quotes, payments,
              courier operations, and shipment tracking in one delivery
              management platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Start Shipping
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                About ParcelRelay
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Our Services
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            A connected delivery workflow
          </h2>

          <p className="mt-4 text-muted-foreground">
            Each service supports a specific part of the shipment lifecycle,
            from creating a shipment to tracking its delivery progress.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="rounded-2xl border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>

                <h3 className="text-lg font-semibold">{service.title}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y bg-base-200/40">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From shipment request to delivery
            </h2>

            <p className="mt-4 text-muted-foreground">
              ParcelRelay keeps the main steps of the delivery process connected
              in a single workflow.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {workflow.map((item) => (
              <article
                key={item.step}
                className="rounded-2xl border bg-background p-6"
              >
                <span className="text-sm font-bold text-primary">
                  {item.step}
                </span>

                <h3 className="mt-4 font-semibold">{item.title}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-6" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Designed around a clear shipment lifecycle
            </h2>

            <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">
              ParcelRelay keeps payment, assignment, delivery status, and
              shipment tracking connected so that each role can work with the
              information relevant to its responsibilities.
            </p>
          </div>

          <div className="rounded-2xl border bg-base-200/40 p-6">
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  1
                </div>

                <div>
                  <h3 className="font-semibold">Customer creates shipment</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Shipment and recipient information are submitted through the
                    customer workflow.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  2
                </div>

                <div>
                  <h3 className="font-semibold">Payment is processed</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    The customer continues through the integrated payment
                    process.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  3
                </div>

                <div>
                  <h3 className="font-semibold">Courier manages delivery</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Assigned couriers can view shipments and update their
                    delivery status.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  4
                </div>

                <div>
                  <h3 className="font-semibold">Customer tracks progress</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Shipment status and timeline events remain available to
                    follow the delivery journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-base-200/50">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to send a shipment?
            </h2>

            <p className="mt-2 text-muted-foreground">
              Sign in to your account and start the shipment process.
            </p>
          </div>

          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Start Shipping
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
