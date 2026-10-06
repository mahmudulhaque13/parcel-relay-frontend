"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

import { useAuth } from "@/hooks/use-auth";
import { useGoogleOAuth } from "@/hooks/use-google-auth";
import { getRoleHome } from "@/routes/role-routes";

export default function GoogleLoginComponent() {
  const router = useRouter();
  const { setUser } = useAuth();
  const { mutate: googleLogin } = useGoogleOAuth();

  const handleGoogleSuccess = useCallback(
    (credentialResponse: { credential?: string }) => {
      const idToken = credentialResponse.credential;

      if (!idToken) {
        console.error("Google login failed: ID token missing");
        toast.error("Google login failed. Please try again.");
        return;
      }

      googleLogin(
        { idToken },
        {
          onSuccess: (response) => {
            setUser(response.data.user);
            router.push(getRoleHome(response.data.user.role));
          },

          onError: (error) => {
            console.error("Google login failed:", error);

            toast.error(
              error instanceof Error
                ? error.message
                : "Google login failed. Please try again.",
            );
          },
        },
      );
    },
    [googleLogin, router, setUser],
  );

  const handleGoogleError = useCallback(() => {
    console.error("Google OAuth failed");
    toast.error("Google authentication failed. Please try again.");
  }, []);

  return (
    <GoogleLogin
      theme="outline"
      shape="pill"
      text="continue_with"
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
    />
  );
}
