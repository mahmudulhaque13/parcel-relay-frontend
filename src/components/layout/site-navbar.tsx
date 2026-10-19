"use client";

import {
  ArrowUpRight,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  PackageCheck,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import ThemeToggle from "@/components/layout/theme-toggle";
import { useAuth } from "@/hooks/use-auth";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
  { href: "/courier/register", label: "Become a courier" },
];

function getDashboardPath(role?: string) {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "COURIER":
      return "/courier";
    case "CUSTOMER":
      return "/dashboard";
    default:
      return "/login";
  }
}

export default function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, isAuthenticated, logoutUser } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const dashboardPath = getDashboardPath(user?.role);

  // Safely handle missing, empty, or malformed user names.
  const displayName =
    typeof user?.name === "string" && user.name.trim()
      ? user.name.trim()
      : "User";

  const avatarInitial = displayName.charAt(0).toUpperCase();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  // Close menus when the current route changes.
  // biome-ignore lint/correctness/useExhaustiveDependencies: Navigation menus must reset on pathname changes.
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
    setMobileProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setMobileProfileOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  async function handleLogout() {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logoutUser();
      setProfileOpen(false);
      setMobileProfileOpen(false);
      setMobileOpen(false);
      router.replace("/login");
      router.refresh();
    } catch {
      setIsLoggingOut(false);
    }
  }

  const profileLinks = [
    {
      href: dashboardPath,
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    ...(user?.role === "CUSTOMER"
      ? [
          {
            href: "/dashboard/profile",
            label: "My Profile",
            icon: UserRound,
          },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 text-foreground shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          aria-label="ParcelRelay home"
          className="group flex shrink-0 items-center gap-2.5"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#1D3557] text-white shadow-sm transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-105 sm:size-11">
            <PackageCheck className="size-6" strokeWidth={2.2} />
          </span>

          <span className="text-lg font-extrabold tracking-tight text-[#1D3557] dark:text-foreground sm:text-2xl">
            Parcel<span className="text-[#E76F51]">Relay</span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 xl:flex"
        >
          {publicLinks.map(({ href, label }) => {
            const active = isActive(href);

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {label}

                {active && (
                  <span className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-[#E76F51]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <ThemeToggle />

          {isLoading ? (
            <output
              aria-label="Loading account"
              className="block h-10 w-24 animate-pulse rounded-xl bg-muted"
            />
          ) : isAuthenticated && user ? (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                onClick={() => setProfileOpen((open) => !open)}
                className="inline-flex min-h-10 max-w-56 items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-foreground">
                  {avatarInitial}
                </span>

                <span className="max-w-28 truncate">{displayName}</span>

                <ChevronDown
                  aria-hidden="true"
                  className={`size-4 shrink-0 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div
                  role="menu"
                  aria-label="Account menu"
                  className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-background p-2 text-foreground shadow-xl"
                >
                  <div className="border-b border-border px-3 py-3">
                    <p className="truncate text-sm font-bold">{displayName}</p>

                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>

                    <p className="mt-2 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-foreground">
                      {user.role === "ADMIN"
                        ? "Administrator"
                        : user.role === "COURIER"
                          ? "Courier"
                          : "Customer"}
                    </p>
                  </div>

                  <div className="space-y-1 py-2">
                    {profileLinks.map(({ href, label, icon: Icon }) => (
                      <Link
                        key={href}
                        href={href}
                        role="menuitem"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                      >
                        <Icon aria-hidden="true" className="size-4" />
                        {label}
                      </Link>
                    ))}

                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <LogOut aria-hidden="true" className="size-4" />
                      {isLoggingOut ? "Signing out..." : "Log out"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl px-3 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-muted"
              >
                Log in
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1D3557] px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#29486f] sm:px-5"
              >
                Get started
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 xl:hidden">
          <ThemeToggle />

          <button
            type="button"
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex size-10 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {mobileOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-border bg-background px-4 pb-5 pt-3 text-foreground shadow-lg xl:hidden"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col gap-1 sm:px-2">
            {publicLinks.map(({ href, label }) => {
              const active = isActive(href);

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {label}
                </Link>
              );
            })}

            <div className="mt-2 border-t border-border pt-4">
              {isLoading ? (
                <output
                  aria-label="Loading account"
                  className="block h-12 animate-pulse rounded-xl bg-muted"
                />
              ) : isAuthenticated && user ? (
                <div className="space-y-2">
                  <div className="rounded-xl bg-muted/60 px-4 py-3">
                    <p className="truncate text-sm font-bold">{displayName}</p>

                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>

                    <p className="mt-2 text-xs font-semibold text-muted-foreground">
                      {user.role === "ADMIN"
                        ? "Administrator"
                        : user.role === "COURIER"
                          ? "Courier"
                          : "Customer"}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-expanded={mobileProfileOpen}
                    onClick={() => setMobileProfileOpen((open) => !open)}
                    className="flex w-full items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-semibold hover:bg-muted"
                  >
                    Account options
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-4 transition-transform ${
                        mobileProfileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileProfileOpen && (
                    <div className="space-y-1 pl-2">
                      {profileLinks.map(({ href, label, icon: Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted"
                        >
                          <Icon aria-hidden="true" className="size-4" />
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 px-4 py-3 text-sm font-bold text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <LogOut aria-hidden="true" className="size-4" />
                    {isLoggingOut ? "Signing out..." : "Log out"}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl border border-border px-4 py-3 text-center text-sm font-bold text-foreground transition-colors hover:bg-muted"
                  >
                    Log in
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center justify-center gap-1 rounded-xl bg-[#1D3557] px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#29486f]"
                  >
                    Get started
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
