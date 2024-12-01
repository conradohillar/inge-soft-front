import { SizableText, YStack, XStack, Spacer } from "tamagui";
import HorizontalTabs from "../../components/HorizontalTabs";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function TripsPage() {
  const { category } = useLocalSearchParams();
  const router = useRouter();

  return (
    <YStack className="h-full justify-evenly bg-background">
      <YStack className="py-5 items-center">
        <YStack className="w-full items-center">
          <View className="pl-5 self-start">
            <TouchableOpacity
              onPress={router.back}
              className="p-1 rounded-xl border border-gray-300"
            >
              <MaterialIcons name="chevron-left" size={28} color="black" />
            </TouchableOpacity>
          </View>
          <Spacer />
          <XStack className="space-x-2 items-center">
            <SizableText className="text-2xl text-black font-qbold pr-2">
              Tus viajes
            </SizableText>
            <SizableText className="text-2xl text-primary font-qbold">
              como {category === "rider" ? "pasajero" : "conductor"}
            </SizableText>
          </XStack>
        </YStack>
      </YStack>
      <HorizontalTabs category={category} />
    </YStack>
  );
}
