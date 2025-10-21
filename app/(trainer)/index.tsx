import { ScrollView, Text, View } from "react-native";
import { SchedulePreview } from "./components/SchedulePreview";
import { StatsOverview } from "./components/StatsOverview";
import { StudentsList } from "./components/StudentsList";

export default function TrainerHome() {
  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      {/* Título principal */}
      <Text className="text-2xl font-bold mb-4">Bem-vindo, Trainer 👋</Text>

      {/* Seção: Estatísticas Gerais */}
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-2">Estatísticas Gerais</Text>
        <StatsOverview />
      </View>

      {/* Seção: Meus Alunos */}
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-2">Meus Alunos</Text>
        <StudentsList />
      </View>

      {/* Seção: Agenda */}
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-2">Agenda</Text>
        <SchedulePreview />
      </View>
    </ScrollView>
  );
}
