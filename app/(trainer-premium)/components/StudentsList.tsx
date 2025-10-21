import { Text, View } from "react-native";

type Status = "Ativo" | "Premium" | "Inativo";

type Student = {
  name: string;
  status: Status;
};

const students: Student[] = [
  { name: "Lucas Andrade", status: "Ativo" },
  { name: "Marina Costa", status: "Premium" },
  { name: "João Lima", status: "Inativo" },
  { name: "Camila Rocha", status: "Ativo" },
];

export function StudentsList() {
  const statusColor: Record<Status, string> = {
    Ativo: "text-green-600",
    Premium: "text-yellow-600",
    Inativo: "text-gray-400",
  };

  return (
    <View className="bg-gray-50 rounded-2xl p-4 mb-6 shadow-sm">
      <Text className="text-lg font-semibold text-gray-800 mb-3">Seus Alunos</Text>

      {students.map((s, i) => (
        <View
          key={i}
          className="flex-row justify-between border-b border-gray-100 py-2"
        >
          <Text className="text-gray-700">{s.name}</Text>
          <Text className={`${statusColor[s.status]} font-medium`}>
            {s.status}
          </Text>
        </View>
      ))}
    </View>
  );
}
