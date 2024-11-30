import { LinearGradient } from "expo-linear-gradient";
import { Button, View, XStack, YStack } from "tamagui";
import { Package } from "@tamagui/lucide-icons";
import Counter from "../../components/Counter";
import { Text, Image, ScrollView, Pressable } from "react-native";
import { Link } from "expo-router";
import icons from "../../constants/icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import ButtonNext from "../../components/ButtonNext";
import { useState } from "react";

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
                del envío
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
                Paquetes chicos
              </Text>
              <XStack className="items-center justify-between px-8">
                <View className="w-12 items-center">
                  <Package size={24} color="black" />
                </View>
                <Counter
                  maxCount={4}
                  count={formData.smallPacks}
                  handleChangeCount={setSmallPacks}
                />
              </XStack>
              <XStack className="w-full items-center justify-center mt-4">
                <Text className="text-gray-400 text-xs font-qbold">
                  Medidas: hasta{" "}
                </Text>
                <Text className="text-primary text-xs font-qbold opacity-70 mr-2">
                  30cm
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
                Paquetes medianos
              </Text>
              <XStack className="items-center justify-between px-8">
                <View className="w-12 items-center">
                  <Package size={32} color="black" />
                </View>
                <Counter
                  maxCount={4}
                  count={formData.mediumPacks}
                  handleChangeCount={setMediumPacks}
                />
              </XStack>
              <XStack className="w-full items-center justify-center mt-4">
                <Text className="text-gray-400 text-xs font-qbold">
                  Medidas: entre{" "}
                </Text>
                <Text className="text-primary text-xs font-qbold opacity-70">
                  30cm y 60cm
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
                Paquetes grandes
              </Text>
              <XStack className="items-center justify-between px-8">
                <View className="w-12 items-center">
                  <Package size={40} color="black" />
                </View>
                <Counter
                  maxCount={4}
                  count={formData.largePacks}
                  handleChangeCount={setLargePacks}
                />
              </XStack>
              <XStack className="w-full items-center justify-center mt-4">
                <Text className="text-gray-400 text-xs font-qbold">
                  Medidas: a partir de{" "}
                </Text>
                <Text className="text-primary text-xs font-qbold opacity-70 mr-2">
                  60cm
                </Text>
              </XStack>
            </View>
          </YStack>

          <XStack className="justify-center items-center mt-10">
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
