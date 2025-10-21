import { Text, View } from "react-native";

export function ActivitySummary() {
  const summary = [
    { label: "Treinos", value: 18 },
    { label: "Tempo total", value: "12h 10m" },
    { label: "Calorias", value: "6.300 kcal" },
    { label: "Pontuação", value: "420 pts" },
  ];

  return (
    <View className="flex-row flex-wrap justify-between mb-6">
      {summary.map((item, i) => (
        <View
          key={i}
          className="bg-gray-100 rounded-2xl w-[47%] p-4 shadow-sm mb-3 items-center"
        >
          <Text className="text-xl font-bold text-gray-800">{item.value}</Text>
          <Text className="text-sm text-gray-500">{item.label}</Text>
        </View>
      ))}
    </View>
  );
}
