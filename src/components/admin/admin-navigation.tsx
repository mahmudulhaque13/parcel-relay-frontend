"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  ChartNoAxesCombined,
  Users,
} from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  {
    href: "/admin/courier-applications",
    label: "Courier Applications",
    icon: ClipboardList,
  },
  { href: "/admin/manage", label: "Manage Users", icon: Users },
  { href: "/admin/reports", label: "Reports", icon: ChartNoAxesCombined },
];

export default function AdminNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Admin navigation"
      className="flex flex-wrap items-center gap-2"
    >
      {adminLinks.map(({ href, label, icon: Icon }) => {
        const isActive =
          href === "/admin"
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E76F51] ${
              isActive
                ? "border-[#1D3557] bg-[#1D3557] text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-700 hover:border-[#1D3557] hover:bg-slate-50 hover:text-[#1D3557]"
            }`}
          >
            <Icon aria-hidden="true" className="size-4 shrink-0" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
