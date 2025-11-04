import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useRegister } from "@/contexts/RegisterContext";

export default function TrainerRegister() {
    const router = useRouter();
    const { data, setTrainer } = useRegister();

    const [cref, setCref] = useState(data.trainer?.cref || "");
    const [speciality, setSpeciality] = useState(data.trainer?.speciality || "");
    const [experience, setExperience] = useState(
        data.trainer?.yearsOfExperience?.toString() || ""
    );
    const [bio, setBio] = useState(data.trainer?.bio || "");

    useEffect(() => {
        if (!data?.userId || data.details?.role !== "TRAINER") {
            Alert.alert("Erro", "Acesso inválido. Complete o cadastro inicial primeiro.");
            router.replace("/register");
        }
    }, [data]);

    const handleNext = () => {
        if (!cref || !speciality || !experience) {
            Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const years = parseInt(experience, 10);
        if (isNaN(years) || years < 0) {
            Alert.alert("Erro", "Anos de experiência deve ser um número válido.");
            return;
        }

        setTrainer({
            cref,
            speciality,
            yearsOfExperience: years,
            bio: bio || undefined,
        });

        router.push("/register/confirmation");
    };

    return (
        <ScrollView className="flex-1 bg-white px-6 py-10">
            <Text className="text-2xl font-bold mb-6 text-gray-800">Informações do Treinador</Text>

            <Text className="text-gray-700 mb-2">CREF *</Text>
            <TextInput
                className="border border-gray-300 rounded-xl p-3 mb-4 text-gray-800"
                placeholder="Ex: CREF 123456-G/SP"
                value={cref}
                onChangeText={setCref}
                placeholderTextColor="#9ca3af"
            />

            <Text className="text-gray-700 mb-2">Especialidade *</Text>
            <TextInput
                className="border border-gray-300 rounded-xl p-3 mb-4 text-gray-800"
                placeholder="Ex: Musculação, Crossfit..."
                value={speciality}
                onChangeText={setSpeciality}
                placeholderTextColor="#9ca3af"
            />

            <Text className="text-gray-700 mb-2">Anos de Experiência *</Text>
            <TextInput
                className="border border-gray-300 rounded-xl p-3 mb-4 text-gray-800"
                placeholder="Ex: 5"
                keyboardType="numeric"
                value={experience}
                onChangeText={setExperience}
                placeholderTextColor="#9ca3af"
            />

            <Text className="text-gray-700 mb-2">Bio (opcional)</Text>
            <TextInput
                className="border border-gray-300 rounded-xl p-3 mb-6 text-gray-800"
                placeholder="Conte um pouco sobre você..."
                multiline
                numberOfLines={4}
                value={bio}
                onChangeText={setBio}
                placeholderTextColor="#9ca3af"
            />

            <TouchableOpacity
                onPress={handleNext}
                className="bg-orange-500 rounded-xl py-4"
            >
                <Text className="text-white text-center font-semibold text-lg">
                    Próximo
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()} className="mt-4">
                <Text className="text-gray-500 text-center">Voltar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
