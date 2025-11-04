import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const router = useRouter();
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await AsyncStorage.getItem("user");
                if (userData) {
                    const parsed = JSON.parse(userData);
                    setUserName(parsed.name);
                }
            } catch (err) {
                console.warn("Failed to load user info:", err);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
        router.replace("/login");
    };

    return (
        <SafeAreaView className="flex-1 bg-black">
            <LinearGradient
                colors={["#000", "#111", "#ff5500"]}
                className="flex-1 justify-between items-center px-6 py-12"
            >
                {/* Header */}
                <View className="w-full flex-row justify-between items-center">
                    <Text className="text-white text-2xl font-bold">
                        {userName ? `Olá, ${userName.split(" ")[0]} 👋` : "Bem-vindo 👋"}
                    </Text>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text className="text-orange-400 font-semibold">Sair</Text>
                    </TouchableOpacity>
                </View>

                {/* Conteúdo principal */}
                <View className="items-center">
                    <Image
                        source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/1041/1041883.png",
                        }}
                        className="w-28 h-28 mt-10"
                        resizeMode="contain"
                    />
                    <Text className="text-white text-4xl font-bold text-center mb-3">
                        CompleFit
                    </Text>
                    <Text className="text-gray-300 text-center text-lg px-4">
                        Acompanhe seus treinos e alcance seus objetivos com performance.
                    </Text>
                </View>

                {/* Botão temporário (exemplo) */}
                <View className="w-full gap-4">
                    <TouchableOpacity
                        onPress={() => router.push("/profile" as any)}
                        className="bg-orange-500 py-4 rounded-2xl"
                    >
                        <Text className="text-center text-white font-semibold text-lg">
                            Ver Perfil
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}
