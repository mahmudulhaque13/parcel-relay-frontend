"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  type UpdateAdminUserRolePayload,
  type UpdateAdminUserStatusPayload,
  updateAdminUserRole,
  updateAdminUserStatus,
} from "@/api/admin.api";

export function useUpdateAdminUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string;
      payload: UpdateAdminUserRolePayload;
    }) => updateAdminUserRole(userId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-dashboard-stats"],
      });
    },
  });
}

export function useUpdateAdminUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string;
      payload: UpdateAdminUserStatusPayload;
    }) => updateAdminUserStatus(userId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-dashboard-stats"],
      });
    },
  });
}
