import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Spinner, XStack, YStack } from "tamagui";
import BlackButton from "../../components/BlackButton";
import { useGlobalState } from "../_layout";
import ActiveTripCard from "../../components/ActiveTripCard";
import ActiveTripCardForRider from "../../components/ActiveTripCardForRider";
import { getUserOrDriverRides } from "../../services/rides";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingPage from "../(pages)/LoadingPage";
import ErrorPage from "../(pages)/ErrorPage";
import {
  handleStartTripMut,
  handleEndTripMut,
  getTodayRides,
} from "../../services/rides";
import { Link, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { queryClient } from "../_layout";
import { isCurrentTimeGreaterOrEqual } from "../(pages)/TripUpcomingDetailForDriver";
export default function Home() {
  const { globalState, setGlobalState } = useGlobalState();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["ridesUpcoming"],
    queryFn: () => {
      if (globalState.isLoggedIn) {
        return getTodayRides();
      }
      return [];
    },
  });

  const start_mutation = useMutation({
    mutationFn: (id) => handleStartTripMut(id),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["ridesUpcoming"], (oldData) => {
        if (!oldData) return oldData;
        return oldData.map((item) => {
          if (item.ride_id === variables) {
            return { ...item, real_start_time: data.real_start_time };
          }
          return item;
        });
      });
    },
  });

  const end_mutation = useMutation({
    mutationFn: (id) => handleEndTripMut(id),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["ridesUpcoming"], (oldData) => {
        return oldData.filter((item) => item.ride_id !== variables);
      });
    },
  });

  const handleStartTrip = (ride_id) => {
    start_mutation.mutate(ride_id);
  };

  const handleEndTrip = (ride_id) => {
    end_mutation.mutate(ride_id);
  };

  const router = useRouter();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <ScrollView className="flex-1 bg-background">
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
        <YStack className="px-6 items-center">
          <Text className="text-4xl font-qbold text-white mb-2">
            ¡Bienvenido,
          </Text>
          <Text className="text-4xl font-qbold text-white/90">
            {globalState.isLoggedIn ? globalState.firstName : "Invitado"}!
          </Text>
        </YStack>
      </LinearGradient>

      <View className="px-4 -mt-12">
        <XStack gap="$4">
          <Pressable
            className="flex-1"
            style={({ pressed }) => ({
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
            onPress={() => {
              router.push("/(pages)/SearchTripPage");
            }}
          >
            <View
              className="bg-white rounded-3xl py-6 px-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 3,
                minHeight: 200, // Aumentamos la altura mínima
              }}
            >
              <View className="bg-primary/10 h-14 w-14 rounded-2xl items-center justify-center mb-4">
                <MaterialIcons name="search" size={28} color="#59A58A" />
              </View>
              <View className="flex-1 justify-center">
                <Text className="text-xl font-qbold text-black mb-2">
                  Buscar viaje
                </Text>
                <Text className="text-sm font-qregular text-gray-500">
                  Encontrá tu próximo destino
                </Text>
              </View>
            </View>
          </Pressable>

          <Pressable
            onPress={() => {
              router.push("/(pages)/PostTripPage");
            }}
            className="flex-1"
            style={({ pressed }) => ({
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <View
              className={`bg-white rounded-3xl py-6 px-4 ${
                !globalState.isDriver ? "opacity-50" : ""
              }`}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 3,
                minHeight: 200, // Aumentamos la altura mínima
              }}
            >
              <View
                className={`bg-white rounded-3xl py-6 px-4 ${
                  !globalState.isDriver || !globalState.isLoggedIn
                    ? "opacity-50"
                    : ""
                }`}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 12,
                  elevation: 3,
                  minHeight: 200, // Aumentamos la altura mínima
                }}
              >
                <View className="bg-primary/10 h-14 w-14 rounded-2xl items-center justify-center mb-4">
                  <MaterialIcons
                    name="add-circle-outline"
                    size={28}
                    color="#59A58A"
                  />
                </View>
                <View className="flex-1 justify-start">
                  <Text className="text-xl font-qbold text-black mb-2">
                    Publicar viaje
                  </Text>
                  <Text className="text-sm font-qregular text-gray-500">
                    Compartí tu ruta
                  </Text>
                </View>
              </View>
              <View className="flex-1 justify-start">
                <Text className="text-xl font-qbold text-black mb-2">
                  Publicar viaje
                </Text>
                <Text className="text-sm font-qregular text-gray-500">
                  Compartí tu ruta
                </Text>
              </View>
            </View>
          </Pressable>
        </XStack>
      </View>

      <View className="px-6 mt-10">
        <Text className="text-lg font-qbold text-black mb-4">
          Viajes programados para hoy
        </Text>

        {data && data.length > 0 ? (
          <YStack space="$2" className="mb-6">
            {data.map((item) => {
              const sliced_from = item.city_from.slice(0, 3).toUpperCase();
              const sliced_to = item.city_to.slice(0, 3).toUpperCase();

              return item.type == "driver" ? (
                <ActiveTripCard
                  key={item.ride_id}
                  ride_id={item.ride_id}
                  from={sliced_from}
                  to={sliced_to}
                  passengers={item.people}
                  packages={item.packages}
                  departure={item.start_time.split(":").slice(0, 2).join(":")}
                  isActive={item.real_start_time !== null}
                  disabled={
                    !isCurrentTimeGreaterOrEqual(
                      new Date().toISOString().split("T")[0],
                      item.start_time
                    )
                  }
                  handleStartTrip={() => handleStartTrip(item.ride_id)}
                  handleEndTrip={() => handleEndTrip(item.ride_id)}
                />
              ) : (
                <ActiveTripCardForRider
                  key={item.ride_id}
                  ride_id={item.ride_id}
                  from={sliced_from}
                  to={sliced_to}
                  passengers={item.people}
                  packages={item.packages}
                  departure={item.start_time.split(":").slice(0, 2).join(":")}
                  isActive={item.real_start_time !== null}
                />
              );
            })}
          </YStack>
        ) : (
          <View
            className="items-center justify-center bg-gray-50 rounded-3xl py-12 mb-6"
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 3,
            }}
          >
            <MaterialIcons name="event-busy" size={48} color="#ccc" />
            <Text className="text-lg font-qsemibold text-gray-400 mt-4 text-center">
              No tenés ningún viaje{"\n"}programado para hoy
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
