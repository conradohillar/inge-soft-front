import { SizableText, XStack, YStack } from "tamagui";
import HorizontalTabs from "../../components/HorizontalTabs";
import { useLocalSearchParams } from "expo-router";
import { View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

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
        <XStack className="px-6">
          {/* Botón flotante para volver */}
          <Pressable
            onPress={() => router.back()}
            className="bg-white/20 rounded-full p-2 mr-6 h-12 w-12 items-center justify-center"
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            })}
          >
            <MaterialIcons name="arrow-back" size={28} color="white" />
          </Pressable>
          <YStack>
            <SizableText className="text-3xl font-qbold text-white">
              Tus viajes
            </SizableText>
            <SizableText className="text-3xl font-qbold text-white/90">
              como {category === "rider" ? "pasajero" : "conductor"}
            </SizableText>
          </YStack>
        </XStack>
      </LinearGradient>

      {/* Contenido de los tabs */}
      <View className="-mt-12 flex-1">
        <HorizontalTabs category={category} />
      </View>
    </View>
  );
}
