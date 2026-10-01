import {
  ArrowRight,
  Boxes,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";
import Link from "next/link";

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
  },
  {
    icon: Truck,
    title: "Couriers",
    description:
      "View assigned shipments, manage delivery status, and keep shipment progress up to date.",
  },
  {
    icon: Boxes,
    title: "Admins",
    description:
      "Manage users, shipments, courier assignments, payments, and operational reports.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b bg-base-200/50">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm font-medium">
              <PackageCheck className="size-4" />
              ParcelRelay Delivery Platform
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Delivery management made{" "}
              <span className="text-primary">simple.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              ParcelRelay is a delivery management platform designed to connect
              customers, couriers, and administrators in one streamlined system.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Create an Account
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Explore Services
              </Link>
            </div>
          </div>

          <div className="grid w-full max-w-xl grid-cols-2 gap-4 lg:max-w-md">
            <div className="rounded-2xl border bg-background p-5 shadow-sm">
              <PackageCheck className="mb-4 size-7 text-primary" />

              <h2 className="font-semibold">Ship</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Create and manage delivery requests.
              </p>
            </div>

            <div className="rounded-2xl border bg-background p-5 shadow-sm">
              <Truck className="mb-4 size-7 text-primary" />

              <h2 className="font-semibold">Deliver</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Couriers manage assigned shipments.
              </p>
            </div>

            <div className="rounded-2xl border bg-background p-5 shadow-sm">
              <MapPin className="mb-4 size-7 text-primary" />

              <h2 className="font-semibold">Track</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Follow shipment status and timeline.
              </p>
            </div>

            <div className="rounded-2xl border bg-background p-5 shadow-sm">
              <ShieldCheck className="mb-4 size-7 text-primary" />

              <h2 className="font-semibold">Manage</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Secure operations for every role.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              About ParcelRelay
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              One platform for the complete delivery journey.
            </h2>
          </div>

          <div className="space-y-5 text-muted-foreground">
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
      <section className="border-y bg-base-200/40">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              What ParcelRelay Provides
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything connected in one workflow
            </h2>

            <p className="mt-4 text-muted-foreground">
              The platform connects shipment creation, payment, delivery
              operations, and tracking into a single experience.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border bg-background p-6 shadow-sm"
                >
                  <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="font-semibold">{feature.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Built Around Three Roles
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            A focused experience for every user
          </h2>

          <p className="mt-4 text-muted-foreground">
            Each role gets the tools needed for its part of the delivery
            workflow.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <article key={role.title} className="rounded-2xl border p-6">
                <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>

                <h3 className="text-lg font-semibold">{role.title}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {role.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-base-200/50">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to manage your deliveries?
            </h2>

            <p className="mt-2 text-muted-foreground">
              Create your account and start using ParcelRelay.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Started
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
