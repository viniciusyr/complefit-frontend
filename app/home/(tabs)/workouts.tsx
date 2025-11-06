import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WorkoutsTab() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-6 pt-6">
        <Text className="text-white text-2xl font-bold">Workouts</Text>
        <Text className="text-gray-400 mt-2">Your scheduled workouts and training plans will appear here.</Text>
      </View>
    </SafeAreaView>
  );
}
