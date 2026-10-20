"use client";

import { ChevronDown, LayoutDashboard, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

const roleRoutes = {
  ADMIN: {
    dashboard: "/admin",
    profile: "/admin/profile",
    label: "Administrator",
  },
  COURIER: {
    dashboard: "/courier",
    profile: "/courier/profile",
    label: "Courier",
  },
  CUSTOMER: {
    dashboard: "/dashboard",
    profile: "/dashboard/profile",
    label: "Customer",
  },
} as const;

export default function DashboardAccountMenu() {
  const { user, logoutUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      setOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await logoutUser();
    } catch (error) {
      // logoutUser clears local auth state even when the server request fails.
      console.error("Logout request failed:", error);
    } finally {
      setOpen(false);
      setLoggingOut(false);
      router.replace("/login");
      router.refresh();
    }
  }

  if (!user) return null;

  const routes = roleRoutes[user.role];
  const displayName =
    user.name?.trim() || user.email.split("@")[0] || "Account";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative shrink-0" ref={menuRef}>
      <button
        type="button"
        aria-label="Open account menu"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex min-h-11 max-w-56 items-center gap-2 rounded-xl border border-border bg-background px-2.5 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:px-3"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-extrabold text-primary">
          {initial || <UserRound className="size-4" aria-hidden="true" />}
        </span>
        <span className="hidden max-w-28 truncate sm:inline">
          {displayName}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Account options"
          className="absolute right-0 top-full z-[60] mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-background p-2 text-foreground shadow-xl"
        >
          <div className="border-b border-border px-3 py-3">
            <p className="truncate text-sm font-bold">{displayName}</p>
            <p className="mt-1 truncate text-xs text-muted-foreground">
              {user.email}
            </p>
            <p className="mt-2 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold">
              {routes.label}
            </p>
          </div>

          <div className="space-y-1 py-2">
            <Link
              href={routes.dashboard}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex min-h-10 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              <LayoutDashboard aria-hidden="true" className="size-4" />
              Dashboard overview
            </Link>
            <Link
              href={routes.profile}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex min-h-10 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              <UserRound aria-hidden="true" className="size-4" />
              My Profile
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex min-h-10 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut aria-hidden="true" className="size-4" />
              {loggingOut ? "Signing out…" : "Log out"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
