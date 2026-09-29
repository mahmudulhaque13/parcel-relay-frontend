"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { demoLogin, login } from "@/api/auth.api";
import { useAuth } from "@/hooks/use-auth";
import { getRoleHome } from "@/routes/role-routes";
import { loginSchema } from "@/validation/auth.validation";

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onSubmit: loginSchema,
    },

    onSubmit: async ({ value }) => {
      setErrorMessage("");

      try {
        const response = await login(value);

        setUser(response.data.user);

        router.push(getRoleHome(response.data.user.role));
      } catch (error) {
        console.error("Login failed:", error);

        setErrorMessage(
          "Invalid email or password. Please check your credentials and try again.",
        );
      }
    },
  });

  const handleDemoLogin = async (role: "CUSTOMER" | "COURIER") => {
    setErrorMessage("");

    try {
      const response = await demoLogin(role);

      setUser(response.data.user);

      router.push(getRoleHome(response.data.user.role));
    } catch (error) {
      console.error("Demo login failed:", error);

      setErrorMessage(
        "Demo login failed. Please make sure the backend is running.",
      );
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        {errorMessage && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {errorMessage}
          </div>
        )}

        <form.Field name="email">
          {(field) => (
            <div className="space-y-2">
              <label htmlFor={field.name} className="text-sm font-medium">
                Email
              </label>

              <input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
              />

              {field.state.meta.errors.length > 0 && (
                <p className="text-sm text-red-500">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <div className="space-y-2">
              <label htmlFor={field.name} className="text-sm font-medium">
                Password
              </label>

              <input
                id={field.name}
                name={field.name}
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
              />

              {field.state.meta.errors.length > 0 && (
                <p className="text-sm text-red-500">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-ring loading-sm" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          )}
        </form.Subscribe>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>

        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-sm text-muted-foreground">
            Or try a demo account
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handleDemoLogin("CUSTOMER")}
          className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
        >
          Continue as Customer
        </button>

        <button
          type="button"
          onClick={() => handleDemoLogin("COURIER")}
          className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
        >
          Continue as Courier
        </button>
      </div>
    </div>
  );
}
