import { handleApiError } from "@/services/apiErrorHandler";
import { login } from "@/services/authService";
import { saveTokens } from "@/utils/secureStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const data = await login(email, password);
            await saveTokens(data.accessToken, data.refreshToken);
            router.replace("/home");
        }  catch (err: any) {
            const message = handleApiError(err);
            Alert.alert("Erro", message);
        }  finally {
            setLoading(false);
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
                    keyboardType="email-address"
                    autoCapitalize="none"
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
                    disabled={loading}
                    className={`${
                        loading ? "bg-orange-400" : "bg-orange-500 active:bg-orange-600"
                    } py-4 rounded-2xl`}
                >
                    <Text className="text-center text-white text-lg font-semibold">
                        {loading ? "Entrando..." : "Entrar"}
                    </Text>
                </TouchableOpacity>

                {/* Link de Registro */}
                <TouchableOpacity onPress={() => router.push("./register")} className="mt-6">
                    <Text className="text-center text-neutral-400">
                        Não tem conta?{" "}
                        <Text className="text-orange-500 font-semibold">Registrar</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
