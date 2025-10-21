import { Text, View } from "react-native";

export function GoalsSection() {
  const goals = [
    { title: "Correr 30km na semana", progress: 0.6 },
    { title: "5 treinos completos", progress: 0.8 },
  ];

  return (
    <View className="bg-gray-50 rounded-2xl p-4 mb-6 shadow-sm">
      <Text className="text-lg font-semibold text-gray-800 mb-3">Suas Metas</Text>

      {goals.map((goal, i) => (
        <View key={i} className="mb-3">
          <Text className="text-sm text-gray-600 mb-1">{goal.title}</Text>

          {/* Barra de progresso customizada */}
          <View className="w-full h-3 bg-gray-200 rounded-full">
            <View
              className="h-3 bg-green-500 rounded-full"
              style={{ width: `${goal.progress * 100}%` }}
            />
          </View>
        </View>
      ))}
    </View>
  );
}