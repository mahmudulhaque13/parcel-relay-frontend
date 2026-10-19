import { ArrowLeft, PackageCheck, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In | ParcelRelay",
  description:
    "Sign in to ParcelRelay to manage shipments, payments, and delivery operations.",
};

export default function LoginPage() {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-76px)] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50/60 px-4 py-12 transition-colors duration-200 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 sm:px-6 sm:py-16 dark:to-slate-950 dark:via-slate-900">
      <div className="absolute -right-24 top-10 -z-10 size-72 rounded-full bg-orange-200/20 blur-3xl dark:bg-orange-500/[0.06] sm:size-96" />
      <div className="absolute -bottom-24 -left-24 -z-10 size-80 rounded-full bg-blue-100/30 blur-3xl dark:bg-blue-500/[0.06]" />

      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[#1D3557] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51] dark:text-slate-300 dark:hover:text-white dark:text-slate-400"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>

        <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-xl shadow-[#1D3557]/[0.06] transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/20 sm:p-9 dark:bg-slate-900/95">
          <div className="mb-7 text-center">
            <Link
              href="/"
              aria-label="ParcelRelay home"
              className="mx-auto inline-flex items-center gap-3"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-[#1D3557] text-white shadow-md shadow-[#1D3557]/15">
                <PackageCheck className="size-6" />
              </span>

              <span className="text-2xl font-extrabold tracking-tight text-[#1D3557] dark:text-white dark:text-foreground">
                Parcel<span className="text-[#E76F51]">Relay</span>
              </span>
            </Link>

            <h1 className="mt-7 text-3xl font-black tracking-tight text-[#1D3557] dark:text-white dark:text-foreground">
              Welcome back
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300 dark:text-slate-400">
              Sign in to your ParcelRelay account
            </p>
          </div>

          <div className="mb-6 flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 transition-colors duration-200 dark:border-slate-700 dark:bg-slate-800 dark:border-slate-800 dark:bg-slate-950/80">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#E76F51]" />

            <p className="text-xs leading-5 text-slate-600 dark:text-slate-200 dark:text-slate-300">
              Access your shipments, track delivery progress, and manage your
              account from one place.
            </p>
          </div>

          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-slate-400 dark:text-slate-500">
          ParcelRelay · Courier and delivery management
        </p>
      </div>
    </main>
  );
}
