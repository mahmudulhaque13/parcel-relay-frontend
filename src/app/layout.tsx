import type { Metadata } from "next";
import "./globals.css";
import PublicSiteShell from "@/components/layout/public-site-shell";
import Providers from "@/providers";

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
          <PublicSiteShell>{children}</PublicSiteShell>
        </Providers>
      </body>
    </html>
  );
}
