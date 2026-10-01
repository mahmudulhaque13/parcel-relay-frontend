import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type UpdateProfilePayload, updateMyProfile } from "@/api/user.api";
import { myProfileQueryKey } from "@/hooks/use-my-profile";

export function useUpdateMyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateMyProfile(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: myProfileQueryKey,
      });
    },
  });
}
