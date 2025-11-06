import { api } from "@/services/api";
import { clearTokens } from "@/utils/secureStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeTab() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsed = JSON.parse(userData);
          const name = parsed?.name || parsed?.firstName || parsed?.first_name || parsed?.user?.name;
          if (name) {
            setUserName(name);
            return;
          }
        }

        try {
          const res = await api.get("/users/me");
          const u = res.data;
          const name = u?.name || u?.firstName || u?.first_name || u?.user?.name;
          if (name) {
            setUserName(name);
            return;
          }
        } catch {
        }

        setUserName(null);
      } catch (err) {
        console.warn("Failed to load user info:", err);
        setUserName(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await clearTokens();
    router.replace("/login");
  };

  // placeholder data (replace with backend-driven values)
  const stats = { calories: 1980, workouts: 4, minutes: 150 };
  const today = { title: "Full Body Strength", exercises: 7, duration: 40 };
  const recent = [
    { id: 1, title: "Chest Pump", time: "45 min", kcal: 320 },
    { id: 2, title: "Morning Run", time: "30 min", kcal: 280 },
    { id: 3, title: "Back & Biceps", time: "50 min", kcal: 360 },
  ];

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-6 pt-6">
          {/* Top header */}
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-gray-400 text-sm">Olá, {userName}</Text>
              <Text className="text-white text-2xl font-bold">{userName ? `Olá, ${userName.split(' ')[0]}` : 'Bem-vindo'}</Text>
            </View>
            <TouchableOpacity onPress={handleLogout} className="w-12 h-12 rounded-full bg-neutral-900 items-center justify-center">
              <Text className="text-orange-500 font-semibold">Sair</Text>
            </TouchableOpacity>
          </View>

          {/* Stats row */}
          <View className="flex-row space-x-3 mb-6">
            <LinearGradient colors={["#ff6a00", "#ff5500"]} className="flex-1 rounded-2xl p-4">
              <Text className="text-white text-xs">Calorias</Text>
              <Text className="text-white text-2xl font-bold mt-2">{stats.calories}</Text>
              <Text className="text-white/70 text-xs">esta semana</Text>
            </LinearGradient>

            <View className="w-32 bg-neutral-900 rounded-2xl p-4">
              <Text className="text-gray-400 text-xs">Treinos</Text>
              <Text className="text-white text-2xl font-bold mt-2">{stats.workouts}</Text>
            </View>
          </View>

          <View className="bg-neutral-900 rounded-2xl p-4 mb-6">
            <Text className="text-gray-400 text-xs">Tempo</Text>
            <Text className="text-white text-2xl font-bold mt-1">{stats.minutes} min</Text>
          </View>

          {/* Today's workout */}
          <Text className="text-white text-xl font-bold mb-3">Treino de hoje</Text>
          <View className="bg-neutral-900 rounded-2xl p-4 mb-6">
            <View className="flex-row justify-between">
              <View>
                <Text className="text-white text-lg font-bold">{today.title}</Text>
                <Text className="text-gray-400 text-sm mt-1">{today.exercises} exercícios • {today.duration} min</Text>
              </View>
              <View className="w-16 h-16 rounded-full bg-orange-500/20 items-center justify-center">
                <Text className="text-orange-500 text-2xl">💪</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-orange-500 rounded-xl py-3 mt-4" onPress={() => router.push('/home/workout' as any)}>
              <Text className="text-white text-center font-bold">Começar</Text>
            </TouchableOpacity>
          </View>

          {/* Recent activities */}
          <Text className="text-white text-xl font-bold mb-3">Atividades recentes</Text>
          {recent.map((r) => (
            <TouchableOpacity key={r.id} className="bg-neutral-900 rounded-xl p-4 mb-3 flex-row items-center">
              <View className="w-12 h-12 rounded-full bg-orange-500/20 items-center justify-center mr-4">
                <Text className="text-orange-500">🏃‍♂️</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold">{r.title}</Text>
                <Text className="text-gray-400 text-sm">{r.time}</Text>
              </View>
              <Text className="text-orange-500 font-bold">{r.kcal}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
