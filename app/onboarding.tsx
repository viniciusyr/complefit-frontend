import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Onboarding() {
    const router = useRouter();

    const handleContinue = async () => {
        await AsyncStorage.setItem("onboardingDone", "true");
        router.replace("/login");
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Bem-vindo ao CompleFit!</Text>
            <Text>Descubra o melhor do fitness personalizado.</Text>
            <Button title="Começar" onPress={handleContinue} />
        </View>
    );
}
