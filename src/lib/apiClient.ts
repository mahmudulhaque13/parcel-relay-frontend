import { ofetch } from "ofetch";

import { getAccessToken } from "@/lib/auth-storage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

const apiClient = ofetch.create({
  baseURL: API_BASE_URL,
  credentials: "include",

  onRequest({ options }) {
    const accessToken = getAccessToken();

    if (accessToken) {
      const headers = new Headers(options.headers);

      headers.set("Authorization", `Bearer ${accessToken}`);

      options.headers = headers;
    }
  },
});

export default apiClient;
