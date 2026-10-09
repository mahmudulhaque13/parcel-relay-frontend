import Link from "next/link";
import { PackageCheck } from "lucide-react";

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
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 sm:py-14 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              aria-label="ParcelRelay home"
              className="inline-flex items-center gap-2.5"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-white">
                <PackageCheck className="size-5" />
              </span>

              <span className="text-xl font-extrabold tracking-tight text-white">
                Parcel<span className="text-[#E76F51]">Relay</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              A simpler way to manage shipments, coordinate deliveries, and keep
              your parcel operations moving.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white">Platform</h2>

            <ul className="mt-4 space-y-3">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white">Quick links</h2>

            <ul className="mt-4 space-y-3">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-center text-xs leading-6 text-slate-400 sm:text-sm">
            © {new Date().getFullYear()} ParcelRelay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
