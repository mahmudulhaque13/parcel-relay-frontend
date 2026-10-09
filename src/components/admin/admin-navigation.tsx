"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  ChartNoAxesCombined,
} from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/manage", label: "Manage", icon: ClipboardList },
  { href: "/admin/reports", label: "Reports", icon: ChartNoAxesCombined },
];

export default function AdminNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin navigation" className="flex flex-wrap gap-2">
      {adminLinks.map(({ href, label, icon: Icon }) => {
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
