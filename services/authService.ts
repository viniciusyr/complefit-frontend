import axios from "axios";

const API_URL = "http://localhost:8090/api/auth";

export async function login(email: string, password: string) {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; // { accessToken, refreshToken, user }
}

export const register = async (name: string, email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to register");
  }

  return response.json(); // { accessToken, refreshToken, user }
};

export async function refreshToken(refreshToken: string) {
  const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
  return response.data;
}