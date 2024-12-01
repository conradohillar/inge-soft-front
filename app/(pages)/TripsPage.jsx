import { SizableText, YStack, XStack } from "tamagui";
import HorizontalTabs from "../../components/HorizontalTabs";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function TripsPage() {
  const { category } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-background">
      {/* Header con gradiente */}
      <LinearGradient
        colors={["#59A58A", "#7AB5A0"]}
        style={{
          width: "100%",
          paddingTop: 50,
          paddingBottom: 80,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}
      >
        <View className="px-6">
          <SizableText className="text-4xl font-qbold text-white">
            Tus viajes
          </SizableText>
          <SizableText className="text-4xl font-qbold text-white/90">
            como {category === "rider" ? "pasajero" : "conductor"}
          </SizableText>
        </View>
      </LinearGradient>

      {/* Contenido de los tabs */}
      <View className="-mt-12 flex-1">
        <HorizontalTabs category={category} />
      </View>
    </View>
  );
}
