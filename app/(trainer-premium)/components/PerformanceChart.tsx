import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

export function PerformanceChart() {
  const screenWidth = Dimensions.get("window").width - 40;

  return (
    <View className="bg-gray-50 rounded-2xl p-4 shadow-sm mb-6">
      <Text className="text-lg font-semibold text-gray-800 mb-3">
        Evolução Média dos Alunos
      </Text>

      <LineChart
        data={{
          labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
          datasets: [{ data: [70, 76, 82, 90] }],
        }}
        width={screenWidth}
        height={200}
        yAxisSuffix="%"
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
          labelColor: () => "#6b7280",
          propsForDots: { r: "4" },
        }}
        bezier
        style={{ borderRadius: 16 }}
      />
    </View>
  );
}
