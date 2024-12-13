import { Image, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { XStack, YStack } from "tamagui";
import BlackButton from "../../components/BlackButton";
import { StatusBar } from "expo-status-bar";
import { useGlobalState } from "../_layout";
import { useEffect, useState } from "react";
import { getToken } from "../../services/utils";
import { registerIndieID } from "native-notify";
import { getUserData } from "../../services/users";
import LoadingPage from "./LoadingPage";
import icons from "../../constants/icons";
import { useQueryClient } from "@tanstack/react-query";

export default function LandingPage() {
  const router = useRouter();
  const { globalState, setGlobalState } = useGlobalState();
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  useEffect(() => {
    const initialize = async () => {
      try {
        const token = await getToken();

        if (token !== null && token !== "") {
          try {
            const user = await getUserData();
            await setGlobalState((prevState) => ({
              ...prevState,
              fullName: user.name,
              firstName: user.name.split(" ")[0],
              email: user.email,
              isLoggedIn: true,
              isDriver: user.is_driver,
              userId: user.user_id,
              photoUrl: user.photo_url || icons.placeholder_profile,
            }));
            registerIndieID(user.user_id, 25312, "s6wtyVfup1RTspXItRRyqB");
            queryClient.invalidateQueries({
              queryKey: ["ridesUpcoming"],
            });
            router.replace("../(tabs)/home");
          } catch (error) {
            setLoading(false);
            console.log("Error getting user data: ", error);
            return;
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    };

    initialize();
  }, []);

  return (
    <>
      {loading && <LoadingPage />}
      {!loading && (
        <>
          <YStack className="h-full items-center justify-evenly w-full bg-background">
            <View className="justify-end ml-2 flex">
              <Text className="text-[95px] font-qsemibold text-primary">
                rydio
              </Text>
            </View>

            <YStack className="items-center justify-center w-full h-[50%] space-y-2">
              <View className="w-[90%]">
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
                <TouchableOpacity
                  onPress={() => router.push("/(auth)/sign-up")}
                >
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
      )}
    </>
  );
}
