import { ofetch } from "ofetch";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "@/lib/auth-storage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;

  refreshPromise = (async () => {
    try {
      const response = await ofetch<{
        success: boolean;
        data: {
          accessToken: string;
        };
      }>("/auth/refresh-token", {
        baseURL: API_BASE_URL,
        method: "POST",
        credentials: "include",
      });

      const newToken = response.data.accessToken;

      setAccessToken(newToken);

      return newToken;
    } catch {
      clearAccessToken();
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

const apiClient = ofetch.create({
  baseURL: API_BASE_URL,
  credentials: "include",

  onRequest({ options }) {
    const token = getAccessToken();

    if (!token) {
      return;
    }

    const headers = new Headers(options.headers);

    headers.set("Authorization", `Bearer ${token}`);

    options.headers = headers;
  },
});

export { refreshAccessToken };

export default apiClient;
