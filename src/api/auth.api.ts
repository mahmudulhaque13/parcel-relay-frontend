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

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  email: string;
}

export async function forgotPassword(
  payload: ForgotPasswordPayload,
): Promise<ApiResponse<ForgotPasswordResponse>> {
  return apiClient<ApiResponse<ForgotPasswordResponse>>(
    "/auth/forgot-password",
    {
      method: "POST",
      body: payload,
    },
  );
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  email: string;
  message: string;
}

export async function resetPassword(
  payload: ResetPasswordPayload,
): Promise<ApiResponse<ResetPasswordResponse>> {
  return apiClient<ApiResponse<ResetPasswordResponse>>("/auth/reset-password", {
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
  role: "CUSTOMER" | "COURIER" | "ADMIN",
): Promise<ApiResponse<LoginResponse>> {
  const response = await apiClient<ApiResponse<LoginResponse>>(
    "/auth/demo-login",
    {
      method: "POST",
      body: { role },
    },
  );

  setAccessToken(response.data.accessToken);

  return response;
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
