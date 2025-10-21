import { Text, View } from "react-native";

export function NextWorkout() {
  const nextWorkout = {
    title: "Treino de Força - Inferior",
    date: "Quinta, 24 de Outubro",
    goal: "Foco em resistência e glúteos",
  };

  return (
    <View className="bg-gray-50 rounded-2xl p-4 shadow-sm">
      <Text className="text-lg font-semibold text-gray-800 mb-1">
        {nextWorkout.title}
      </Text>
      <Text className="text-gray-500 mb-1">{nextWorkout.date}</Text>
      <Text className="text-sm text-gray-600">{nextWorkout.goal}</Text>
    </View>
  );
}
