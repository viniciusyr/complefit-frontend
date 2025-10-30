import { useState } from "react";
import {View, TextInput, Text, Alert, TouchableOpacity} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "@/services/authService";
import {SafeAreaView} from "react-native-safe-area-context";

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const data = await login(email, password);
            await AsyncStorage.setItem("accessToken", data.accessToken);
            await AsyncStorage.setItem("refreshToken", data.refreshToken);
            router.replace("/");
        } catch (err) {
            Alert.alert("Erro", "Login inválido");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className="flex-1 justify-center px-6">
                {/* Título */}
                <Text className="text-4xl font-bold text-white mb-8 text-center">
                    Bem-vindo de volta 👟
                </Text>

                {/* Inputs */}
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                    className="bg-neutral-900 text-white px-4 py-3 rounded-2xl mb-4 border border-neutral-800"
                />

                <TextInput
                    placeholder="Senha"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    className="bg-neutral-900 text-white px-4 py-3 rounded-2xl mb-6 border border-neutral-800"
                />

                {/* Botão de Login */}
                <TouchableOpacity
                    onPress={handleLogin}
                    className="bg-orange-500 py-4 rounded-2xl active:bg-orange-600"
                >
                    <Text className="text-center text-white text-lg font-semibold">
                        Entrar
                    </Text>
                </TouchableOpacity>

                {/* Link de Registro */}
                <TouchableOpacity
                    onPress={() => router.push("/register")}
                    className="mt-6"
                >
                    <Text className="text-center text-neutral-400">
                        Não tem conta?{" "}
                        <Text className="text-orange-500 font-semibold">Registrar</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}