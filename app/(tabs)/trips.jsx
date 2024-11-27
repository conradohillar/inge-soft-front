import { Text, View } from "react-native";
import { YStack, XStack, SizableText, Separator } from "tamagui";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function Trips() {
  const router = useRouter();

  return (
    <YStack className="h-full items-start justify-evenly bg-background">
      <View className="w-full pl-8">
        <SizableText className="text-3xl font-qbold text-black">
          Mis viajes
        </SizableText>
      </View>

      <YStack className="w-full h-[70%]">
        <XStack className="w-full justify-center items-center">
          <Separator className="w-[90%] bg-gray-200" />
        </XStack>

        <View className="w-full h-[20%] items-start justify-center pl-8">
          <XStack
            className="w-[80%] items-center justify-between"
            onPress={() =>
              router.push({
                pathname: "/(pages)/TripsPage",
                params: { category: "rider" },
              })
            }
          >
            <XStack className="items-center space-x-5">
              <MaterialIcons name="person" size={24} color="#aaa" />
              <Text className="text-xl text-black font-qbold">
                Como pasajero
              </Text>
            </XStack>
            <MaterialIcons name="chevron-right" size={24} color="#aaa" />
          </XStack>
        </View>

        <XStack className="w-full justify-center items-center">
          <Separator className="w-[90%] bg-gray-200" />
        </XStack>

        <View className="w-full h-[20%] items-start justify-center pl-8">
          <XStack
            className="w-[80%] items-center justify-between"
            onPress={() =>
              router.push({
                pathname: "/(pages)/TripsPage",
                params: { category: "driver" },
              })
            }
          >
            <XStack className="items-center space-x-5">
              <MaterialIcons name="drive-eta" size={24} color="#aaa" />
              <Text className="text-xl text-black font-qbold">
                Como conductor
              </Text>
            </XStack>
            <MaterialIcons name="chevron-right" size={24} color="#aaa" />
          </XStack>
        </View>

        <XStack className="w-full justify-center items-center">
          <Separator className="w-[90%] bg-gray-200" />
        </XStack>
      </YStack>
    </YStack>
  );
}
