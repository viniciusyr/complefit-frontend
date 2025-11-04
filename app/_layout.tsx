import { getTokens } from "@/utils/secureStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, usePathname, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./globals.css";

export default function RootLayout() {
    const [initialized, setInitialized] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const didRedirectRef = useRef(false); 

    useEffect(() => {
        let mounted = true;

        async function checkAuthOnce() {
            try {
                const onboardingDone = await AsyncStorage.getItem("onboardingDone");
                const { accessToken } = await getTokens();

                if (!didRedirectRef.current && mounted) {
                    didRedirectRef.current = true;

                    if (!onboardingDone) {
                        if (pathname !== "/onboarding") router.replace("/onboarding");
                    } else if (!accessToken) {
                        if (pathname !== "/login") router.replace("/login");
                    } else {
                        if (pathname !== "/home" && pathname !== "/") router.replace("/home/home");
                    }
                }
            } catch (e) {
                console.warn("Error checking auth state", e);
            } finally {
                if (mounted) setInitialized(true);
            }
        }

        checkAuthOnce();
        return () => {
            mounted = false;
        };
    }, []);

    if (!initialized) {
        return (
            <SafeAreaProvider>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#ff5500" />
                </View>
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider>
            <Slot />
        </SafeAreaProvider>
    );
}
