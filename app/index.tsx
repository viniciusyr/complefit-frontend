import {View, Text, TouchableOpacity, Image} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";

export default function HomeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1">
            <LinearGradient
                colors={["#000", "#111", "#ff5500"]}
                className="flex-1 justify-between items-center px-6 py-12"
            >
                <Image
                    source={{ uri: "https://cdn-icons-png.flaticon.com/512/1041/1041883.png" }}
                    className="w-28 h-28 mt-10"
                />
                <View className="items-center">
                    <Text className="text-white text-4xl font-bold text-center mb-3">
                        Move. Track. Improve.
                    </Text>
                    <Text className="text-gray-300 text-center text-lg px-4">
                        Acompanhe seus treinos e alcance seus objetivos.
                    </Text>
                </View>
                <View className="w-full gap-4">
                    <TouchableOpacity
                        onPress={() => router.replace("/login")}
                        className="bg-orange-500 py-4 rounded-2xl"
                    >
                        <Text className="text-center text-white font-semibold text-lg">Entrar</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}
