"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PackagePlus,
  CreditCard,
  UserRound,
  Package,
} from "lucide-react";

const customerLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  {
    href: "/dashboard/shipments/create",
    label: "Create Shipment",
    icon: PackagePlus,
  },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/dashboard/profile", label: "My Profile", icon: UserRound },
];

export default function CustomerNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Customer navigation" className="flex flex-wrap gap-2">
      {customerLinks.map(({ href, label, icon: Icon }) => {
        const isActive =
          pathname === href ||
          (href === "/dashboard" && pathname === "/dashboard");

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
