// app/(tabs)/index.tsx
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  return (
    <ScrollView className="flex-1 bg-soft p-6">
      <View className="flex-row items-center justify-between mb-6">
        <View>
          <Text className="text-lg text-slate/70">Good morning,</Text>
          <Text className="text-2xl font-heading text-slate">Vinicius 👋</Text>
        </View>
        <TouchableOpacity className="bg-white p-2 rounded-xl shadow">
          <Image source={{ uri: "https://images.unsplash.com/photo-1558611848-73f7eb4001d5?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=..." }} style={{ width: 48, height: 48, borderRadius: 12 }} />
        </TouchableOpacity>
      </View>

      <View className="mb-6">
        <Text className="text-base text-slate/70 mb-3">Today's focus</Text>
        <View className="bg-accentDark/90 rounded-2xl p-4">
          <Text className="text-white font-semibold text-lg">Full Body Strength</Text>
          <Text className="text-white/90 mt-1">30 min • Moderate • No equipment</Text>
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-heading text-slate mb-3">Quick actions</Text>
        <View className="flex-row justify-between">
          <TouchableOpacity className="bg-white rounded-2xl p-4 flex-1 mr-3 items-center shadow">
            <Text className="text-accent font-semibold">Start workout</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white rounded-2xl p-4 flex-1 ml-3 items-center shadow">
            <Text className="text-slate font-semibold">Log weight</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text className="text-lg font-heading text-slate mb-3">Recommended for you</Text>
        <View className="space-y-3">
          <TouchableOpacity className="bg-white rounded-2xl p-4 shadow">
            <Text className="font-semibold text-slate">Leg Day Challenge</Text>
            <Text className="text-slate/70 mt-1">45 min • Strength</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white rounded-2xl p-4 shadow">
            <Text className="font-semibold text-slate">Core Stability</Text>
            <Text className="text-slate/70 mt-1">20 min • Mobility</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
}
