import { ScrollView, Text, View } from "react-native";
import { IncomeStats } from "./components/IncomeStats";
import { PerformanceChart } from "./components/PerformanceChart";
import { ReportsOverview } from "./components/ReportsOverview";
import { StudentsList } from "./components/StudentsList";
import { TrainerSummary } from "./components/TrainerSummary";

export default function HomeTrainerPremium() {
  return (
    <ScrollView className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold text-gray-800 mb-6">
        Olá, Coach Vinicius 🧠
      </Text>

      <TrainerSummary />
      <PerformanceChart />
      <StudentsList />
      <ReportsOverview />
      <IncomeStats />

      <View className="h-6" />
    </ScrollView>
  );
}
