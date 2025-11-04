import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useRegister } from "@/contexts/RegisterContext";
import { api } from "@/services/api";

export default function RegisterStudent() {
    const router = useRouter();
    const { data, setStudent } = useRegister();

    const [form, setForm] = useState({
        goal: "",
        level: "",
        medicalRestrictions: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!data?.userId || data.details?.role !== "STUDENT") {
            Alert.alert("Erro", "Acesso inválido. Complete o cadastro inicial primeiro.");
            router.replace("/register");
        }
    }, [data]);

    const handleChange = (key: string, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const handleSubmit = async () => {
        const { goal, level, medicalRestrictions } = form;

        if (!goal || !level) {
            Alert.alert("Campos obrigatórios", "Informe seu objetivo e nível de treino.");
            return;
        }

        setLoading(true);
        try {
            await api.post("/students", {
                user: data.userId,
                goal,
                level,
                medicalRestrictions,
            });

            // Atualiza o contexto
            setStudent({
                goal,
                level,
                medicalRestrictions: medicalRestrictions || undefined,
            });

            Alert.alert("Sucesso!", "Cadastro concluído com sucesso!");
            router.replace("/");
        } catch (error) {
            console.error("Register student error:", error);
            Alert.alert("Erro", "Falha ao enviar os dados. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-white px-6 justify-center">
            <Text className="text-3xl font-bold mb-6 text-gray-900">Perfil de Aluno</Text>

            <TextInput
                placeholder="Objetivo (Ex: Ganhar massa, Emagrecer, etc)"
                value={form.goal}
                onChangeText={(t) => handleChange("goal", t)}
                className="border border-gray-300 rounded-xl p-3 mb-4"
                placeholderTextColor="#9ca3af"
            />

            <TextInput
                placeholder="Nível (Iniciante, Intermediário, Avançado)"
                value={form.level}
                onChangeText={(t) => handleChange("level", t)}
                className="border border-gray-300 rounded-xl p-3 mb-4"
                placeholderTextColor="#9ca3af"
            />

            <TextInput
                placeholder="Restrições Médicas (opcional)"
                value={form.medicalRestrictions}
                onChangeText={(t) => handleChange("medicalRestrictions", t)}
                className="border border-gray-300 rounded-xl p-3 mb-6"
                placeholderTextColor="#9ca3af"
            />

            <TouchableOpacity
                onPress={handleSubmit}
                disabled={loading}
                className={`rounded-xl p-4 items-center ${
                    loading ? "bg-orange-400" : "bg-orange-500"
                }`}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white font-bold text-lg">Finalizar Cadastro</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}
