import { useMutation } from "@tanstack/react-query";

import { googleLogin } from "@/api/auth.api";

export function useGoogleOAuth() {
  return useMutation({
    mutationFn: googleLogin,
  });
}
