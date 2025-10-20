import { clearTokens, getTokens, saveTokens } from "@/utils/secureStore";
import axios from "axios";

const API_BASE_URL = "http://localhost:8090/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Intercepta requests para adicionar token
api.interceptors.request.use(async (config) => {
  const tokens = await getTokens();
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

// Intercepta responses para tentar refresh se o token expirou
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const tokens = await getTokens();
      if (!tokens?.refreshToken) {
        await clearTokens();
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
          refreshToken: tokens.refreshToken,
        });

        await saveTokens(res.data.accessToken, res.data.refreshToken);

        // Reenvia a request original com novo token
        api.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        await clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);