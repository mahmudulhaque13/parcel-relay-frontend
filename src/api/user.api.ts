import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/api";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "COURIER" | "ADMIN";
  status: string;
  authProvider: string;
  emailVerified: boolean;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  courierProfile: unknown;
}

export interface UpdateProfilePayload {
  name: string;
  imageUrl?: string;
}

export async function getMyProfile(): Promise<ApiResponse<UserProfile>> {
  return apiClient<ApiResponse<UserProfile>>("/users/me");
}

export async function updateMyProfile(
  payload: UpdateProfilePayload,
): Promise<ApiResponse<UserProfile>> {
  return apiClient<ApiResponse<UserProfile>>("/users/me", {
    method: "PATCH",
    body: payload,
  });
}
