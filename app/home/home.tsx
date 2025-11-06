import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function LegacyHomeRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/home/(tabs)/home");
  }, []);
  return null;
}
