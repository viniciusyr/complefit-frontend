import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function PremiumDashboard() {
  const [user, setUser] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<number[]>([]);

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    async function fetchData() {
      const userRes = await api.get("/api/users/me");
      const activitiesRes = await api.get("/api/activities/recent");
      const weeklyRes = await api.get("/api/activities/weekly-minutes");

      setUser(userRes.data);
      setActivities(activitiesRes.data);
      setWeeklyStats(weeklyRes.data); // Ex: [35, 42, 60, 55, 50, 70, 65]
    }
    fetchData();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 8 }}>
        👑 Bem-vindo, {user?.name?.split(" ")[0] || "atleta"}
      </Text>

      {/* Resumo Premium */}
      <View
        style={{
          backgroundColor: "#f4f4f4",
          padding: 16,
          borderRadius: 12,
          marginBottom: 24,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
          🔥 Resumo Premium
        </Text>
        <Text>Duração: 45min</Text>
        <Text>Calorias: 420 kcal</Text>
        <Text>VO₂max: 49.2</Text>
        <Text>FC Média: 128 bpm</Text>
        <Text>Passos: 7.842</Text>
      </View>

      {/* Gráfico semanal */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
          📈 Evolução semanal (minutos ativos)
        </Text>

        {weeklyStats.length > 0 && (
          <LineChart
            data={{
              labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
              datasets: [{ data: weeklyStats }],
            }}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: () => "#FF5A00",
              labelColor: () => "#555",
            }}
            bezier
            style={{ borderRadius: 12 }}
          />
        )}
      </View>

      {/* Meta semanal */}
      <View
        style={{
          marginBottom: 32,
          backgroundColor: "#fafafa",
          padding: 16,
          borderRadius: 12,
        }}
      >
        <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 8 }}>
          🎯 Meta semanal
        </Text>
        <Text>600 / 800 minutos</Text>
        <View
          style={{
            height: 10,
            backgroundColor: "#ddd",
            borderRadius: 10,
            marginTop: 6,
          }}
        >
          <View
            style={{
              height: "100%",
              width: "75%",
              backgroundColor: "#FF5A00",
              borderRadius: 10,
            }}
          />
        </View>
      </View>

      {/* Atividades recentes */}
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
        📅 Atividades recentes
      </Text>

      {activities.map((a, index) => (
        <View
          key={index}
          style={{
            backgroundColor: "#fafafa",
            padding: 12,
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontWeight: "500" }}>{a.type}</Text>
          <Text>{a.distance}km - {a.duration}min</Text>
          <Text style={{ color: "#777" }}>{a.date}</Text>
        </View>
      ))}

      {/* Insights */}
      <View
        style={{
          backgroundColor: "#FFF8E6",
          padding: 16,
          borderRadius: 12,
          marginTop: 24,
          marginBottom: 60,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 4 }}>
          💡 Insight da semana
        </Text>
        <Text>
          Seu volume médio aumentou 15% em relação à semana passada.
          Continue assim para melhorar seu VO₂max!
        </Text>
      </View>

      {/* Botão flutuante */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          left: 16,
          right: 16,
          backgroundColor: "#FF5A00",
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: "center",
        }}
        onPress={() => console.log("Iniciar treino premium")}
      >
        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
          Iniciar treino
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}