// app/(auth)/register.tsx
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onRegister() {
    router.replace("/(tabs)");
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-soft p-6">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-heading text-slate mb-1">Create account</Text>
        <Text className="text-sm text-slate/70 mb-6">Start your personalized training journey.</Text>

        <View className="mb-3">
          <Text className="text-xs text-slate/70 mb-2">Full name</Text>
          <TextInput value={name} onChangeText={setName} placeholder="John Doe" className="bg-white px-4 py-3 rounded-2xl" placeholderTextColor="#9CA3AF" />
        </View>

        <View className="mb-3">
          <Text className="text-xs text-slate/70 mb-2">Email</Text>
          <TextInput value={email} onChangeText={setEmail} placeholder="you@mail.com" keyboardType="email-address" className="bg-white px-4 py-3 rounded-2xl" placeholderTextColor="#9CA3AF" autoCapitalize="none" />
        </View>

        <View className="mb-6">
          <Text className="text-xs text-slate/70 mb-2">Password</Text>
          <TextInput value={password} onChangeText={setPassword} placeholder="Create a password" secureTextEntry className="bg-white px-4 py-3 rounded-2xl" placeholderTextColor="#9CA3AF" />
        </View>

        <TouchableOpacity onPress={onRegister} className="bg-accent rounded-2xl py-3 items-center mb-4 shadow-lg">
          <Text className="text-white font-semibold">Create account</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-sm text-slate/70 mr-2">Already have an account?</Text>
          <Link href="/(auth)/login" className="text-accent font-semibold text-sm">Sign in</Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
