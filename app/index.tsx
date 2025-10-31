import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await AsyncStorage.getItem("accessToken");
                const onboardingDone = await AsyncStorage.getItem("onboardingDone");

                if (!onboardingDone) {
                    router.replace("/onboarding");
                } else if (token) {
                    router.replace("/home/home");
                } else {
                    router.replace("/login");
                }
            } catch {
                router.replace("/onboarding");
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <View className="flex-1 justify-center items-center bg-black">
            <ActivityIndicator size="large" color="#ff5500" />
        </View>
    );
}
