import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const userRes = await api.get("/api/users/me");
      const activitiesRes = await api.get("/api/activities/recent");
      setUser(userRes.data);
      setActivities(activitiesRes.data);
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
        👋 Olá, {user?.name?.split(" ")[0] || "atleta"}
      </Text>

      {/* Resumo */}
      <View
        style={{
          backgroundColor: "#f4f4f4",
          padding: 16,
          borderRadius: 12,
          marginBottom: 24,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
          🔥 Resumo de hoje
        </Text>
        <Text>Duração: 45min</Text>
        <Text>Calorias: 320 kcal</Text>
        <Text>VO₂max: 48.5</Text>
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
        onPress={() => console.log("Iniciar treino")}
      >
        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
          Iniciar treino
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
