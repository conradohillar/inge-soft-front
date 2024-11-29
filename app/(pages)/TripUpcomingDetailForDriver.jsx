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
import { MaterialIcons } from "@expo/vector-icons";

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

    console.log(currentDateTime);
    console.log(receivedDateTimeMinus30Min);

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
    <YStack className="w-full h-full items-start justify-start bg-background">
      <View className="w-full h-[10%] items-center justify-center">
        <XStack className="w-full items-start justify-center ml-12">
          <Link
            href={{
              pathname: "/(pages)/TripsPage",
              params: { category: "driver" },
            }}
            asChild
          >
            <Button className="h-9 w-9 bg-background rounded-xl ml-12">
              <Image
                source={icons.arrowleft}
                className="h-7 w-7"
                resizeMode="contain"
              />
            </Button>
          </Link>
          <View className="w-full items-start ml-8">
            <Text className="text-3xl font-qbold text-primary">
              Detalle
              <Text className="text-3xl font-qbold text-black"> del viaje</Text>
            </Text>
          </View>
        </XStack>
      </View>
      {data.state && (
        <XStack className="w-[95%] items-center justify-center space-x-2 mb-4">
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
      )}
      <ScrollView className="w-full">
        <Pressable>
          <YStack className="items-start justify-between w-full px-6 pb-8 pt-4 mb-1 border-b-2 border-b-[#eee]">
            <Text className="text-sm font-qbold text-[#ccc] mb-6">
              Logísticos
            </Text>

            {/* Sección Origen y Destino */}
            <XStack className="w-full justify-between items-start mb-8">
              <YStack space="$2" className="flex-1">
                <Text className="text-sm font-qsemibold text-gray-500">
                  Origen
                </Text>
                <Text className="text-lg font-qbold text-black">
                  {data.city_from}
                </Text>
              </YStack>

              <Image
                source={icons.arrowright}
                className="h-6 w-6 mt-6 mx-4"
                resizeMode="contain"
                tintColor="#666666"
              />

              <YStack space="$2" className="flex-1">
                <Text className="text-sm font-qsemibold text-gray-500">
                  Destino
                </Text>
                <Text className="text-lg font-qbold text-black">
                  {data.city_to}
                </Text>
              </YStack>
            </XStack>

            {/* Sección Fecha y Hora */}
            <YStack space="$4" className="w-full mb-8">
              <XStack className="items-center space-x-3">
                <MaterialIcons
                  name="calendar-today"
                  size={24}
                  color="#666666"
                />
                <Text className="text-lg font-qbold text-black">
                  {data.date}
                </Text>
              </XStack>

              <XStack className="items-center space-x-3">
                <MaterialIcons name="access-time" size={24} color="#666666" />
                <Text className="text-lg font-qbold text-black">
                  {data.start_minimum_time.split(":").slice(0, 2).join(":")} -{" "}
                  {data.start_maximum_time.split(":").slice(0, 2).join(":")}
                </Text>
              </XStack>
            </YStack>

            {/* Sección Vehículo */}
            <YStack space="$2" className="w-full mb-8">
              <Text className="text-sm font-qsemibold text-gray-500">
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
            </YStack>

            {/* Sección Espacios Disponibles */}
            <Text className="text-sm font-qsemibold text-gray-500 mb-4">
              Espacios disponibles
            </Text>
            <YStack space="$3" className="w-full">
              <XStack className="items-center justify-between w-full">
                <XStack className="items-center space-x-3">
                  <MaterialIcons name="person" size={24} color="#666666" />
                  <Text className="text-base font-qsemibold text-gray-500">
                    Personas
                  </Text>
                </XStack>
                <Text className="text-lg font-qbold text-black">
                  {data.available_space_persons}
                </Text>
              </XStack>

              <XStack className="items-center justify-between w-full">
                <XStack className="items-center space-x-3">
                  <MaterialIcons name="work" size={20} color="#666666" />
                  <Text className="text-base font-qsemibold text-gray-500">
                    Paquetes chicos
                  </Text>
                </XStack>
                <Text className="text-lg font-qbold text-black">
                  {data.available_space_small_package}
                </Text>
              </XStack>

              <XStack className="items-center justify-between w-full">
                <XStack className="items-center space-x-3">
                  <MaterialIcons name="work" size={24} color="#666666" />
                  <Text className="text-base font-qsemibold text-gray-500">
                    Paquetes medianos
                  </Text>
                </XStack>
                <Text className="text-lg font-qbold text-black">
                  {data.available_space_medium_package}
                </Text>
              </XStack>

              <XStack className="items-center justify-between w-full">
                <XStack className="items-center space-x-3">
                  <MaterialIcons name="work" size={28} color="#666666" />
                  <Text className="text-base font-qsemibold text-gray-500">
                    Paquetes grandes
                  </Text>
                </XStack>
                <Text className="text-lg font-qbold text-black">
                  {data.available_space_large_package}
                </Text>
              </XStack>
            </YStack>
          </YStack>
          <YStack className="items-start justify-between w-full px-4 pb-5 pt-3 mb-2 border-t-2 border-t-[#eee]">
            <Text className="text-sm font-qbold text-[#ccc] mb-5">
              Manejá las solicitudes de tus pasajeros
            </Text>
            <ButtonNext onPress={handleRequests}>
              <Text className="text-2xl font-qsemibold text-white">
                Ver solicitudes
              </Text>
            </ButtonNext>
          </YStack>
          {isCurrentTimeGreaterOrEqual(data.date, data.start_minimum_time) && (
            <YStack className="items-start justify-between w-full px-4 pb-8 pt-3 border-t-2 border-t-[#eee]">
              <Text className="text-sm font-qbold text-[#ccc] mb-2">
                Es hora...
              </Text>
              <ButtonNext onPress={handleStartTrip} variant={"secondary"}>
                <Text className="text-2xl font-qsemibold text-white">
                  Comenzar viaje!
                </Text>
              </ButtonNext>
            </YStack>
          )}
        </Pressable>
      </ScrollView>
    </YStack>
  );
}
