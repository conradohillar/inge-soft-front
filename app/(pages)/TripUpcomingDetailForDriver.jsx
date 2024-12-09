import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { useEffect, useState } from "react";
import { XStack, YStack, Avatar, Button } from "tamagui";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getDriverUpcomingDetail } from "../../services/rides";
import LoadingPage from "./LoadingPage";
import { Link } from "expo-router";
import ErrorPage from "./ErrorPage";
import icons from "../../constants/icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import ButtonNext from "../../components/ButtonNext";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function TripUpcomingDetailForDriver() {
  const { ride_id } = useLocalSearchParams();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["driverUpcomingDetail", ride_id],
    queryFn: () => getDriverUpcomingDetail(ride_id),
  });

  const router = useRouter();

  const handleRequests = () => {
    router.push({
      pathname: "/(pages)/ReservationRequest",
      params: { ride_id },
    });
  };

  function isCurrentTimeGreaterOrEqual(date, time) {
    const receivedDateTime = new Date(`${date}T${time}`);

    const receivedDateTimeMinus30Min = new Date(
      receivedDateTime.getTime() - 30 * 60000
    );

    let currentDateTime = new Date();
    currentDateTime = new Date(currentDateTime.getTime() - 3 * 60 * 60000);

    return currentDateTime >= receivedDateTimeMinus30Min;
  }

  const handleStartTrip = () => {};

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <Pressable className="mb-4">
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
              Detalle{" "}
              <Text className="text-4xl font-qbold text-white/90">
                del viaje
              </Text>
            </Text>
          </View>
        </LinearGradient>

        <View className="-mt-12">
          {/* Alerta de solicitudes si existen */}
          {data.state && (
            <View className="px-6 mb-4">
              <XStack className="items-center justify-center space-x-2 bg-white/90 rounded-2xl py-3">
                <Image
                  source={icons.alert}
                  className="h-6 w-6"
                  resizeMode="contain"
                  tintColor="#ff6633"
                />
                <Text className="text-sm font-qbold text-gray-600">
                  Tenés solicitudes nuevas sin resolver
                </Text>
              </XStack>
            </View>
          )}

          {/* Origen y Destino */}
          <View className="px-6 mb-4">
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
              <YStack space="$4">
                <YStack space="$2">
                  <Text className="text-sm font-qsemibold text-primary">
                    Origen
                  </Text>
                  <XStack className="items-center space-x-3">
                    <MaterialIcons
                      name="trip-origin"
                      size={24}
                      color="#00AA00"
                    />
                    <Text className="text-lg font-qbold text-black flex-1 flex-wrap">
                      {data.city_from}
                    </Text>
                  </XStack>
                </YStack>

                <YStack space="$2">
                  <Text className="text-sm font-qsemibold text-primary">
                    Destino
                  </Text>
                  <XStack className="items-center space-x-3">
                    <MaterialIcons name="place" size={24} color="#DD0000" />
                    <Text className="text-lg font-qbold text-black flex-1 flex-wrap">
                      {data.city_to}
                    </Text>
                  </XStack>
                </YStack>
              </YStack>
            </View>
          </View>

          {/* Fecha y Hora */}
          <View className="px-6 mb-4">
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
              <Text className="text-sm font-qsemibold text-primary mb-4">
                Fecha y hora
              </Text>
              <YStack space="$3.5">
                <XStack className="items-center space-x-3">
                  <MaterialIcons
                    name="calendar-today"
                    size={24}
                    color="#AA00FF"
                  />
                  <Text className="text-lg font-qbold text-black">
                    {data.date}
                  </Text>
                </XStack>
                <XStack className="items-center space-x-3">
                  <MaterialIcons name="access-time" size={24} color="#EEB800" />
                  <Text className="text-lg font-qbold text-black">
                    {data.start_minimum_time.split(":").slice(0, 2).join(":")} -{" "}
                    {data.start_maximum_time.split(":").slice(0, 2).join(":")}
                  </Text>
                </XStack>
              </YStack>
            </View>
          </View>

          {/* Vehículo */}
          <View className="px-6 mb-4">
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
              <Text className="text-sm font-qsemibold text-primary mb-4">
                Vehículo
              </Text>
              <XStack className="items-center space-x-3">
                <MaterialIcons
                  name="directions-car"
                  size={24}
                  color="#666666"
                />
                <Text className="text-lg font-qbold text-black">
                  {data.car_model}
                </Text>
                <Text className="text-base font-qsemibold text-gray-500">
                  {data.car_plate}
                </Text>
              </XStack>
            </View>
          </View>

          {/* Espacios Disponibles */}
          <View className="px-6 mb-4">
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
              <Text className="text-sm font-qsemibold text-primary mb-4">
                Espacios disponibles
              </Text>
              <YStack space="$4" className="pr-2">
                <XStack className="items-center justify-between mb-2">
                  <XStack className="items-center space-x-3">
                    <View className="w-12 items-center">
                      <MaterialIcons name="person" size={24} color="#666666" />
                    </View>
                    <Text className="text-base font-qsemibold text-gray-500">
                      Personas
                    </Text>
                  </XStack>
                  <Text className="text-lg font-qbold text-black">
                    {data.available_space_persons}
                  </Text>
                </XStack>

                <XStack className="items-center justify-between mb-1">
                  <XStack className="items-center space-x-3">
                    <View className="w-12 items-center">
                      <Image
                        source={icons.mypackage}
                        className="h-8 w-8"
                        resizeMode="contain"
                      />
                    </View>
                    <Text className="text-base font-qsemibold text-gray-500">
                      Paquetes chicos
                    </Text>
                  </XStack>
                  <Text className="text-lg font-qbold text-black">
                    {data.available_space_small_package}
                  </Text>
                </XStack>

                <XStack className="items-center justify-between">
                  <XStack className="items-center space-x-3">
                    <View className="w-12 items-center">
                      <Image
                        source={icons.mypackage}
                        className="h-10 w-10"
                        resizeMode="contain"
                      />
                    </View>
                    <Text className="text-base font-qsemibold text-gray-500">
                      Paquetes medianos
                    </Text>
                  </XStack>
                  <Text className="text-lg font-qbold text-black">
                    {data.available_space_medium_package}
                  </Text>
                </XStack>

                <XStack className="items-center justify-between">
                  <XStack className="items-center space-x-3">
                    <View className="w-12 items-center">
                      <Image
                        source={icons.mypackage}
                        className="h-12 w-12"
                        resizeMode="contain"
                      />
                    </View>
                    <Text className="text-base font-qsemibold text-gray-500">
                      Paquetes grandes
                    </Text>
                  </XStack>
                  <Text className="text-lg font-qbold text-black">
                    {data.available_space_large_package}
                  </Text>
                </XStack>
              </YStack>
            </View>
          </View>

          {/* Pasajeros */}
          <View className="px-6 mb-4">
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
              <Text className="text-sm font-qsemibold text-primary mb-4">
                Pasajeros anotados
              </Text>
              {data.riders && data.riders.length > 0 ? (
                data.riders.map((rider) => (
                  <XStack
                    key={rider.user_id}
                    className="items-center justify-between mb-4 last:mb-0"
                  >
                    <XStack className="items-center space-x-3">
                      <Avatar
                        circular
                        size="$8"
                        borderColor="$gray5"
                        borderWidth={1}
                      >
                        <Avatar.Image
                          src={rider.photo_url || icons.placeholder_profile}
                        />
                        <Avatar.Fallback backgroundColor="$gray8" />
                      </Avatar>
                      <YStack>
                        <Text className="font-qbold text-base text-black">
                          {rider.name}
                        </Text>
                        <Link
                          href={{
                            pathname: "/(pages)/UserProfile",
                            params: {
                              user_id: rider.user_id,
                              category: "rider",
                            },
                          }}
                          asChild
                        >
                          <Text className="font-qsemibold text-sm text-primary underline">
                            Ver perfil
                          </Text>
                        </Link>
                      </YStack>
                    </XStack>
                    <Link
                      href={{
                        pathname: "/(pages)/ChatPage",
                        params: { chat_id: rider.chat_id },
                      }}
                      asChild
                    >
                      <Pressable className="h-12 w-12 bg-primary/10 rounded-full items-center justify-center">
                        <MaterialCommunityIcons
                          name="message-text-outline"
                          size={22}
                          color="#59A58A"
                        />
                      </Pressable>
                    </Link>
                  </XStack>
                ))
              ) : (
                <Text className="text-base font-qregular text-gray-300 italic self-center">
                  Aún no hay pasajeros en este viaje
                </Text>
              )}
            </View>
          </View>

          {/* Botones de acción */}
          <View className="px-6 mb-8 mt-4">
            {(isCurrentTimeGreaterOrEqual(
              data.date,
              data.start_minimum_time
            ) && (
              <ButtonNext onPress={handleStartTrip} variant="secondary">
                <Text className="text-xl font-qsemibold text-white">
                  Comenzar viaje!
                </Text>
              </ButtonNext>
            )) || (
              <ButtonNext onPress={handleRequests}>
                <Text className="text-xl font-qsemibold text-white">
                  Ver solicitudes
                </Text>
              </ButtonNext>
            )}
          </View>
        </View>
      </Pressable>
    </ScrollView>
  );
}
