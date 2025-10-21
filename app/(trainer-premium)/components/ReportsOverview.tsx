import { Text, View } from "react-native";

export function ReportsOverview() {
  const reports = [
    { title: "Taxa de adesão", value: "89%" },
    { title: "Média de frequência", value: "4.3x/sem" },
    { title: "Taxa de abandono", value: "5%" },
  ];

  return (
    <View className="bg-gray-50 rounded-2xl p-4 mb-6 shadow-sm">
      <Text className="text-lg font-semibold text-gray-800 mb-3">Relatórios</Text>

      <View className="flex-row justify-between">
        {reports.map((r, i) => (
          <View key={i} className="items-center flex-1">
            <Text className="text-xl font-bold text-blue-600">{r.value}</Text>
            <Text className="text-sm text-gray-600 text-center">{r.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
