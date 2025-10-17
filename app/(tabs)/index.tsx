import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions
} from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const logoSize = isDesktop ? 150 : isTablet ? 120 : 100;
  const illustrationSize = isDesktop ? 250 : isTablet ? 200 : 140;
  const textSize = isDesktop ? "text-6xl" : isTablet ? "text-5xl" : "text-4xl";

  return (
    <LinearGradient
      colors={["#000000", "#111111", "#1e1e1e"]}
      className="flex-1 justify-center items-center px-6"
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <Image
          source={require("../../assets/images/react-logo.png")}
          style={{
            width: logoSize,
            height: logoSize,
            marginBottom: 30,
          }}
          resizeMode="contain"
        />

        {/* Texto principal */}
        <Text
          className={`text-white font-extrabold text-center mb-3 ${textSize}`}
        >
          Transforme seu treino
        </Text>
        <Text
          className={`text-gray-300 ${
            isDesktop ? "text-xl" : isTablet ? "text-lg" : "text-base"
          } font-medium text-center mb-8`}
        >
          Treine com propósito. Acompanhe sua evolução. Alcance o seu melhor.
        </Text>

        {/* Ilustração */}
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/483/483356.png",
          }}
          style={{
            width: illustrationSize,
            height: illustrationSize,
            marginBottom: 40,
          }}
          resizeMode="contain"
        />

        {/* Botão principal */}
        <TouchableOpacity
          onPress={() => router.push("/login")}
          style={{
            width: isDesktop ? 400 : isTablet ? "70%" : "100%",
            backgroundColor: "white",
            borderRadius: 9999,
            paddingVertical: 16,
            marginBottom: 12,
          }}
        >
          <Text className="text-black text-center text-lg font-semibold">
            Começar
          </Text>
        </TouchableOpacity>

        {/* Botão secundário */}
        <TouchableOpacity
          style={{
            width: isDesktop ? 400 : isTablet ? "70%" : "100%",
            borderWidth: 1,
            borderColor: "#6b7280",
            borderRadius: 9999,
            paddingVertical: 16,
          }}
          onPress={() => alert("Em breve: cadastro!")}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Criar conta
          </Text>
        </TouchableOpacity>

        {/* Rodapé */}
        <Text className="text-gray-500 text-sm mt-12">
          CompleFit © {new Date().getFullYear()}
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}
