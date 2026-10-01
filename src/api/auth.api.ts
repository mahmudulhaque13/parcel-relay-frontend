import apiClient from "@/lib/apiClient";
import { clearAccessToken, setAccessToken } from "@/lib/auth-storage";
import type { ApiResponse } from "@/types/api";
import type { AuthUser, LoginPayload, LoginResponse } from "@/types/auth";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

export async function register(
  payload: RegisterPayload,
): Promise<ApiResponse<RegisterResponse>> {
  return apiClient<ApiResponse<RegisterResponse>>("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}

export interface VerifyEmailResponse {
  message: string;
}

export async function verifyEmail(
  payload: VerifyEmailPayload,
): Promise<ApiResponse<VerifyEmailResponse>> {
  return apiClient<ApiResponse<VerifyEmailResponse>>("/auth/verify-email", {
    method: "POST",
    body: payload,
  });
}

export async function login(
  payload: LoginPayload,
): Promise<ApiResponse<LoginResponse>> {
  const response = await apiClient<ApiResponse<LoginResponse>>("/auth/login", {
    method: "POST",
    body: payload,
  });

  setAccessToken(response.data.accessToken);

  return response;
}

export async function demoLogin(
  role: "CUSTOMER" | "COURIER",
): Promise<ApiResponse<LoginResponse>> {
  const email =
    role === "CUSTOMER"
      ? process.env.NEXT_PUBLIC_DEMO_CUSTOMER_EMAIL
      : process.env.NEXT_PUBLIC_DEMO_COURIER_EMAIL;

  const password = process.env.NEXT_PUBLIC_DEMO_PASSWORD;

  if (!email || !password) {
    throw new Error("Demo credentials are not configured");
  }

  return login({
    email,
    password,
  });
}

export async function getMe(): Promise<ApiResponse<AuthUser>> {
  return apiClient<ApiResponse<AuthUser>>("/auth/me");
}

let refreshPromise: Promise<ApiResponse<{ accessToken: string }>> | null = null;

export async function refreshToken(): Promise<
  ApiResponse<{ accessToken: string }>
> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = apiClient<ApiResponse<{ accessToken: string }>>(
    "/auth/refresh-token",
    {
      method: "POST",
    },
  )
    .then((response) => {
      setAccessToken(response.data.accessToken);
      return response;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

export async function logout(): Promise<ApiResponse<null>> {
  const response = await apiClient<ApiResponse<null>>("/auth/logout", {
    method: "POST",
  });

  clearAccessToken();

  return response;
}

export async function googleLogin(payload: {
  idToken: string;
}): Promise<ApiResponse<LoginResponse>> {
  const response = await apiClient<ApiResponse<LoginResponse>>("/auth/google", {
    method: "POST",
    body: payload,
  });

  setAccessToken(response.data.accessToken);

  return response;
}
