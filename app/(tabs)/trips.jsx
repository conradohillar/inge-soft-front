import { Text, View, Pressable } from "react-native";
import { YStack } from "tamagui";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Trips() {
  const router = useRouter();

  const handleRiderPress = () => {
    router.push({
      pathname: "/(pages)/TripsPage",
      params: { category: "rider" },
    });
  };

  const handleDriverPress = () => {
    router.push({
      pathname: "/(pages)/TripsPage",
      params: { category: "driver" },
    });
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header con gradiente */}
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
          <Text className="text-4xl font-qbold text-white">Mis viajes</Text>
        </View>
      </LinearGradient>

      {/* Tarjetas de opciones */}
      <View className="px-6 -mt-12">
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
              <View className="flex-row items-center space-x-4">
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
                <MaterialIcons name="chevron-right" size={28} color="#59A58A" />
              </View>
            </View>
          </Pressable>

          <Pressable
            onPress={handleDriverPress}
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
              <View className="flex-row items-center space-x-4">
                <View className="bg-primary/10 h-14 w-14 rounded-2xl items-center justify-center">
                  <MaterialIcons name="drive-eta" size={28} color="#59A58A" />
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-qbold text-black mb-2">
                    Como conductor
                  </Text>
                  <Text className="text-sm font-qregular text-gray-500">
                    Administrá tus viajes publicados
                  </Text>
                </View>
                <MaterialIcons name="chevron-right" size={28} color="#59A58A" />
              </View>
            </View>
          </Pressable>
        </YStack>
      </View>
    </View>
  );
}
