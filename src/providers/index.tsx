"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";

import AuthProvider from "./auth.provider";
import GoogleAuthProvider from "./google-auth.provider";
import QueryProvider from "./query.provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleAuthProvider>
      <QueryProvider>
        <AuthProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </QueryProvider>
    </GoogleAuthProvider>
  );
}
