import { ofetch } from "ofetch";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

const apiClient = ofetch.create({
  baseURL: API_BASE_URL,
  credentials: "include",
});

export default apiClient;
