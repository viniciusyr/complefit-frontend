import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StatisticsTab() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-6 pt-6">
        <Text className="text-white text-2xl font-bold">Statistics</Text>
        <Text className="text-gray-400 mt-2">Progress charts and performance metrics show here.</Text>
      </View>
    </SafeAreaView>
  );
}
