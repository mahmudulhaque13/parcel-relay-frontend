"use client";

import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { demoLogin, login } from "@/api/auth.api";
import GoogleLoginComponent from "@/components/modules/google-login/GoogleLogin";
import { useAuth } from "@/hooks/use-auth";
import { getRoleHome } from "@/routes/role-routes";
import { loginSchema } from "@/validation/auth.validation";

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        const response = await login({
          email: value.email.trim(),
          password: value.password,
        });

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
                autoComplete="email"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />

              {field.state.meta.errors.map((error) => (
                <p key={error?.toString()} className="text-sm text-red-600">
                  {error?.toString()}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <div className="space-y-2">
              <label htmlFor={field.name} className="text-sm font-medium">
                Password
              </label>

              <div className="relative">
                <input
                  id={field.name}
                  name={field.name}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {field.state.meta.errors.map((error) => (
                <p key={error?.toString()} className="text-sm text-red-600">
                  {error?.toString()}
                </p>
              ))}
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
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
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

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <GoogleLoginComponent />
        </div>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Demo login
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handleDemoLogin("CUSTOMER")}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Demo Customer
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin("COURIER")}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Demo Courier
          </button>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
