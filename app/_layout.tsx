import { useEffect, useState } from "react";
import {Slot, useRouter, useSegments} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
    const router = useRouter();
    const segments = useSegments();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function checkStatus() {
            const onboardingDone = await AsyncStorage.getItem("onboardingDone");
            const token = await AsyncStorage.getItem("accessToken");
            const currentSegment = segments[0];


            if (!onboardingDone && currentSegment !== "onboarding") {
                router.replace("/onboarding");
            } else if (onboardingDone && !token && currentSegment !== "login") {
                router.replace("/login");
            } else if (token && currentSegment === "login") {
                router.replace("/");
            }

            setIsReady(true);
        }

        checkStatus();
    }, [segments]);

    if (!isReady) return null;

    return <Slot />;
}
