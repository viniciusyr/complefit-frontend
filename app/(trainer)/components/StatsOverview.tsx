import { Text, View } from "react-native";

export function StatsOverview() {
  const stats = [
    { label: "Alunos Ativos", value: 12 },
    { label: "Treinos Criados", value: 48 },
    { label: "Progresso Médio", value: "72%" },
  ];

  return (
    <View className="flex-row flex-wrap justify-between">
      {stats.map((item, index) => (
        <View
          key={index}
          className="bg-gray-100 rounded-2xl w-[31%] p-4 mb-3 shadow-sm"
        >
          <Text className="text-lg font-bold text-gray-800">{item.value}</Text>
          <Text className="text-sm text-gray-500">{item.label}</Text>
        </View>
      ))}
    </View>
  );
}
