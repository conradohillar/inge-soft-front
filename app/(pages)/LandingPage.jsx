import { Image, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { XStack, YStack } from "tamagui";
import BlackButton from "../../components/BlackButton";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { useState } from "react";

export default function LandingPage() {
  const router = useRouter();
  const [data, setData] = useState({ title: "Loading..." });
  const handleApiRequest = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <YStack className="h-full items-center justify-evenly w-full bg-background">
        <View className="justify-end ml-2 flex">
          <Text className="text-[95px] font-qsemibold text-primary">rydio</Text>
        </View>

        <Text className="text-[22px] font-qsemibold text-black">
          {data.title}
        </Text>
        <YStack className="items-center justify-center w-full h-[50%] space-y-2">
          <View className="w-[90%]">
            <BlackButton onPress={handleApiRequest} height={75}>
              <Text className="text-[22px] font-qsemibold text-white">
                Fetch Data
              </Text>
            </BlackButton>
            <BlackButton href="/(pages)/TestNots" height={75}>
              <Text className="text-[22px] font-qsemibold text-white">
                Test Nots
              </Text>
            </BlackButton>
            <BlackButton href="/(auth)/sign-in" height={75}>
              <Text className="text-[22px] font-qsemibold text-white">
                Iniciar sesión
              </Text>
            </BlackButton>
          </View>

          <View className="w-[90%]">
            <BlackButton
              href="/(tabs)/home"
              replace={true}
              variant="secondary"
              height={75}
            >
              <Text className="text-[22px] font-qsemibold text-white">
                Continuar sin cuenta
              </Text>
            </BlackButton>
          </View>

          <XStack className="w-full items-center justify-center mt-5">
            <Text className="text-[18px] text-black font-qsemibold">
              No tenés cuenta?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
              <Text className="text-[18px] text-primary font-qbold underline">
                Registrate
              </Text>
            </TouchableOpacity>
          </XStack>
        </YStack>

        <View className="justify-start">
          <Image
            source={require("../../assets/icons/logo.png")}
            className="h-[150px] w-[150px]"
          />
        </View>
      </YStack>
      <StatusBar theme="dark" />
    </>
  );
}
