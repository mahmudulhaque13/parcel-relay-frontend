import Link from "next/link";

import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-base-200/40 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border bg-background shadow-sm lg:grid-cols-2">
        <section className="hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
          <div>
            <Link href="/" className="text-2xl font-bold">
              ParcelRelay
            </Link>

            <h1 className="mt-12 text-4xl font-bold tracking-tight">
              Start managing your deliveries with ease.
            </h1>

            <p className="mt-5 leading-7 text-primary-foreground/80">
              Create your ParcelRelay account to create shipments, complete
              payments, and track your deliveries from one place.
            </p>
          </div>

          <p className="text-sm text-primary-foreground/70">
            Simple shipment management for customers.
          </p>
        </section>

        <section className="p-6 sm:p-8 lg:p-10">
          <div className="mb-8">
            <Link href="/" className="text-xl font-bold lg:hidden">
              ParcelRelay
            </Link>

            <h2 className="mt-6 text-2xl font-bold tracking-tight">
              Create your account
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Register to start using ParcelRelay.
            </p>
          </div>

          <RegisterForm />
        </section>
      </div>
    </main>
  );
}
