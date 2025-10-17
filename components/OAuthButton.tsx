import { Image, Text, TouchableOpacity } from "react-native";

export default function OAuthButton({ provider }: { provider: "google" }) {
  const handlePress = async () => {
    // TODO: chamar backend OAuth2 endpoint (ex: /oauth2/authorization/google)
    console.log(`Login com ${provider}`);
  };

  const icon =
    provider === "google"
      ? require("@/assets/images/google.png")
      : require("@/assets/images/apple.png");

  return (
    <TouchableOpacity
      className="flex-row items-center justify-center w-full border border-gray-300 dark:border-gray-700 rounded-xl py-3 bg-white dark:bg-gray-900"
      onPress={handlePress}
    >
      <Image source={icon} className="w-6 h-6 mr-3" />
      <Text className="text-gray-700 dark:text-white font-medium text-base">
        Entrar com Google
      </Text>
    </TouchableOpacity>
  );
}
