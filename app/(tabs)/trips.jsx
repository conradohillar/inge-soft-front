import { Text, View, Pressable } from "react-native";
import { YStack } from "tamagui";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useGlobalState } from "../../app/_layout";
import ButtonNext from "../../components/ButtonNext";

export default function Trips() {
  const router = useRouter();
  const { globalState } = useGlobalState();

  const handleRiderPress = () => {
    router.push({
      pathname: "/(pages)/TripsPage",
      params: { category: "rider" },
    });
  };

  const handleDriverPress = () => {
    if (!globalState.isDriver) return;
    router.push({
      pathname: "/(pages)/TripsPage",
      params: { category: "driver" },
    });
  };

  return (
    <View className="flex-1 bg-background">
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
          <Text className="text-4xl font-qbold text-white">Tus viajes</Text>
        </View>
      </LinearGradient>

      <View className="px-6 -mt-12">
        {globalState.isLoggedIn ? (
          <YStack space="$4">
            <Pressable
              onPress={handleRiderPress}
              style={({ pressed }) => ({
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
            >
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
                <View className="flex-row items-center space-x-4 mb-6">
                  <View className="bg-primary/10 h-14 w-14 rounded-2xl items-center justify-center">
                    <MaterialIcons name="person" size={28} color="#59A58A" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xl font-qbold text-black mb-2">
                      Como pasajero
                    </Text>
                    <Text className="text-sm font-qregular text-gray-500">
                      Mirá tus viajes reservados
                    </Text>
                  </View>
                  <MaterialIcons
                    name="chevron-right"
                    size={28}
                    color="#59A58A"
                  />
                </View>
              </View>
            </Pressable>

            <Pressable
              onPress={handleDriverPress}
              style={({ pressed }) => ({
                opacity: !globalState.isDriver ? 0.5 : 1,
                transform: [
                  { scale: pressed && globalState.isDriver ? 0.98 : 1 },
                ],
              })}
            >
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
                <View className="flex-row items-center space-x-4">
                  <View className="bg-primary/10 h-14 w-14 rounded-2xl items-center justify-center">
                    <MaterialIcons name="drive-eta" size={28} color="#59A58A" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xl font-qbold text-black mb-2">
                      Como conductor
                    </Text>
                    <Text className="text-sm font-qregular text-gray-500">
                      {globalState.isDriver
                        ? "Administrá tus viajes publicados"
                        : "Acreditate primero como conductor"}
                    </Text>
                  </View>
                  <MaterialIcons
                    name="chevron-right"
                    size={28}
                    color="#59A58A"
                  />
                </View>
              </View>
            </Pressable>
          </YStack>
        ) : (
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
            <View className="items-center mb-6">
              <View className="bg-primary/10 h-20 w-20 rounded-2xl items-center justify-center mb-4">
                <MaterialIcons name="person-add" size={40} color="#59A58A" />
              </View>
              <Text className="text-xl font-qbold text-black mb-2 text-center">
                Registrate para ver tus viajes
              </Text>
              <Text className="text-sm font-qregular text-gray-500 text-center">
                Creá una cuenta para poder realizar o publicar viajes
              </Text>
            </View>
            <ButtonNext onPress={() => router.push("/(auth)/sign-up")}>
              <Text className="text-white font-qbold text-lg">Registrarme</Text>
            </ButtonNext>
          </View>
        )}
      </View>
    </View>
  );
}
