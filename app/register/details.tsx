import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useRegister } from "@/contexts/RegisterContext";

export default function RegisterDetails() {
    const router = useRouter();
    const { data, setDetails } = useRegister();

    const [form, setForm] = useState({
        phoneNumber: "",
        birthDate: "",
        cpf: "",
        gender: "",
        height: "",
        weight: "",
        role: "",
    });
    const [loading, setLoading] = useState(false);

    // Se o usuário pular a etapa inicial, redireciona
    useEffect(() => {
        if (!data?.userId) {
            Alert.alert("Erro", "Por favor, complete a primeira etapa antes de continuar.");
            router.replace("/register");
        }
    }, []);

    const handleChange = (key: string, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        const { phoneNumber, birthDate, cpf, gender, height, weight, role } = form;
        if (!phoneNumber || !birthDate || !cpf || !gender || !height || !weight || !role) {
            Alert.alert("Campos obrigatórios", "Preencha todos os campos.");
            return;
        }

        setLoading(true);
        try {
            await setDetails({
                phoneNumber,
                birthDate,
                cpf,
                gender: gender as "MALE" | "FEMALE" | "OTHER",
                height: parseFloat(height),
                weight: parseFloat(weight),
                role: role as "STUDENT" | "TRAINER",
            });

            router.replace(
                role === "STUDENT" ? "/register/student" : "/register/trainer"
            );
        } catch (error) {
            console.error("Register details error:", error);
            Alert.alert("Erro", "Falha ao enviar os dados. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center bg-white px-6">
            <Text className="text-3xl font-bold mb-6 text-gray-900">Complete seu perfil</Text>

            <TextInput
                placeholder="Telefone"
                value={form.phoneNumber}
                onChangeText={(t) => handleChange("phoneNumber", t)}
                className="border border-gray-300 rounded-xl p-3 mb-4"
                keyboardType="phone-pad"
                placeholderTextColor="#9ca3af"
            />
            <TextInput
                placeholder="Data de nascimento (YYYY-MM-DD)"
                value={form.birthDate}
                onChangeText={(t) => handleChange("birthDate", t)}
                className="border border-gray-300 rounded-xl p-3 mb-4"
                placeholderTextColor="#9ca3af"
            />
            <TextInput
                placeholder="CPF"
                value={form.cpf}
                onChangeText={(t) => handleChange("cpf", t)}
                className="border border-gray-300 rounded-xl p-3 mb-4"
                keyboardType="numeric"
                placeholderTextColor="#9ca3af"
            />
            <TextInput
                placeholder="Gênero (MALE / FEMALE)"
                value={form.gender}
                onChangeText={(t) => handleChange("gender", t.toUpperCase())}
                className="border border-gray-300 rounded-xl p-3 mb-4"
                autoCapitalize="characters"
                placeholderTextColor="#9ca3af"
            />
            <TextInput
                placeholder="Altura (cm)"
                value={form.height}
                onChangeText={(t) => handleChange("height", t)}
                className="border border-gray-300 rounded-xl p-3 mb-4"
                keyboardType="numeric"
                placeholderTextColor="#9ca3af"
            />
            <TextInput
                placeholder="Peso (kg)"
                value={form.weight}
                onChangeText={(t) => handleChange("weight", t)}
                className="border border-gray-300 rounded-xl p-3 mb-4"
                keyboardType="numeric"
                placeholderTextColor="#9ca3af"
            />

            {/* 🔸 Seleção de papel */}
            <View className="flex-row justify-between mt-2 mb-6">
                <TouchableOpacity
                    className={`flex-1 mr-2 py-3 rounded-xl border ${
                        form.role === "STUDENT"
                            ? "bg-orange-500 border-orange-500"
                            : "border-gray-400"
                    }`}
                    onPress={() => handleChange("role", "STUDENT")}
                >
                    <Text
                        className={`text-center font-semibold ${
                            form.role === "STUDENT" ? "text-white" : "text-gray-700"
                        }`}
                    >
                        Sou Aluno
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`flex-1 ml-2 py-3 rounded-xl border ${
                        form.role === "TRAINER"
                            ? "bg-orange-500 border-orange-500"
                            : "border-gray-400"
                    }`}
                    onPress={() => handleChange("role", "TRAINER")}
                >
                    <Text
                        className={`text-center font-semibold ${
                            form.role === "TRAINER" ? "text-white" : "text-gray-700"
                        }`}
                    >
                        Sou Treinador
                    </Text>
                </TouchableOpacity>
            </View>

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
                    <Text className="text-white font-bold text-lg">Continuar</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}
