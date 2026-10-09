"use client";

import { usePathname } from "next/navigation";
import SiteNavbar from "@/components/layout/site-navbar";
import SiteFooter from "@/components/layout/site-footer";

export default function PublicSiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isDashboardRoute =
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/courier" ||
    pathname.startsWith("/courier/");

  if (isDashboardRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteNavbar />
      {children}
      <SiteFooter />
    </>
  );
}
