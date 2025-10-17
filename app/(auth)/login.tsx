// app/(auth)/login.tsx
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function onLogin() {
    router.replace("/(tabs)");
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <View className="flex-1">
        <ImageBackground
          source={{ uri: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1500&auto=format&fit=crop" }}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          <View className="absolute inset-0 bg-black/50" />

          <View className="flex-1 justify-end p-6">
            <View className="mb-8">
              <Text className="text-soft text-xs tracking-widest">WELCOME BACK</Text>
              <Text className="text-4xl font-heading text-white mt-1">CompleFit</Text>
              <Text className="text-white/80 mt-1">Train smarter. Feel better.</Text>
            </View>

            <View className="bg-white/95 rounded-3xl p-5">
              <View className="mb-4">
                <Text className="text-xs text-slate/70 mb-2">Email</Text>
                <View className="flex-row items-center bg-white rounded-2xl px-3 py-2 border border-soft">
                  <Ionicons name="mail" size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="you@mail.com"
                    keyboardType="email-address"
                    className="flex-1 text-slate"
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View className="mb-2">
                <Text className="text-xs text-slate/70 mb-2">Password</Text>
                <View className="flex-row items-center bg-white rounded-2xl px-3 py-2 border border-soft">
                  <Ionicons name="lock-closed" size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Your password"
                    secureTextEntry={!isPasswordVisible}
                    className="flex-1 text-slate"
                    placeholderTextColor="#9CA3AF"
                  />
                  <TouchableOpacity onPress={() => setIsPasswordVisible(v => !v)} hitSlop={8}>
                    <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={18} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity className="items-end mb-4">
                <Text className="text-xs text-accent">Forgot password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onLogin}
                activeOpacity={0.9}
                className="bg-accent rounded-2xl py-3 items-center justify-center shadow-lg"
              >
                <Text className="text-white font-semibold text-base">Log In</Text>
              </TouchableOpacity>

              <View className="flex-row items-center my-4">
                <View className="h-px flex-1 bg-slate/10" />
                <Text className="mx-3 text-slate/50 text-xs">or continue with</Text>
                <View className="h-px flex-1 bg-slate/10" />
              </View>

              <View className="flex-row gap-3">
                <TouchableOpacity className="flex-1 bg-white rounded-2xl py-2.5 items-center border border-slate/10">
                  <Text className="text-slate font-semibold">Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-white rounded-2xl py-2.5 items-center border border-slate/10">
                  <Text className="text-slate font-semibold">Google</Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-center mt-5">
                <Text className="text-sm text-slate/70 mr-2">Don't have an account?</Text>
                <Link href="/(auth)/register" className="text-accent font-semibold text-sm">Sign up</Link>
              </View>
            </View>

            <View className="pt-5 pb-2">
              <Text className="text-xs text-white/60 text-center">By logging in you agree to our Terms & Privacy</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
}
