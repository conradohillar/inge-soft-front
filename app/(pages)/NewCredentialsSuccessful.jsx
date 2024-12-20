import { Image, Text, View, Pressable } from "react-native";
import { XStack, YStack } from "tamagui";
import icons from "../../constants/icons";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function NewCredentialsSuccessful() {
  const {
    title,
    section,
    sectionSource,
    returnTo,
    returnToSource,
    returnToRef,
  } = useLocalSearchParams();
  return (
    <YStack className="h-full items-center justify-center bg-background">
      <Text className="text-6xl text-primary font-qbold">Genial!</Text>
      <View className="mb-12 mt-12">
        <Image source={icons.logo} style={{ height: 250, width: 250 }} />
      </View>
      <YStack className="items-center space-y-10">
        <Text className="text-3xl text-black font-qbold">{title}</Text>
        <Text className="text-xl text-gray-400 font-qbold">
          Ya podés encontrarlo en la
        </Text>
        <XStack className="items-center space-x-3 mb-12">
          <Text className="text-xl text-gray-400 font-qbold">
            sección
            <Text className="text-xl text-primary font-qbold"> {section}</Text>
          </Text>
          <Image
            source={sectionSource}
            className="w-8 h-8"
            tintColor="#59A58A"
            resizeMode="contain"
          />
        </XStack>
        {/* Botón inferior */}
        <View className="px-6 pb-2 bg-background">
          <Pressable
            className="flex-row items-center justify-center pb-3 bg-white rounded-2xl"
            onPress={() => {
              router.dismissAll();
              router.replace(returnToRef);
            }}
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
            <XStack className="items-center space-x-2">
              <Image
                source={returnToSource}
                className="w-8 h-8"
                resizeMode="contain"
              />
              <Text className="ml-2 font-qbold text-2xl mt-1">{returnTo}</Text>
            </XStack>
          </Pressable>
        </View>
      </YStack>
    </YStack>
  );
}
