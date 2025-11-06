import { fetchWorkoutsForCurrentUser, Workout } from "@/services/workoutsService";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WorkoutsTab() {
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

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-6 pt-6 pb-2">
        <Text className="text-white text-2xl font-bold">Workouts</Text>
        <Text className="text-gray-400 mt-2">Suas rotinas de treino</Text>
      </View>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#ff6a00" />
        </View>
      ) : workouts.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-gray-400 text-center">Nenhum treino encontrado.</Text>
        </View>
      ) : (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => (
            <View className="bg-neutral-900 rounded-2xl p-4">
              <Text className="text-white font-semibold text-base">{item.title || "Treino"}</Text>
              {item.description ? (
                <Text className="text-gray-400 text-sm mt-1" numberOfLines={2}>
                  {item.description}
                </Text>
              ) : null}
              <View className="flex-row mt-3 justify-between">
                <Text className="text-gray-400 text-xs">
                  Duração: {item.totalDurationSeconds ? Math.round(item.totalDurationSeconds / 60) : 0} min
                </Text>
                {item.createdAt ? (
                  <Text className="text-gray-500 text-xs">{new Date(item.createdAt).toLocaleDateString()}</Text>
                ) : null}
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
