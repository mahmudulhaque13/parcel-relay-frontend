import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowLeft, MailCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";

import VerifyEmailForm from "@/components/auth/verify-email-form";

export const metadata: Metadata = { title: "Verify Email | ParcelRelay", description: "Verify your ParcelRelay account email address." };

export default function VerifyEmailPage() {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-76px)] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50/60 px-4 py-10 sm:px-6 sm:py-14">
      <div className="absolute -right-24 top-10 -z-10 size-80 rounded-full bg-orange-200/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 -z-10 size-80 rounded-full bg-blue-100/30 blur-3xl" />

      <div className="w-full max-w-md">
        <Link
          href="/register"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[#1D3557] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
        >
          <ArrowLeft className="size-4" />
          Back to registration
        </Link>

        <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-xl shadow-[#1D3557]/[0.06] sm:p-9">
          <div className="flex flex-col items-center text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-[#1D3557]/[0.06] text-[#1D3557] ring-1 ring-[#1D3557]/10">
              <MailCheck className="size-7" strokeWidth={1.8} />
            </div>

            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-[#E76F51]">
              Verify your account
            </p>

            <h1 className="mt-3 text-2xl font-black tracking-tight text-[#1D3557] sm:text-3xl">
              Verify your email
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter the 6-digit verification code sent to your email address to
              activate your account.
            </p>
          </div>

          <div className="mt-7 flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#E76F51]" />

            <p className="text-xs leading-5 text-slate-600">
              Keep your verification code private. It helps confirm that you own
              the email address associated with your account.
            </p>
          </div>

          <div className="mt-7">
            <Suspense
              fallback={
                <div className="flex min-h-24 items-center justify-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-5 text-sm text-slate-500">
                  <span className="loading loading-ring loading-md text-[#1D3557]" />
                  Loading verification form...
                </div>
              }
            >
              <VerifyEmailForm />
            </Suspense>
          </div>

          <div className="mt-7 border-t border-slate-100 pt-5 text-center">
            <p className="text-sm text-slate-500">
              Already verified?{" "}
              <Link
                href="/login"
                className="font-bold text-[#1D3557] underline decoration-[#E76F51]/60 underline-offset-4 transition-colors hover:text-[#E76F51] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51]"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>

        <p className="mt-5 text-center text-xs leading-5 text-slate-400">
          ParcelRelay · Secure email verification
        </p>
      </div>
    </main>
  );
}
