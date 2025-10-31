import { api } from "@/services/api";
import { handleApiError } from "@/services/apiErrorHandler";

export async function login(email: string, password: string) {
    try {
        const response = await api.post("/auth/login", { email, password });
        return response.data; // { accessToken, refreshToken, user }
    } catch (error) {
        throw new Error(handleApiError(error));
    }
}

export async function register(name: string, email: string, password: string) {
    try {
        const response = await api.post("/auth/register", { name, email, password });
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
}

export async function refreshToken(refreshToken: string) {
    try {
        const response = await api.post("/auth/refresh-token", { refreshToken });
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
}
