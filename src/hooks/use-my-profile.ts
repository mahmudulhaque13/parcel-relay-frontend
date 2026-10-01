import { useQuery } from "@tanstack/react-query";

import { getMyProfile } from "@/api/user.api";

export const myProfileQueryKey = ["my-profile"];

export function useMyProfile() {
  return useQuery({
    queryKey: myProfileQueryKey,
    queryFn: getMyProfile,
  });
}
