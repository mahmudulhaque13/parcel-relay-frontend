import Link from "next/link";
import { ArrowUpRight, PackageCheck } from "lucide-react";

const platformLinks = [
  { href: "/services", label: "Our services" },
  { href: "/about", label: "About ParcelRelay" },
  { href: "/courier/register", label: "Become a courier" },
];

const accountLinks = [
  { href: "/login", label: "Log in" },
  { href: "/register", label: "Create an account" },
  { href: "/dashboard/shipments/create", label: "Create a shipment" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#10243d] text-slate-300">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-16">
          <div>
            <Link
              href="/"
              aria-label="ParcelRelay home"
              className="group inline-flex items-center gap-3"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/10 transition-colors group-hover:bg-white/15">
                <PackageCheck className="size-6" strokeWidth={2.2} />
              </span>

              <span className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                Parcel<span className="text-[#E76F51]">Relay</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              A simpler way to manage shipments, coordinate deliveries, and keep
              your parcel operations moving.
            </p>

            <Link
              href="/services"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#E76F51]"
            >
              Explore our services
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div>
            <h2 className="text-sm font-bold tracking-wide text-white">
              Platform
            </h2>

            <ul className="mt-5 space-y-3">
              {platformLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold tracking-wide text-white">
              Quick links
            </h2>

            <ul className="mt-5 space-y-3">
              {accountLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-slate-400 sm:text-sm">
            &copy; {new Date().getFullYear()} ParcelRelay. All rights reserved.
          </p>

          <Link
            href="/"
            className="w-fit text-xs font-medium text-slate-400 transition-colors hover:text-white sm:text-sm"
          >
            Reliable deliveries. Simplified.
          </Link>
        </div>
      </div>
    </footer>
  );
}
