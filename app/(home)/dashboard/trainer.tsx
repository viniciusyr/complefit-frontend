import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function TrainerDashboard() {
  const [trainer, setTrainer] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [weeklyAvg, setWeeklyAvg] = useState<number[]>([]);

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    async function fetchData() {
      try {
        const trainerRes = await api.get("/api/trainers/me");
        const studentsRes = await api.get("/api/trainers/students");
        const weeklyAvgRes = await api.get("/api/trainers/weekly-avg");

        setTrainer(trainerRes.data);
        setStudents(studentsRes.data);
        setWeeklyAvg(weeklyAvgRes.data);
      } catch (err) {
        console.error("Erro ao carregar dashboard do trainer:", err);
      }
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
        🏋️‍♂️ Olá, {trainer?.name?.split(" ")[0] || "Treinador"}
      </Text>
      <Text style={{ color: "#666", marginBottom: 20 }}>
        Gerencie seus alunos e acompanhe o progresso.
      </Text>

      {/* Resumo global */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <StatCard label="Alunos" value={students.length} />
        <StatCard
          label="Ativos hoje"
          value={students.filter((s) => s.activeToday).length}
        />
        <StatCard
          label="Treinos semana"
          value={students.reduce((acc, s) => acc + s.weeklySessions, 0)}
        />
      </View>

      {/* Gráfico de desempenho médio semanal */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
          📊 Volume médio semanal dos alunos
        </Text>

        {weeklyAvg.length > 0 && (
          <LineChart
            data={{
              labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
              datasets: [{ data: weeklyAvg }],
            }}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: () => "#2D9CDB",
              labelColor: () => "#555",
            }}
            bezier
            style={{ borderRadius: 12 }}
          />
        )}
      </View>

      {/* Lista de alunos */}
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
        👥 Alunos
      </Text>

      {students.map((student) => (
        <TouchableOpacity
          key={student.id}
          style={{
            backgroundColor: "#f9f9f9",
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: student.activeToday ? "#2D9CDB" : "#eee",
          }}
          onPress={() =>
            console.log("Abrir perfil de aluno:", student.name)
          }
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            {student.name}
          </Text>
          <Text style={{ color: "#777" }}>{student.email}</Text>
          <Text style={{ marginTop: 4 }}>
            Progresso semanal: {student.weeklyProgress}%
          </Text>
        </TouchableOpacity>
      ))}

      {/* Botão flutuante */}
      <TouchableOpacity
        style={{
          backgroundColor: "#2D9CDB",
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: "center",
          marginTop: 16,
        }}
        onPress={() => console.log("Adicionar novo aluno")}
      >
        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
          + Adicionar aluno
        </Text>
      </TouchableOpacity>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f3f9ff",
        padding: 16,
        borderRadius: 12,
        marginHorizontal: 4,
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "700", color: "#2D9CDB" }}>
        {value}
      </Text>
      <Text style={{ color: "#555" }}>{label}</Text>
    </View>
  );
}
