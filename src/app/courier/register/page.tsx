import Link from "next/link";

import CourierRegisterForm from "@/components/auth/courier-register-form";

export default function CourierRegisterPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-base-200/40 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border bg-background shadow-sm lg:grid-cols-2">
        <section className="hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
          <div>
            <Link href="/" className="text-2xl font-bold">
              ParcelRelay
            </Link>

            <h1 className="mt-12 text-4xl font-bold tracking-tight">
              Join ParcelRelay as a courier.
            </h1>

            <p className="mt-5 leading-7 text-primary-foreground/80">
              Submit your courier application, verify your email, and get
              approved by the ParcelRelay administration team.
            </p>
          </div>

          <p className="text-sm text-primary-foreground/70">
            Deliver more. Earn more. Grow with ParcelRelay.
          </p>
        </section>

        <section className="p-6 sm:p-8 lg:p-10">
          <div className="mb-8">
            <Link href="/" className="text-xl font-bold lg:hidden">
              ParcelRelay
            </Link>

            <h2 className="mt-6 text-2xl font-bold tracking-tight">
              Courier application
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Complete the form below to apply as a ParcelRelay courier.
            </p>
          </div>

          <CourierRegisterForm />
        </section>
      </div>
    </main>
  );
}
