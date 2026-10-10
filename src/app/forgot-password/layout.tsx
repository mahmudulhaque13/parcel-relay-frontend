import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Forgot Password | ParcelRelay',
  description: 'Request a password reset for your ParcelRelay account.',
};

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
