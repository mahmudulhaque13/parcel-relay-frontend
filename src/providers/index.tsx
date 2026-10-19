"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";

import AuthProvider from "./auth.provider";
import GoogleAuthProvider from "./google-auth.provider";
import QueryProvider from "./query.provider";
import ThemeProvider from "./theme.provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <GoogleAuthProvider>
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </QueryProvider>
      </GoogleAuthProvider>
    </ThemeProvider>
  );
}
