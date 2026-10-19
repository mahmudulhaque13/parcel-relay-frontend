import Link from "next/link";
export const metadata = {
  title: "Help & Support | ParcelRelay",
  description:
    "Find help for ParcelRelay shipments, tracking, payments, and courier accounts.",
};
const items = [
  [
    "Track a parcel",
    "Enter your tracking information on the homepage to view available shipment status details.",
    "/#tracking",
    "Open tracking",
  ],
  [
    "Create a shipment",
    "Sign in as a customer to enter parcel details, request a quote, and continue through payment.",
    "/dashboard/shipments/create",
    "Create shipment",
  ],
  [
    "Payments",
    "Review payment information available to your account in the payments area.",
    "/dashboard/payments",
    "View payments",
  ],
  [
    "Courier onboarding",
    "Submit the courier application and follow the verification steps provided.",
    "/courier/register",
    "Courier registration",
  ],
  [
    "Contact",
    "Choose the relevant support path for tracking, account access, or courier applications.",
    "/contact",
    "Contact page",
  ],
];
export default function HelpPage() {
  return (
    <main className="mx-auto min-h-[65vh] max-w-5xl px-4 py-12 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-widest text-[#C65338]">
        Support centre
      </p>
      <h1 className="mt-2 text-4xl font-black">How can we help?</h1>
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
        Choose the workflow that matches your ParcelRelay question. Never share
        your password, OTP, or payment secrets.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map(([title, description, href, label]) => (
          <article
            key={title}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
            <Link
              className="mt-4 inline-flex font-bold text-primary underline-offset-4 hover:underline"
              href={href}
            >
              {label} →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
