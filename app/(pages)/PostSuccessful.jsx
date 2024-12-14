import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";
import icons from "../../constants/icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function PostSuccessful() {
  const router = useRouter();
  const {
    title,
    section,
    sectionSource,
    returnTo,
    returnToSource,
    returnToRef,
  } = useLocalSearchParams();

  const handleReturn = () => {
    router.replace(returnToRef);
    router.dismissAll();
  };

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
            onPress={handleReturn}
            className="flex-row items-center justify-center pb-3 bg-white rounded-2xl"
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
            <MaterialIcons name={returnToSource} size={32} color="#444444" />
            <Text className="ml-2 font-qbold text-2xl">{returnTo}</Text>
          </Pressable>
        </View>
      </YStack>
    </YStack>
  );
}
