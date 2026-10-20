"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { demoLogin, login } from "@/api/auth.api";
import GoogleLoginComponent from "@/components/modules/google-login/GoogleLogin";
import { useAuth } from "@/hooks/use-auth";
import { getRoleHome } from "@/routes/role-routes";
import { loginSchema } from "@/validation/auth.validation";

type DemoRole = "CUSTOMER" | "COURIER" | "ADMIN";

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [demoLoadingRole, setDemoLoadingRole] = useState<DemoRole | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onSubmit: loginSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        const response = await login({
          email: value.email.trim(),
          password: value.password,
        });

        setUser(response.data.user);
        router.push(getRoleHome(response.data.user.role));
      } catch (error) {
        console.error("Login failed:", error);

        toast.error(
          "Invalid email or password. Please check your credentials and try again.",
        );
      }
    },
  });

  const handleDemoLogin = async (role: DemoRole) => {
    // Prevent multiple demo login requests at the same time.
    if (demoLoadingRole !== null) return;

    setDemoLoadingRole(role);

    try {
      const response = await demoLogin(role);

      setUser(response.data.user);
      router.push(getRoleHome(response.data.user.role));
    } catch (error) {
      console.error("Demo login failed:", error);

      toast.error(
        "Demo login failed. Please make sure the backend is running.",
      );
    } finally {
      setDemoLoadingRole(null);
    }
  };

  const inputClassName =
    "min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1D3557] focus:ring-4 focus:ring-[#1D3557]/[0.08] aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:hover:border-slate-500 dark:focus:border-sky-400 dark:focus:ring-sky-400/10 dark:aria-[invalid=true]:border-red-400";

  const labelClassName =
    "block text-sm font-bold text-[#1D3557] dark:text-slate-100";

  const visibilityButtonClassName =
    "absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#1D3557] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#E76F51] dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white";

  const dividerClassName = "h-px flex-1 bg-slate-200 dark:bg-slate-700";

  const dividerLabelClassName =
    "px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-400";

  const demoPassword = process.env.NEXT_PUBLIC_DEMO_PASSWORD ?? "";
  const demoCredentialProfiles = [
    {
      role: "CUSTOMER" as const,
      label: "Fill customer credentials",
      email: process.env.NEXT_PUBLIC_DEMO_CUSTOMER_EMAIL?.trim() ?? "",
    },
    {
      role: "COURIER" as const,
      label: "Fill courier credentials",
      email: process.env.NEXT_PUBLIC_DEMO_COURIER_EMAIL?.trim() ?? "",
    },
    {
      role: "ADMIN" as const,
      label: "Fill admin credentials",
      email: process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL?.trim() ?? "",
    },
  ].filter((profile) => profile.email && demoPassword);

  const fillDemoCredentials = (email: string) => {
    form.setFieldValue("email", email);
    form.setFieldValue("password", demoPassword);
    toast.success("Demo credentials filled. Select Sign in to continue.");
  };

  const demoButtonClassName =
    "flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3 text-sm font-bold text-[#1D3557] transition duration-200 hover:border-[#1D3557]/25 hover:bg-[#1D3557]/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E76F51] disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-700";

  return (
    <div className="space-y-7">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        <form.Field name="email">
          {(field) => (
            <div className="space-y-2">
              <label htmlFor={field.name} className={labelClassName}>
                Email address
              </label>

              <input
                id={field.name}
                name={field.name}
                type="email"
                autoComplete="email"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="you@example.com"
                aria-invalid={field.state.meta.errors.length > 0}
                className={inputClassName}
              />

              {field.state.meta.errors.map((error) => (
                <p
                  key={error?.toString()}
                  className="text-sm font-medium text-red-600 dark:text-red-400"
                >
                  {error?.toString()}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <div className="space-y-2">
              <label htmlFor={field.name} className={labelClassName}>
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
                  aria-invalid={field.state.meta.errors.length > 0}
                  className={`${inputClassName} pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className={visibilityButtonClassName}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {field.state.meta.errors.map((error) => (
                <p
                  key={error?.toString()}
                  className="text-sm font-medium text-red-600 dark:text-red-400"
                >
                  {error?.toString()}
                </p>
              ))}
            </div>
          )}
        </form.Field>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-[#1D3557] underline decoration-transparent underline-offset-4 transition-colors hover:text-[#E76F51] hover:decoration-[#E76F51] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51] dark:text-sky-300 dark:hover:text-orange-300"
          >
            Forgot password?
          </Link>
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting || demoLoadingRole !== null}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1D3557] px-4 py-3 text-sm font-bold text-white shadow-md shadow-[#1D3557]/10 transition duration-200 hover:-translate-y-0.5 hover:bg-[#29486f] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-ring loading-sm" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          )}
        </form.Subscribe>
      </form>

      {/* Google login */}
      <div className="space-y-4">
        <div className="relative flex items-center justify-center">
          <span className={dividerClassName} />
          <span className={dividerLabelClassName}>Or continue with</span>
          <span className={dividerClassName} />
        </div>

        <div className="flex justify-center">
          <GoogleLoginComponent />
        </div>
      </div>

      {/* Demo login */}
      <div className="space-y-4">
        <div className="relative flex items-center justify-center">
          <span className={dividerClassName} />
          <span className={dividerLabelClassName}>Demo login</span>
          <span className={dividerClassName} />
        </div>

        {demoCredentialProfiles.length > 0 && (
          <div className="space-y-2">
            <p className="text-center text-xs text-muted-foreground">
              Fill configured demo credentials into the form
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {demoCredentialProfiles.map((profile) => (
                <button
                  key={profile.role}
                  type="button"
                  onClick={() => fillDemoCredentials(profile.email)}
                  disabled={demoLoadingRole !== null}
                  className={demoButtonClassName}
                >
                  {profile.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => handleDemoLogin("CUSTOMER")}
            disabled={demoLoadingRole !== null}
            aria-busy={demoLoadingRole === "CUSTOMER"}
            className={demoButtonClassName}
          >
            {demoLoadingRole === "CUSTOMER" ? "Signing in..." : "Demo Customer"}
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin("COURIER")}
            disabled={demoLoadingRole !== null}
            aria-busy={demoLoadingRole === "COURIER"}
            className={demoButtonClassName}
          >
            {demoLoadingRole === "COURIER" ? "Signing in..." : "Demo Courier"}
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin("ADMIN")}
            disabled={demoLoadingRole !== null}
            aria-busy={demoLoadingRole === "ADMIN"}
            className={demoButtonClassName}
          >
            {demoLoadingRole === "ADMIN" ? "Signing in..." : "Demo Admin"}
          </button>
        </div>
      </div>

      {/* Keep signup link here; do not duplicate it in the parent page */}
      <p className="border-t border-slate-100 pt-5 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="inline-flex items-center gap-1 font-bold text-[#1D3557] underline decoration-[#E76F51]/60 underline-offset-4 transition-colors hover:text-[#E76F51] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E76F51] dark:text-sky-300 dark:hover:text-orange-300"
        >
          Create an account
          <ArrowRight className="size-3.5" />
        </Link>
      </p>
    </div>
  );
}
