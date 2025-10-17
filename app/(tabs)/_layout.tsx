import ProtectedRoute from "@/components/ProtectedRoute";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <ProtectedRoute>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="explore" />
      </Tabs>
    </ProtectedRoute>
  );
}
