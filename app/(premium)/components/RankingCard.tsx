import { Text, View } from "react-native";

export function RankingCard() {
  const ranking = { position: 4, total: 25 };

  return (
    <View className="bg-yellow-50 rounded-2xl p-4 shadow-sm border border-yellow-200">
      <Text className="text-lg font-semibold text-gray-800 mb-1">
        Ranking Semanal 🏅
      </Text>
      <Text className="text-gray-600">
        Você está em <Text className="font-bold text-yellow-600">#{ranking.position}</Text> de {ranking.total} usuários.
      </Text>
    </View>
  );
}
