import { useQuery } from "@tanstack/react-query";

import { getCourierApplications } from "@/api/courier.api";

export function useCourierApplications() {
  return useQuery({
    queryKey: ["courier-applications"],
    queryFn: getCourierApplications,
  });
}
