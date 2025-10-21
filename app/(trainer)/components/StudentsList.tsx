import { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

export function StudentsList() {
  const [search, setSearch] = useState("");

  const students = [
    { id: "1", name: "João Lima", status: "Ativo" },
    { id: "2", name: "Maria Costa", status: "Em pausa" },
    { id: "3", name: "Pedro Souza", status: "Ativo" },
  ];

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="bg-gray-50 rounded-2xl p-4 shadow-sm">
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar aluno..."
        className="border border-gray-300 rounded-xl px-3 py-2 mb-3"
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center mb-2 border-b border-gray-200 pb-2">
            <Text className="text-gray-800">{item.name}</Text>
            <Text
              className={`text-sm ${
                item.status === "Ativo" ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {item.status}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
