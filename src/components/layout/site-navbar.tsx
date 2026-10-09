"use client";

import { ArrowUpRight, Menu, PackageCheck, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About us" },
];

export default function SiteNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          aria-label="ParcelRelay home"
          className="group flex items-center gap-2.5"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#1D3557] text-white shadow-sm transition-transform group-hover:-rotate-3">
            <PackageCheck className="size-5" strokeWidth={2.2} />
          </span>

          <span className="text-xl font-extrabold tracking-tight text-[#1D3557]">
            Parcel<span className="text-[#E76F51]">Relay</span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-semibold transition-colors ${
                  active
                    ? "text-[#E76F51]"
                    : "text-slate-600 hover:text-[#1D3557]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/courier/register"
            className="text-sm font-semibold text-slate-600 transition-colors hover:text-[#1D3557]"
          >
            Become a courier
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2.5 text-sm font-bold text-[#1D3557] transition hover:bg-slate-100"
          >
            Log in
          </Link>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1D3557] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#29486f]"
          >
            Get started
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <button
          type="button"
          aria-label={
            mobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex size-10 items-center justify-center rounded-xl border border-slate-200 text-[#1D3557] md:hidden"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-lg md:hidden"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-3 text-sm font-semibold ${
                  pathname === link.href
                    ? "bg-orange-50 text-[#E76F51]"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/courier/register"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Become a courier
            </Link>

            <div className="mt-2 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-[#1D3557]"
              >
                Log in
              </Link>

              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl bg-[#1D3557] px-4 py-3 text-center text-sm font-bold text-white"
              >
                Get started
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
