import { fetchWorkoutsForCurrentUser, Workout } from "@/services/workoutsService";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StatisticsTab() {
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const list = await fetchWorkoutsForCurrentUser();
        if (mounted) setWorkouts(list);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const count = workouts.length;
    const totalMinutes = workouts.reduce((sum, w) => sum + Math.round((w.totalDurationSeconds || 0) / 60), 0);
    return { count, totalMinutes };
  }, [workouts]);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-6 pt-6">
        <Text className="text-white text-2xl font-bold">Estatísticas</Text>
      </View>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#ff6a00" />
        </View>
      ) : (
        <View className="px-6 mt-4 gap-4">
          <View className="bg-neutral-900 p-4 rounded-2xl">
            <Text className="text-gray-400 text-xs">Treinos</Text>
            <Text className="text-white text-2xl font-bold mt-1">{stats.count}</Text>
          </View>
          <View className="bg-neutral-900 p-4 rounded-2xl">
            <Text className="text-gray-400 text-xs">Minutos totais</Text>
            <Text className="text-white text-2xl font-bold mt-1">{stats.totalMinutes} min</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
