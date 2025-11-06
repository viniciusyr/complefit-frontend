import { apiGet } from "@/services/openapiClient";
import { clearTokens } from "@/utils/secureStore";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileTab() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await apiGet("/api/users/me");
        if (mounted) setUser(data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = async () => {
    await clearTokens();
    router.replace("/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-6 pt-6">
        <Text className="text-white text-2xl font-bold">Perfil</Text>
      </View>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#ff6a00" />
        </View>
      ) : (
        <View className="px-6 mt-4 gap-3">
          <Text className="text-white text-lg">{user?.firstName} {user?.lastName}</Text>
          <Text className="text-gray-400">{user?.email}</Text>
          <View className="mt-4 bg-neutral-900 rounded-2xl p-4 gap-2">
            <Text className="text-white">Gênero: <Text className="text-gray-300">{user?.gender ?? '-'}</Text></Text>
            <Text className="text-white">Altura: <Text className="text-gray-300">{user?.height ?? '-'}</Text></Text>
            <Text className="text-white">Peso: <Text className="text-gray-300">{user?.weight ?? '-'}</Text></Text>
            <Text className="text-white">Nascimento: <Text className="text-gray-300">{user?.birthDate ?? '-'}</Text></Text>
            <Text className="text-white">CPF: <Text className="text-gray-300">{user?.cpf ?? '-'}</Text></Text>
            <Text className="text-white">Papel: <Text className="text-gray-300">{user?.role ?? '-'}</Text></Text>
          </View>
          <View className="mt-6">
            <Text onPress={handleLogout} className="text-orange-500 font-semibold">Sair</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
