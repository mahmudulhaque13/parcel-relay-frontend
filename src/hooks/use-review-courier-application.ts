import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reviewCourierApplication } from "@/api/courier.api";

export function useReviewCourierApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationId,
      action,
    }: {
      applicationId: string;
      action: "APPROVE" | "REJECT";
    }) => reviewCourierApplication(applicationId, { action }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["courier-applications"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
  });
}
