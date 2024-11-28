import { Button, XStack, YStack } from "tamagui";
import { User } from "@tamagui/lucide-icons";
import Counter from "../../components/Counter";
import { View, Text, Image, ScrollView } from "react-native";
import { Link } from "expo-router";
import icons from "../../constants/icons";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ButtonNext from "../../components/ButtonNext";
import Window from "../../components/Window";

export default function TripDetailsPage() {
  const { fromLocation, toLocation, formattedDate } = useLocalSearchParams();
  const [formData, setFormData] = useState({
    people: 0,
    smallPacks: 0,
    mediumPacks: 0,
    largePacks: 0,
  });

  const setPeople = (count) => {
    setFormData((prev) => ({ ...prev, people: count }));
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
    <View className="bg-background h-full w-full">
      <YStack className="items-center justify-evenly h-full">
        <View className="items-center mb-3 mt-10">
          <Text className="text-2xl font-qbold text-black">
            Últimos
            <Text className="text-2xl font-qbold text-primary">
              {" "}
              detalles
              <Text className="text-2xl font-qbold text-black"> del viaje</Text>
            </Text>
          </Text>
        </View>
        <YStack className="w-full items-center justify-evenly flex-1">
          <Window height={160} width={"88%"}>
            <XStack className="items-center ml-2 mb-3">
              <Text className="text-black text-base font-qbold">Asientos</Text>
            </XStack>
            <XStack className="items-center justify-evenly ml-4">
              <User size="3" color="black" />
              <Counter
                maxCount={4}
                count={formData.people}
                handleChangeCount={setPeople}
                bgColor="#eee"
              />
            </XStack>
          </Window>
          <Window height={175} width={"88%"}>
            <XStack className="items-start ml-2 mb-4">
              <Text className="text-black text-base font-qbold">
                Equipaje chico/mediano
              </Text>
            </XStack>
            <XStack className="items-center justify-evenly ml-4">
              <Image source={icons.bag} className="w-12 h-12" />
              <Counter
                maxCount={4}
                count={formData.mediumPacks}
                handleChangeCount={setMediumPacks}
                bgColor="#eee"
              />
            </XStack>
            <XStack className="w-full items-center justify-center mt-4">
              <Text className="text-gray-400 text-xs font-qbold ">
                Medidas: hasta{" "}
              </Text>
              <Text className="text-primary text-xs font-qbold opacity-70">
                60cm
              </Text>
            </XStack>
          </Window>
          <Window height={175} width={"88%"}>
            <XStack className="items-center ml-2 mb-3">
              <Text className="text-black text-base font-qbold">
                Equipaje grande
              </Text>
            </XStack>
            <XStack className="items-center justify-evenly ml-4">
              <Image source={icons.suitcase} className="w-12 h-12" />
              <Counter
                maxCount={4}
                count={formData.largePacks}
                handleChangeCount={setLargePacks}
                bgColor="#eee"
              />
            </XStack>
            <XStack className="w-full items-center justify-center mt-4">
              <Text className="text-gray-400 text-xs font-qbold">
                Medidas: a partir de{" "}
              </Text>
              <Text className="text-primary text-xs font-qbold opacity-70">
                60cm
              </Text>
            </XStack>
          </Window>
        </YStack>
        <View className="px-8 py-4">
          <Text className="text-sm text-primary font-qsemibold">
            Nota:
            <Text className="text-sm text-gray-400 font-qsemibold">
              {" "}
              te recordamos que podés llevar un bolso/mochila sin costo
              adicional.
            </Text>
          </Text>
        </View>

        <XStack className="items-center mb-6">
          <Link href="/(pages)/SearchTripPage" asChild>
            <Button className="w-6 h-6 bg-background">
              <Image
                source={icons.arrowleft}
                className="w-7 h-7"
                resizeMode="contain"
              />
            </Button>
          </Link>
          <View className="w-3/4 items-center justify-center">
            <ButtonNext onPress={handleSearch}>
              <Text className="text-2xl font-qsemibold text-white">
                Buscar viaje
              </Text>
            </ButtonNext>
          </View>
        </XStack>
      </YStack>
    </View>
  );
}
