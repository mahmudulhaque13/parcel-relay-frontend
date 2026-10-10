import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Payment Success | ParcelRelay',
  description: 'Verify the status of your ParcelRelay shipment payment.',
};

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
