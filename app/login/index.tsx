import OAuthButton from "@/components/OAuthButton";
import { login } from "@/services/authService";
import { saveTokens } from "@/utils/secureStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { width } = useWindowDimensions();

  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const handleLogin = async () => {
    try {
      const { accessToken, refreshToken } = await login(email, password);
      await saveTokens(accessToken, refreshToken);
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const containerWidth = isDesktop ? 450 : isTablet ? "70%" : "100%";

  return (
    <View className="flex-1 bg-white dark:bg-black items-center justify-center px-6">
      {/* Logo */}
      <Image
        source={require("@/assets/images/react-logo.png")}
        style={{
          width: isDesktop ? 160 : isTablet ? 120 : 90,
          height: isDesktop ? 160 : isTablet ? 120 : 90,
          marginBottom: 24,
        }}
        resizeMode="contain"
      />

      {/* Título */}
      <Text
        className={`font-bold text-gray-900 dark:text-white mb-8 ${
          isDesktop ? "text-5xl" : isTablet ? "text-4xl" : "text-3xl"
        }`}
      >
        Bem-vindo 👋
      </Text>

      {/* Campos */}
      <View
        style={{
          width: containerWidth,
          gap: 16,
          marginBottom: 20,
        }}
      >
        <TextInput
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900"
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900"
        />
      </View>

      {/* Botão principal */}
      <TouchableOpacity
        style={{
          width: containerWidth,
          backgroundColor: "#2563eb",
          borderRadius: 12,
          paddingVertical: 14,
          marginBottom: 16,
        }}
        onPress={handleLogin}
      >
        <Text className="text-center text-white font-semibold text-base">
          Entrar
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text className="text-gray-500 text-sm my-3">ou continue com</Text>

      {/* Login com Google */}
      <View style={{ width: containerWidth }}>
        <OAuthButton provider="google" />
      </View>

      {/* Link de cadastro */}
      <TouchableOpacity
        className="mt-6"
        onPress={() => router.push("/register")}
      >
        <Text className="text-gray-500 text-sm text-center">
          Ainda não tem conta?{" "}
          <Text className="text-blue-600 font-semibold">Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
