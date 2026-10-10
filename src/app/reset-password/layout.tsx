import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Reset Password | ParcelRelay',
  description: 'Set a new password for your ParcelRelay account.',
};

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
