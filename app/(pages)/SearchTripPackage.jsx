import { Button, View, XStack, YStack } from "tamagui";
import { Package } from "@tamagui/lucide-icons";
import Counter from "../../components/Counter";
import { Text, Image } from "react-native";
import { Link } from "expo-router";
import icons from "../../constants/icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import ButtonNext from "../../components/ButtonNext";
import { useState } from "react";
import Window from "../../components/Window";

export default function SendPackagePage() {
  const { fromLocation, toLocation, formattedDate } = useLocalSearchParams();

  const [formData, setFormData] = useState({
    people: 0,
    smallPacks: 0,
    mediumPacks: 0,
    largePacks: 0,
  });
  const setSmallPacks = (count) => {
    setFormData((prev) => ({ ...prev, smallPacks: count }));
  };

  const setMediumPacks = (count) => {
    setFormData((prev) => ({ ...prev, mediumPacks: count }));
  };

  const setLargePacks = (count) => {
    setFormData((prev) => ({ ...prev, largePacks: count }));
  };

  const router = useRouter();

  const handleSearch = async () => {
    try {
      router.push({
        pathname: "/(pages)/SearchResultsPage",
        params: {
          fromLocation,
          toLocation,
          formattedDate,
          people: formData.people,
          smallPacks: formData.smallPacks,
          mediumPacks: formData.mediumPacks,
          largePacks: formData.largePacks,
        },
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <View className="bg-background w-full h-full">
      <YStack className="items-center justify-evenly h-full w-full">
        <XStack className="items-center mt-10 mb-4 justify-center w-full">
          <Text className="text-3xl font-qsemibold text-primary">
            Detalles
            <Text className="text-3xl font-qsemibold text-black">
              {" "}
              de tu envío
            </Text>
          </Text>
        </XStack>
        <YStack className="items-center justify-evenly flex-1 w-full">
          <Window height={165} width={"88%"}>
            <XStack className="items-center ml-2 mb-2">
              <Text className="text-black text-base font-qbold">
                Paquetes chicos:
              </Text>
            </XStack>
            <XStack className=" w-[350px] items-center justify-evenly">
              <Package size="3" color="black" />
              <Counter
                maxCount={4}
                count={formData.smallPacks}
                handleChangeCount={setSmallPacks}
                bgColor="#eee"
              />
            </XStack>
            <XStack className="w-full items-center justify-center mt-2">
              <Text className="text-gray-400 text-xs font-qbold ">
                Medidas: hasta{" "}
              </Text>
              <Text className="text-primary text-xs font-qbold opacity-70">
                30cm
              </Text>
            </XStack>
          </Window>
          <Window height={170} width={"88%"}>
            <XStack className="items-center ml-2 mb-3">
              <Text className="text-black text-base font-qbold">
                Paquetes medianos:
              </Text>
            </XStack>
            <XStack className=" w-[350px]  items-center justify-evenly">
              <Package size="4.5" color="$gray6" />
              <Counter
                maxCount={4}
                count={formData.mediumPacks}
                handleChangeCount={setMediumPacks}
                bgColor="#eee"
              />
            </XStack>
            <XStack className="w-full items-center justify-center mt-3">
              <Text className="text-gray-400 text-xs font-qbold ">
                Medidas: entre{" "}
              </Text>
              <Text className="text-primary text-xs font-qbold opacity-70">
                30cm y 60cm
              </Text>
            </XStack>
          </Window>
          <Window height={175} width={"88%"}>
            <XStack className="items-center ml-2 mb-5">
              <Text className="text-black text-base font-qbold">
                Paquetes grandes:
              </Text>
            </XStack>
            <XStack className=" w-[350px]  items-center justify-evenly">
              <Package size="6" color="$gray5" />
              <Counter
                maxCount={4}
                count={formData.largePacks}
                handleChangeCount={setLargePacks}
                bgColor="#eee"
              />
            </XStack>
            <XStack className="w-full items-center justify-center mt-3">
              <Text className="text-gray-400 text-xs font-qbold">
                Medidas: a partir de{" "}
              </Text>
              <Text className="text-primary text-xs font-qbold opacity-70">
                60cm
              </Text>
            </XStack>
          </Window>
        </YStack>
        <XStack className="w-full items-center justify-center mb-6 mt-4">
          <Link href="/(pages)/SearchTripPage" asChild>
            <Button className="w-7 h-7 bg-background">
              <Image
                source={icons.arrowleft}
                className="w-8 h-8"
                resizeMode="contain"
              />
            </Button>
          </Link>
          <View className="w-[75%]">
            <ButtonNext onPress={handleSearch} variant="secondary">
              <Text className="text-2xl font-qsemibold text-white">
                Buscar viajes
              </Text>
            </ButtonNext>
          </View>
        </XStack>
      </YStack>
    </View>
  );
}
