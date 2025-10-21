import { ScrollView, Text, View } from "react-native";
import { ActivitySummary } from "./components/ActivitySummary";
import { GoalsSection } from "./components/GoalsSection";
import { PersonalizedPlan } from "./components/PersonalizedPlan";
import { ProgressChart } from "./components/ProgressChart";
import { RankingCard } from "./components/RankingCard";

export default function HomePremium() {
  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold text-gray-800 mb-6">
        Bem-vindo de volta, Vinicius 👑
      </Text>

      <ActivitySummary />
      <ProgressChart />
      <GoalsSection />
      <PersonalizedPlan />
      <RankingCard />

      <View className="h-6" />
    </ScrollView>
  );
}
