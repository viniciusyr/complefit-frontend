import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

/**
 * Save tokens securely.
 * Uses SecureStore on mobile and AsyncStorage on web.
 */
export async function saveTokens(accessToken: string, refreshToken: string) {
  try {
    if (Platform.OS === "web") {
      await AsyncStorage.multiSet([
        [ACCESS_TOKEN_KEY, accessToken],
        [REFRESH_TOKEN_KEY, refreshToken],
      ]);
    } else {
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
    }
  } catch (error) {
    console.error("Error saving tokens:", error);
  }
}

/**
 * Retrieve stored tokens.
 * Works on both mobile and web.
 */
export async function getTokens() {
  try {
    if (Platform.OS === "web") {
      const values = await AsyncStorage.multiGet([
        ACCESS_TOKEN_KEY,
        REFRESH_TOKEN_KEY,
      ]);
      const map = Object.fromEntries(values);
      return {
        accessToken: map[ACCESS_TOKEN_KEY] ?? null,
        refreshToken: map[REFRESH_TOKEN_KEY] ?? null,
      };
    } else {
      const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      return { accessToken, refreshToken };
    }
  } catch (error) {
    console.error("Error retrieving tokens:", error);
    return { accessToken: null, refreshToken: null };
  }
}

/**
 * Clear stored tokens.
 * Works on both mobile and web.
 */
export async function clearTokens() {
  try {
    if (Platform.OS === "web") {
      await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
    } else {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    }
  } catch (error) {
    console.error("Error clearing tokens:", error);
  }
}
