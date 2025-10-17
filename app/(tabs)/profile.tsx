import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const router = useRouter();

  function signOut() {
    router.replace("/(auth)/login");
  }

  return (
    <View className="flex-1 bg-soft p-6">
      <View className="items-center mb-6">
        <Image source={{ uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=..." }} style={{ width: 96, height: 96, borderRadius: 24 }} />
        <Text className="text-xl font-heading text-slate mt-3">Vinicius Rodrigues</Text>
        <Text className="text-sm text-slate/70">Level • Intermediate</Text>
      </View>

      <View className="bg-white rounded-2xl p-4 shadow mb-4">
        <Text className="text-slate/70 text-sm">Weight</Text>
        <Text className="text-lg font-semibold mt-1">78 kg</Text>
      </View>

      <View className="bg-white rounded-2xl p-4 shadow mb-6">
        <Text className="text-slate/70 text-sm">Height</Text>
        <Text className="text-lg font-semibold mt-1">1.78 m</Text>
      </View>

      <TouchableOpacity onPress={signOut} className="bg-accent rounded-2xl py-3 items-center">
        <Text className="text-white font-semibold">Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}