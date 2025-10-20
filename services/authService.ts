import axios from "axios";

const API_URL = "http://localhost:8090/api/auth";

export async function login(email: string, password: string) {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; // { accessToken, refreshToken }
}

export async function refreshToken(refreshToken: string) {
  const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
  return response.data;
}