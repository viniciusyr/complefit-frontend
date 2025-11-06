import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function HomeIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the tabs home
    router.replace("/home/(tabs)/home");
  }, []);

  return null;
}
