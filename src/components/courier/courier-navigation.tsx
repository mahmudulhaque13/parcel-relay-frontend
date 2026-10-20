"use client";

import { CheckCircle2, ClipboardList, Truck, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import ThemeToggle from "@/components/layout/theme-toggle";

const courierLinks = [
  { href: "/courier", label: "My Shipments", icon: Truck, status: "" },
  {
    href: "/courier?status=ASSIGNED",
    label: "Assigned",
    icon: ClipboardList,
    status: "ASSIGNED",
  },
  {
    href: "/courier?status=DELIVERED",
    label: "Delivered",
    icon: CheckCircle2,
    status: "DELIVERED",
  },
  {
    href: "/courier/profile",
    label: "My Profile",
    icon: UserRound,
    status: "",
  },
];

export default function CourierNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") ?? "";

  return (
    <nav
      aria-label="Courier navigation"
      className="flex flex-wrap items-center gap-2"
    >
      {courierLinks.map(({ href, label, icon: Icon, status }) => {
        const route = href.split("?")[0];
        const isActive =
          pathname === route &&
          (route === "/courier"
            ? currentStatus === status
            : pathname === "/courier/profile");

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E76F51] ${
              isActive
                ? "border-[#1D3557] bg-[#1D3557] text-white"
                : "border-slate-200 text-slate-700 hover:border-[#1D3557] hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
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
