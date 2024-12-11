import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { useState } from "react";
import { Avatar, XStack, YStack } from "tamagui";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { getDriverHistoryDetail } from "../../services/rides";
import LoadingPage from "./LoadingPage";
import { useLocalSearchParams } from "expo-router";
import ErrorPage from "./ErrorPage";
import { LinearGradient } from "expo-linear-gradient";
import icons from "../../constants/icons";
import RateCommentModal from "../../components/RateCommentModal";

export default function TripHistoryDetailForDriver() {
  const { ride_id } = useLocalSearchParams();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [receiverId, setReceiverId] = useState(null);

  const handleRateRider = (id) => {
    setReceiverId(id);
    setIsModalVisible(true);
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["driverHistoryDetail", ride_id],
    queryFn: () => getDriverHistoryDetail(ride_id),
  });

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  return (
    <ScrollView className="flex-1 bg-background">
      <Pressable className="mb-4">
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
            <Text className="text-4xl font-qbold text-white">
              Detalle{" "}
              <Text className="text-4xl font-qbold text-white/90">
                del viaje
              </Text>
            </Text>
          </View>
        </LinearGradient>

        <View className="flex-1 -mt-12 px-6">
          {/* Origen y Destino */}
          <View
            className="bg-white rounded-3xl p-6 mb-4"
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
                  <MaterialIcons name="trip-origin" size={24} color="#00AA00" />
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

          {/* Fecha y Hora */}
          <View
            className="bg-white rounded-3xl p-6 mb-4"
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

          {/* Vehículo */}
          <View
            className="bg-white rounded-3xl p-6 mb-4"
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
              <MaterialIcons name="directions-car" size={24} color="#666666" />
              <Text className="text-lg font-qbold text-black">
                {data.car_model}
              </Text>
              <Text className="text-base font-qsemibold text-gray-500">
                {data.car_plate}
              </Text>
            </XStack>
          </View>

          {/* Pasajeros */}
          <View
            className="bg-white rounded-3xl p-6 mb-4"
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
                  className="items-center space-x-4 mb-4 last:mb-0"
                >
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

                  <YStack space="$2">
                    <Text className="font-qbold text-base text-black">
                      {rider.name}
                    </Text>
                    <Pressable
                      onPress={() => handleRateRider(rider.user_id)}
                      className="bg-primary/10 px-4 py-2 rounded-xl flex-row items-center space-x-2"
                    >
                      <MaterialIcons
                        name="star-outline"
                        size={20}
                        color="#59A58A"
                      />
                      <Text className="font-qsemibold text-sm text-primary">
                        Calificar
                      </Text>
                    </Pressable>
                  </YStack>
                </XStack>
              ))
            ) : (
              <Text className="text-base font-qregular text-gray-300 italic self-center">
                No se anotaron pasajeros en este viaje
              </Text>
            )}
          </View>

          {/* Espacios Utilizados */}
          <View
            className="bg-white rounded-3xl py-6 pl-6 pr-8 mb-4"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 3,
            }}
          >
            <Text className="text-sm font-qsemibold text-primary mb-4">
              Trasladaste
            </Text>
            <YStack space="$4">
              <XStack className="items-center justify-between">
                <XStack className="items-center space-x-3">
                  <View className="w-7 items-center">
                    <MaterialIcons name="person" size={24} color="#666666" />
                  </View>
                  <Text className="text-base font-qsemibold text-gray-500">
                    Personas
                  </Text>
                </XStack>
                <Text className="text-lg font-qbold text-black">
                  {data.persons}
                </Text>
              </XStack>

              <XStack className="items-center justify-between">
                <XStack className="items-center space-x-3">
                  <View className="w-7 items-center">
                    <Image
                      source={icons.mypackage}
                      className="h-7 w-7"
                      resizeMode="contain"
                    />
                  </View>
                  <Text className="text-base font-qsemibold text-gray-500">
                    Paquetes chicos
                  </Text>
                </XStack>
                <Text className="text-lg font-qbold text-black">
                  {data.small_package}
                </Text>
              </XStack>

              <XStack className="items-center justify-between">
                <XStack className="items-center space-x-3">
                  <View className="w-7 items-center">
                    <Image
                      source={icons.mypackage}
                      className="h-8 w-8"
                      resizeMode="contain"
                    />
                  </View>
                  <Text className="text-base font-qsemibold text-gray-500">
                    Paquetes medianos
                  </Text>
                </XStack>
                <Text className="text-lg font-qbold text-black">
                  {data.medium_package}
                </Text>
              </XStack>

              <XStack className="items-center justify-between">
                <XStack className="items-center space-x-3">
                  <View className="w-7 items-center">
                    <Image
                      source={icons.mypackage}
                      className="h-9 w-9"
                      resizeMode="contain"
                    />
                  </View>
                  <Text className="text-base font-qsemibold text-gray-500">
                    Paquetes grandes
                  </Text>
                </XStack>
                <Text className="text-lg font-qbold text-black">
                  {data.large_package}
                </Text>
              </XStack>
            </YStack>
          </View>

          {/* Ganancia */}
          <View
            className="bg-white rounded-3xl p-6 mb-8"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 3,
            }}
          >
            <XStack className="items-center">
              <Text className="text-xl font-qbold text-primary">
                Ganancia: ${data.price}
              </Text>
            </XStack>
          </View>
        </View>

        <RateCommentModal
          isVisible={isModalVisible}
          onBackdropPress={() => setIsModalVisible(false)}
          category={"rider"}
          rideId={ride_id}
          receiverId={receiverId}
          setIsVisible={setIsModalVisible}
        />
      </Pressable>
    </ScrollView>
  );
}
