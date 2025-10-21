import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import PremiumDashboard from "./dashboard/premium";
import TrainerDashboard from "./dashboard/trainer";
import UserDashboard from "./dashboard/user";

export default function HomeScreen() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await api.get("/api/users/me");
      setRole(res.data.role);
    }
    fetchUser();
  }, []);

  if (!role) return <ActivityIndicator />;

  switch (role) {
    case "TRAINER":
      return <TrainerDashboard />;
    case "PREMIUM":
      return <PremiumDashboard />;
    default:
      return <UserDashboard />;
  }
}
