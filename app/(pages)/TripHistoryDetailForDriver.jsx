import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { XStack, YStack, Avatar, Button } from "tamagui";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { getDriverHistoryDetail } from "../../services/rides";
import LoadingPage from "./LoadingPage";
import { Link, useLocalSearchParams } from "expo-router";
import ErrorPage from "./ErrorPage";
import icons from "../../constants/icons";

export default function TripHistoryDetailForDriver() {
  const { ride_id } = useLocalSearchParams();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["driverHistoryDetail", ride_id],
    queryFn: () => getDriverHistoryDetail(ride_id),
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <YStack className="w-full h-full items-start justify-start bg-background mb-12">
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
      <ScrollView className="h-full">
        <Pressable>
          <YStack className="items-start justify-between w-full px-6 pb-8 pt-4">
            <YStack space="$4" className="w-full mb-8">
              <YStack space="$2" className="w-full mb-3">
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

              <YStack space="$2" className="w-full mb-2">
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

            {/* Sección Fecha y Hora */}
            <YStack space="$3.5" className="w-full mb-8">
              <Text className="text-sm font-qsemibold text-primary">
                Fecha y hora
              </Text>
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

              <XStack className="items-end space-x-3">
                <MaterialIcons name="access-time" size={24} color="#EEB800" />
                <Text className="text-lg font-qbold text-black">
                  {data.start_minimum_time.split(":").slice(0, 2).join(":")} -{" "}
                  {data.start_maximum_time.split(":").slice(0, 2).join(":")}
                </Text>
              </XStack>
            </YStack>

            {/* Sección Vehículo */}
            <YStack space="$2" className="w-full mb-6">
              <Text className="text-sm font-qsemibold text-primary">
                Vehículo
              </Text>
              <XStack className="items-center space-x-3">
                <MaterialIcons
                  name="directions-car"
                  size={24}
                  color="#666666"
                />
                <Text className="text-lg font-qbold text-black pl-1">
                  {data.car_model}
                </Text>
                <Text className="text-base font-qsemibold text-gray-500">
                  {data.car_plate}
                </Text>
              </XStack>
            </YStack>

            {/* Sección Espacios Disponibles - Ajustada */}
            <Text className="text-sm font-qsemibold text-primary my-4">
              Trasladaste
            </Text>
            <YStack space="$4" className="w-full pr-2">
              <XStack className="items-center justify-between w-full">
                <XStack className="items-center space-x-3 flex-1">
                  <View className="w-7 items-center mr-2">
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
              <XStack className="items-center justify-between w-full">
                <XStack className="items-center space-x-3 flex-1">
                  <View className="w-7 items-center mr-2">
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
              <XStack className="items-center justify-between w-full">
                <XStack className="items-center space-x-3 flex-1">
                  <View className="w-7 items-center mr-2">
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
              <XStack className="items-center justify-between w-full">
                <XStack className="items-center space-x-3 flex-1">
                  <View className="w-7 items-center mr-2">
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
            <View className="w-full items-start border-t-2 border-t-[#eee] mt-6 pt-4">
              <XStack className="items-center my-2">
                <Text className="text-xl font-qbold text-primary ml-2">
                  Ganancia: ${data.price}
                </Text>
              </XStack>
            </View>
          </YStack>
        </Pressable>
      </ScrollView>
    </YStack>
  );
}
