import { Text, View } from "react-native";

export function IncomeStats() {
  const income = {
    total: "R$ 3.480,00",
    lastMonth: "R$ 2.970,00",
    variation: "+17%",
  };

  return (
    <View className="bg-blue-50 rounded-2xl p-4 shadow-sm border border-blue-200">
      <Text className="text-lg font-semibold text-gray-800 mb-2">
        Renda Mensal
      </Text>
      <Text className="text-2xl font-bold text-blue-700 mb-1">
        {income.total}
      </Text>
      <Text className="text-sm text-gray-600">
        Mês anterior: {income.lastMonth} ({income.variation})
      </Text>
    </View>
  );
}
