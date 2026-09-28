import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "COURIER" | "ADMIN";
  status: string;
}

export interface LoginData {
  user: AuthUser;
  accessToken: string;
}

export async function login(
  payload: LoginPayload,
): Promise<ApiResponse<LoginData>> {
  return apiClient<ApiResponse<LoginData>>("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export async function getMe(): Promise<ApiResponse<AuthUser>> {
  return apiClient<ApiResponse<AuthUser>>("/auth/me");
}

export async function refreshToken(): Promise<
  ApiResponse<{ accessToken: string }>
> {
  return apiClient<ApiResponse<{ accessToken: string }>>(
    "/auth/refresh-token",
    {
      method: "POST",
    },
  );
}

export async function logout(): Promise<ApiResponse<null>> {
  return apiClient<ApiResponse<null>>("/auth/logout", {
    method: "POST",
  });
}
