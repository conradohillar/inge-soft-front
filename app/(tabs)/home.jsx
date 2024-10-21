import { View, Text, Image } from "react-native";
import { XStack, YStack } from "tamagui";
import BlackButton from "../../components/BlackButton";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalState } from "../_layout";

export default function Home() {
  const { globalState, setGlobalState } = useGlobalState();

  return (
    <YStack className="h-full items-center justify-evenly bg-background">
      <XStack className="items-center h-[15%]">
        <Text className="text-3xl text-black font-qsemibold">Bienvenido,</Text>
        <Text className="text-3xl text-primary font-qbold">
          {" "}
          {globalState.firstName}
        </Text>
      </XStack>
      <View className="w-[90%] mb-10 bg-gray-400 rounded-2xl border-2 justify-center">
        <Image
          source={require("../../assets/images/map.png")}
          className="w-full items-center justify-evenly rounded-2xl border-2 border-gray-400"
        />
      </View>
      <XStack className="items-start justify-evenly w-[100%] h-[25%] px-3">
        <View className="w-[55%]">
          <BlackButton href="/(pages)/SearchTripPage" variant={"secondary"}>
            <Text className="text-[20px] font-qsemibold text-white">
              Buscar viaje
            </Text>
          </BlackButton>
        </View>
        <View className="w-[55%]">
          <BlackButton
            href="/(pages)/PostTripPage"
            className={`${
              globalState.isDriver ? "" : "opacity-50 bg-gray-500"
            }`}
            disabled={!globalState.isDriver}
          >
            <Text className={`text-[20px] font-qsemibold text-white`}>
              Publicar viaje
            </Text>
          </BlackButton>
        </View>
      </XStack>
    </YStack>
  );
}
