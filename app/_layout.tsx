import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#FF6B35',
      tabBarStyle: { backgroundColor: '#fff', paddingBottom: 6, height: 64 },
      tabBarLabelStyle: { fontSize: 12, fontWeight: "600" }
    }}>
      <Tabs.Screen name="index" options={{
        title: "Home",
        tabBarIcon: ({ color, size }) => <Ionicons name="home-sharp" color={color} size={size} />
      }} />
      <Tabs.Screen name="workouts" options={{
        title: "Workouts",
        tabBarIcon: ({ color, size }) => <MaterialIcons name="fitness-center" color={color} size={size} />
      }} />
      <Tabs.Screen name="profile" options={{
        title: "Profile",
        tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" color={color} size={size} />
      }} />
    </Tabs>
  );
}