import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { Button, XStack, YStack } from "tamagui";
import { User, Package } from "@tamagui/lucide-icons";
import Counter from "../../components/Counter";
import { View, Text, Image } from "react-native";
import CustomInput from "../../components/CustomInput";
import BlackButton from "../../components/BlackButton";
import { Link } from "expo-router";
import icons from "../../constants/icons";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ButtonNext from "../../components/ButtonNext";

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
    <SafeAreaView className="h-full w-full bg-background">
      <Header />
      <YStack className="flex-1 items-center justify-evenly">
        <View className="items-center my-3">
          <Text className="text-2xl font-qbold text-black">
            Últimos
            <Text className="text-2xl font-qbold text-primary">
              {" "}
              detalles
              <Text className="text-2xl font-qbold text-black"> del viaje</Text>
            </Text>
          </Text>
        </View>
        <YStack className="w-full">
          <XStack className="items-center ml-12 mb-3">
            <Text className="text-black text-base font-qbold underline">
              Asientos:
            </Text>
          </XStack>
          <XStack className="items-center justify-evenly ml-10 mb-6 ">
            <User size="3" color="black" />
            <Counter
              maxCount={4}
              count={formData.people}
              handleChangeCount={setPeople}
            />
          </XStack>
          <XStack className="items-start ml-12 mb-4">
            <Text className="text-black text-base font-qbold underline">
              Equipaje chico/mediano:
            </Text>
          </XStack>
          <XStack className="items-center justify-evenly ml-10">
            <Image source={icons.bag} className="w-12 h-12" />
            <Counter
              maxCount={4}
              count={formData.mediumPacks}
              handleChangeCount={setMediumPacks}
            />
          </XStack>
          <XStack className="w-full items-center justify-center mt-3 mb-8">
            <Text className="text-gray-400 text-xs font-qbold ">
              Medidas: hasta{" "}
            </Text>
            <Text className="text-primary text-xs font-qbold opacity-70">
              60cm
            </Text>
          </XStack>

          <XStack className="items-center ml-12 mb-3">
            <Text className="text-black text-base font-qbold underline">
              Equipaje grande:
            </Text>
          </XStack>
          <XStack className="items-center justify-evenly ml-10">
            <Image source={icons.suitcase} className="w-12 h-12" />
            <Counter
              maxCount={4}
              count={formData.largePacks}
              handleChangeCount={setLargePacks}
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
        </YStack>
        <View className="px-8">
          <Text className="text-sm text-primary font-qsemibold">
            Nota:
            <Text className="text-sm text-gray-400 font-qsemibold">
              {" "}
              te recordamos que podés llevar un bolso/mochila sin costo
              adicional.
            </Text>
          </Text>
        </View>

        <XStack className="items-center mb-3">
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
    </SafeAreaView>
  );
}
