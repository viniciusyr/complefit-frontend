import { Text, View } from "react-native";

export function SchedulePreview() {
  const schedule = [
    { id: "1", date: "22/10", student: "João Lima", type: "Treino de força" },
    { id: "2", date: "23/10", student: "Maria Costa", type: "Cardio leve" },
    { id: "3", date: "24/10", student: "Pedro Souza", type: "HIIT" },
  ];

  return (
    <View className="bg-gray-50 rounded-2xl p-4 shadow-sm">
      {schedule.map(item => (
        <View
          key={item.id}
          className="flex-row justify-between items-center border-b border-gray-200 py-2"
        >
          <View>
            <Text className="font-semibold text-gray-800">{item.student}</Text>
            <Text className="text-sm text-gray-500">{item.type}</Text>
          </View>
          <Text className="text-sm text-gray-600">{item.date}</Text>
        </View>
      ))}
    </View>
  );
}
