import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers";
import SiteNavbar from "@/components/layout/site-navbar";
import SiteFooter from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "ParcelRelay",
  description: "Courier and logistics management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SiteNavbar />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
