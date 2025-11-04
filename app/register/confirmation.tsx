import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useRegister } from "@/contexts/RegisterContext";
import { api } from "@/services/api";
import { saveTokens } from "@/utils/secureStore";

export default function RegisterConfirmation() {
    const router = useRouter();
    const { data, reset } = useRegister();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Proteção: se não tiver as partes mínimas, volta para o início do fluxo
        if (!data?.basic || !data?.details) {
            Alert.alert("Erro", "Complete as etapas anteriores do cadastro.");
            router.replace("/register");
        }
    }, [data]);

    const handleRegister = async () => {
        if (!data?.basic || !data?.details) {
            Alert.alert("Erro", "Dados incompletos. Retorne e complete o cadastro.");
            return;
        }

        setLoading(true);

        try {

            // Usuário já foi criado nas etapas anteriores via contexto (basic + details)
            // Aqui só cria o perfil de TREINER, se for o caso. O perfil STUDENT já foi criado na tela anterior.
            const role = data.details.role;
            if (role === "TRAINER") {
                await api.post("/trainers", {
                    user: data.userId,
                    cref: data.trainer?.cref,
                    speciality: data.trainer?.speciality,
                    yearsOfExperience: data.trainer?.yearsOfExperience,
                    bio: data.trainer?.bio,
                });
            }

            const loginRes = await api.post("/auth/login", {
                email: data.basic.email,
                password: data.basic.password,
            });

            const { accessToken, refreshToken } = loginRes.data;
            await saveTokens(accessToken, refreshToken);

            reset();
            router.replace("/");
        } catch (error: any) {
            console.error("Erro ao registrar:", error.response?.data || error.message);
            Alert.alert("Erro", "Erro ao registrar. Verifique os dados e tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView className="flex-1 bg-white px-6 py-10">
            <Text className="text-2xl font-bold text-gray-800 mb-6">
                Confirme suas informações
            </Text>

            <View className="bg-gray-50 rounded-2xl p-5 border border-gray-200 mb-6">
                <Text className="text-lg font-semibold mb-3 text-gray-700">Dados do Usuário</Text>
                <Text>Nome: {data?.basic?.firstName ?? "—"} {data?.basic?.lastName ?? ""}</Text>
                <Text>Email: {data?.basic?.email ?? "—"}</Text>
                <Text>CPF: {data?.details?.cpf ?? "—"}</Text>
                <Text>Telefone: {data?.details?.phoneNumber ?? "—"}</Text>
                <Text>Altura: {data?.details?.height ?? "—"} cm</Text>
                <Text>Peso: {data?.details?.weight ?? "—"} kg</Text>
                <Text>Função: {data?.details?.role === "STUDENT" ? "Aluno" : data?.details?.role === "TRAINER" ? "Treinador" : "—"}</Text>
            </View>

            {data?.details?.role === "STUDENT" && (
                <View className="bg-gray-50 rounded-2xl p-5 border border-gray-200 mb-6">
                    <Text className="text-lg font-semibold mb-3 text-gray-700">Perfil do Aluno</Text>
                    <Text>Objetivo: {data?.student?.goal ?? "—"}</Text>
                    <Text>Nível: {data?.student?.level ?? "—"}</Text>
                    <Text>Restrições Médicas: {data?.student?.medicalRestrictions ?? "Nenhuma"}</Text>
                </View>
            )}

            {data?.details?.role === "TRAINER" && (
                <View className="bg-gray-50 rounded-2xl p-5 border border-gray-200 mb-6">
                    <Text className="text-lg font-semibold mb-3 text-gray-700">Perfil do Treinador</Text>
                    <Text>CREF: {data?.trainer?.cref ?? "—"}</Text>
                    <Text>Especialidade: {data?.trainer?.speciality ?? "—"}</Text>
                    <Text>Anos de Experiência: {data?.trainer?.yearsOfExperience ?? "—"}</Text>
                    <Text>Bio: {data?.trainer?.bio ?? "—"}</Text>
                </View>
            )}

            <TouchableOpacity
                onPress={handleRegister}
                disabled={loading}
                className={`rounded-xl py-4 ${loading ? "bg-gray-400" : "bg-orange-500"}`}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white text-center font-semibold text-lg">
                        Confirmar Cadastro
                    </Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()} className="mt-4">
                <Text className="text-gray-500 text-center">Voltar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
