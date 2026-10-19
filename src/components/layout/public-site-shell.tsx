"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "@/components/layout/site-footer";
import SiteNavbar from "@/components/layout/site-navbar";

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
    pathname === "/courier/profile" ||
    pathname.startsWith("/courier/shipments/");

  const isPaymentSuccessRoute = pathname === "/payment/success";

  if (isDashboardRoute || isPaymentSuccessRoute) {
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
