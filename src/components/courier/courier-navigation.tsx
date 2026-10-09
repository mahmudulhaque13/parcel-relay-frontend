"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Truck } from "lucide-react";

const courierLinks = [
  {
    href: "/courier",
    label: "My Shipments",
    icon: Truck,
  },
];

export default function CourierNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Courier navigation" className="flex flex-wrap gap-2">
      {courierLinks.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
              isActive
                ? "border-[#1D3557] bg-[#1D3557] text-white"
                : "border-slate-200 text-slate-700 hover:border-[#1D3557] hover:bg-slate-50 hover:text-[#1D3557]"
            }`}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
