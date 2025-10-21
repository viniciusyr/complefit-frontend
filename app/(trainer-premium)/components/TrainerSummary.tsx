import { Text, View } from "react-native";

export function TrainerSummary() {
  const data = [
    { label: "Alunos ativos", value: 24 },
    { label: "Premiums", value: 8 },
    { label: "Inativos", value: 3 },
    { label: "Treinos este mês", value: 142 },
  ];

  return (
    <View className="flex-row flex-wrap justify-between mb-6">
      {data.map((item, i) => (
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
