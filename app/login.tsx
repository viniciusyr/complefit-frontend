import { Text, TouchableOpacity, View } from "react-native";

export default function Login() {
  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <Text className="text-3xl font-bold text-white mb-6">CompleFit</Text>
      <TouchableOpacity className="bg-accent px-6 py-3 rounded-full">
        <Text className="text-white text-lg font-semibold">Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
