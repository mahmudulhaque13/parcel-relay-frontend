"use client";

import { CircleHelp, MapPin, Truck, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/layout/theme-toggle";

const courierLinks = [
  {
    href: "/courier",
    label: "My Shipments",
    icon: Truck,
  },
  {
    href: "/courier/profile",
    label: "My Profile",
    icon: UserRound,
  },
  {
    href: "/#tracking",
    label: "Track Parcel",
    icon: MapPin,
  },
  {
    href: "/help",
    label: "Help & Support",
    icon: CircleHelp,
  },
];

export default function CourierNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Courier navigation" className="flex flex-wrap gap-2">
      {courierLinks.map(({ href, label, icon: Icon }) => {
        const route = href.split("#")[0];
        const isActive = route !== "/" && pathname === route;

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
              isActive
                ? "border-[#1D3557] bg-[#1D3557] text-white"
                : "border-slate-200 text-slate-700 hover:border-[#1D3557] hover:bg-slate-50 hover:text-[#1D3557] dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </Link>
        );
      })}

      <div className="ml-auto flex items-center">
        <ThemeToggle />
      </div>
    </nav>
  );
}
