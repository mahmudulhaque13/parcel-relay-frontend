"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
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
          },
        },
      );
    },
    [googleLogin, router, setUser],
  );

  const handleGoogleError = useCallback(() => {
    console.error("Google OAuth failed");
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
