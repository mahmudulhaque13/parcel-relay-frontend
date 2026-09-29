import apiClient from "@/lib/apiClient";
import { clearAccessToken, setAccessToken } from "@/lib/auth-storage";
import type { ApiResponse } from "@/types/api";
import type { AuthUser, LoginPayload, LoginResponse } from "@/types/auth";

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

export async function refreshToken(): Promise<
  ApiResponse<{ accessToken: string }>
> {
  const response = await apiClient<ApiResponse<{ accessToken: string }>>(
    "/auth/refresh-token",
    {
      method: "POST",
    },
  );

  setAccessToken(response.data.accessToken);

  return response;
}

export async function logout(): Promise<ApiResponse<null>> {
  const response = await apiClient<ApiResponse<null>>("/auth/logout", {
    method: "POST",
  });

  clearAccessToken();

  return response;
}
