import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, usePathname, Slot } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import "./globals.css";

export default function RootLayout() {
    const [initialized, setInitialized] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const didRedirectRef = useRef(false); // evita múltiplos redirects

    useEffect(() => {
        let mounted = true;

        async function checkAuthOnce() {
            try {
                const onboardingDone = await AsyncStorage.getItem("onboardingDone");
                const token = await AsyncStorage.getItem("accessToken");

                // só executa o redirect uma única vez
                if (!didRedirectRef.current && mounted) {
                    didRedirectRef.current = true;

                    if (!onboardingDone) {
                        if (pathname !== "/onboarding") router.replace("/onboarding");
                    } else if (!token) {
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
    }, []); // roda apenas uma vez no mount

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
