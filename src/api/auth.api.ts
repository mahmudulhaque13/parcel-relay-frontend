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
