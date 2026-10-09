"use client";

import { ArrowUpRight, Menu, PackageCheck, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About us" },
  { href: "/courier/register", label: "Become a courier" },
];

export default function SiteNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          aria-label="ParcelRelay home"
          className="group flex shrink-0 items-center gap-2.5"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex size-11 items-center justify-center rounded-2xl bg-[#1D3557] text-white shadow-md shadow-[#1D3557]/15 transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-105">
            <PackageCheck className="size-6" strokeWidth={2.2} />
          </span>

          <span className="text-xl font-extrabold tracking-tight text-[#1D3557] sm:text-2xl">
            Parcel<span className="text-[#E76F51]">Relay</span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {links.map(({ href, label }) => {
            const active = isActive(href);

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-[#1D3557]/[0.06] text-[#1D3557]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#1D3557]"
                }`}
              >
                {label}

                {active && (
                  <span className="absolute inset-x-4 -bottom-[1px] h-0.5 rounded-full bg-[#E76F51]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2.5 text-sm font-bold text-[#1D3557] transition-colors hover:bg-slate-100"
          >
            Log in
          </Link>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1D3557] px-5 py-3 text-sm font-bold text-white shadow-md shadow-[#1D3557]/15 transition-all hover:-translate-y-0.5 hover:bg-[#29486f] hover:shadow-lg"
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
          className="flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#1D3557] transition-colors hover:bg-slate-50 md:hidden"
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
          <div className="mx-auto flex max-w-[1440px] flex-col gap-1 sm:px-2">
            {links.map(({ href, label }) => {
              const active = isActive(href);

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-[#1D3557]/[0.06] text-[#1D3557]"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {label}
                </Link>
              );
            })}

            <div className="mt-2 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-[#1D3557] transition-colors hover:bg-slate-50"
              >
                Log in
              </Link>

              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-1 rounded-xl bg-[#1D3557] px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#29486f]"
              >
                Get started
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
