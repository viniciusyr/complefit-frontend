import { ScrollView, Text, View } from "react-native";
import { ActivitySummary } from "./components/ActivitySummary";
import { NextWorkout } from "./components/NextWorkout";
import { ProgressChart } from "./components/ProgressChart";

export default function HomeUser() {
  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold text-gray-800 mb-6">
        Olá, Vinicius 👋
      </Text>

      <ActivitySummary />
      <ProgressChart />
      <NextWorkout />

      <View className="h-6" />
    </ScrollView>
  );
}
