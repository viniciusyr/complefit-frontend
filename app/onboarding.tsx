import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, Href } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";

export default function Onboarding() {
    const router = useRouter();

    const handleNavigate = useCallback(async (path: Href) => {
        // Marca onboarding como concluído
        await AsyncStorage.setItem("onboardingDone", "true");
        router.replace(path);
    }, [router]);

    return (
        <SafeAreaView className="flex-1 bg-black">
            <StatusBar style="light" />
            <LinearGradient
                colors={["#000", "#111", "#ff5500"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-1 justify-between items-center px-6 py-12"
            >
                {/* Logo */}
                <Image
                    source={{ uri: "https://cdn-icons-png.flaticon.com/512/1041/1041883.png" }}
                    className="w-28 h-28 mt-10"
                    resizeMode="contain"
                />

                {/* Texto principal */}
                <View className="items-center">
                    <Text className="text-white text-4xl font-extrabold text-center mb-3 tracking-tight">
                        Move. Track. Improve.
                    </Text>
                    <Text className="text-gray-300 text-center text-lg px-4">
                        Acompanhe seus treinos e alcance seus objetivos com performance.
                    </Text>
                </View>

                {/* Botões */}
                <View className="w-full gap-4">
                    <TouchableOpacity
                        onPress={() => handleNavigate("/login")}
                        activeOpacity={0.8}
                        className="bg-orange-500 py-4 rounded-2xl shadow-md shadow-orange-800"
                    >
                        <Text className="text-center text-white font-semibold text-lg">
                            Entrar
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleNavigate("/register")}
                        activeOpacity={0.8}
                        className="border border-orange-400 py-4 rounded-2xl"
                    >
                        <Text className="text-center text-orange-400 font-semibold text-lg">
                            Criar Conta
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}
