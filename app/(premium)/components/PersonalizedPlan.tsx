import { Text, View } from "react-native";

export function PersonalizedPlan() {
  const plan = {
    name: "Plano de Performance Avançada",
    duration: "4 semanas",
    description: "Foco em força e resistência. Treinos adaptativos com base no seu desempenho.",
  };

  return (
    <View className="bg-gray-50 rounded-2xl p-4 mb-6 shadow-sm">
      <Text className="text-lg font-semibold text-gray-800 mb-1">{plan.name}</Text>
      <Text className="text-gray-500 mb-2">{plan.duration}</Text>
      <Text className="text-sm text-gray-600">{plan.description}</Text>
    </View>
  );
}