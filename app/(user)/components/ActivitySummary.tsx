import { Text, View } from "react-native";

export function ActivitySummary() {
  const summary = [
    { label: "Treinos", value: 12 },
    { label: "Tempo total", value: "8h 35m" },
    { label: "Calorias", value: "4.200 kcal" },
  ];

  return (
    <View className="flex-row justify-between mb-6">
      {summary.map((item, index) => (
        <View
          key={index}
          className="bg-gray-100 rounded-2xl w-[31%] p-4 shadow-sm items-center"
        >
          <Text className="text-xl font-bold text-gray-800">{item.value}</Text>
          <Text className="text-sm text-gray-500">{item.label}</Text>
        </View>
      ))}
    </View>
  );
}
