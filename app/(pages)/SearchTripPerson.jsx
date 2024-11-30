import { Button, XStack, YStack } from "tamagui";
import { User } from "@tamagui/lucide-icons";
import Counter from "../../components/Counter";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { Link } from "expo-router";
import icons from "../../constants/icons";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ButtonNext from "../../components/ButtonNext";
import Window from "../../components/Window";
import { LinearGradient } from "expo-linear-gradient";

export default function SearchTripPerson() {
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
    <ScrollView className="flex-1 bg-background">
      <Pressable className="mb-10">
        <LinearGradient
          colors={["#59A58A", "#7AB5A0"]}
          style={{
            width: "100%",
            paddingTop: 60,
            paddingBottom: 80,
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          }}
        >
          <View className="px-6 items-center">
            <Text className="text-4xl font-qbold text-white">
              Detalles{" "}
              <Text className="text-4xl font-qbold text-white/90">
                del viaje
              </Text>
            </Text>
          </View>
        </LinearGradient>

        <View className="px-6 -mt-12">
          <YStack space="$4">
            <View
              className="bg-white rounded-3xl p-6"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 3,
              }}
            >
              <Text className="text-lg font-qbold text-black mb-4">
                Asientos
              </Text>
              <XStack className="items-center justify-between px-8 mb-8">
                <View className="w-12 items-center">
                  <User size={32} color="black" />
                </View>
                <Counter
                  maxCount={4}
                  count={formData.people}
                  handleChangeCount={setPeople}
                />
              </XStack>
            </View>

            <View
              className="bg-white rounded-3xl p-6"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 3,
              }}
            >
              <Text className="text-lg font-qbold text-black mb-4">
                Equipaje chico/mediano
              </Text>
              <XStack className="items-center justify-between px-8">
                <View className="w-12 items-center">
                  <Image source={icons.bag} className="w-10 h-10" />
                </View>
                <Counter
                  maxCount={4}
                  count={formData.mediumPacks}
                  handleChangeCount={setMediumPacks}
                />
              </XStack>
              <XStack className="w-full items-center justify-center mt-5">
                <Text className="text-gray-400 text-xs font-qbold">
                  Medidas: hasta{" "}
                </Text>
                <Text className="text-primary text-xs font-qbold opacity-70 mr-2">
                  60cm
                </Text>
              </XStack>
            </View>

            <View
              className="bg-white rounded-3xl p-6"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 3,
              }}
            >
              <Text className="text-lg font-qbold text-black mb-4">
                Equipaje grande
              </Text>
              <XStack className="items-center justify-between px-8">
                <View className="w-12 items-center">
                  <Image source={icons.suitcase} className="w-12 h-12" />
                </View>
                <Counter
                  maxCount={4}
                  count={formData.largePacks}
                  handleChangeCount={setLargePacks}
                />
              </XStack>
              <XStack className="w-full items-center justify-center mt-5">
                <Text className="text-gray-400 text-xs font-qbold">
                  Medidas: a partir de{" "}
                </Text>
                <Text className="text-primary text-xs font-qbold opacity-70 mr-1">
                  60cm
                </Text>
              </XStack>
            </View>
          </YStack>

          <View className="pt-6 pb-10 self-center px-4">
            <Text className="text-sm text-primary font-qsemibold">
              Nota:
              <Text className="text-sm text-gray-400 font-qsemibold">
                {" "}
                te recordamos que podés llevar un bolso/mochila sin costo
                adicional.
              </Text>
            </Text>
          </View>

          <XStack className="justify-center items-center">
            <ButtonNext onPress={handleSearch} variant="secondary">
              <Text className="text-2xl font-qsemibold text-white">
                Buscar viajes
              </Text>
            </ButtonNext>
          </XStack>
        </View>
      </Pressable>
    </ScrollView>
  );
}
