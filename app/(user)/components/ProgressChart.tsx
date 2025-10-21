import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

export function ProgressChart() {
  const screenWidth = Dimensions.get("window").width - 40; // padding lateral

  return (
    <View className="bg-gray-50 rounded-2xl p-4 shadow-sm mb-6">
      <Text className="text-lg font-semibold text-gray-800 mb-3">
        Progresso Semanal
      </Text>

      <LineChart
        data={{
          labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
          datasets: [{ data: [3, 4, 5, 4.5, 6, 5.5] }],
        }}
        width={screenWidth}
        height={200}
        yAxisSuffix="k"
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
          labelColor: () => "#6b7280",
          propsForDots: { r: "4" },
        }}
        bezier
        style={{ borderRadius: 16 }}
      />
    </View>
  );
}
