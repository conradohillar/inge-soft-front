import { SizableText, YStack, XStack } from "tamagui";
import HorizontalTabs from "../../components/HorizontalTabs";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "react-native";
import icons from "../../constants/icons";

export default function TripsPage() {
  const { category } = useLocalSearchParams();
  const router = useRouter();

  return (
    <YStack className="h-full justify-evenly bg-background">
      <YStack className="py-5 pl-5">
        <YStack>
          <Image
            source={icons.arrowleft}
            className="h-7 w-7 mb-3"
            onTouchEnd={router.back}
          />
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
