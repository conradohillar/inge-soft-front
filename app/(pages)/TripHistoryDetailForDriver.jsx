import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { XStack, YStack, Avatar, Button } from "tamagui";
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
          <YStack className="items-start justify-between w-full px-4 pb-8 pt-2 mb-1 border-t-2 border-t-[#eee]">
            <Text className="text-sm font-qbold text-[#ccc] mb-5">
              Logísticos
            </Text>
            <Text className="text-base font-qsemibold text-gray-500">
              Punto de
              <Text className="text-base font-qbold text-primary">
                {" "}
                partida:
              </Text>
            </Text>
            <Text className="text-base font-qbold text-black mb-5">
              {data.city_from}
            </Text>
            <Text className="text-base font-qsemibold text-gray-500">
              Punto de
              <Text className="text-base font-qbold text-primary">
                {" "}
                llegada:
              </Text>
            </Text>
            <Text className="text-base font-qbold text-black mb-5">
              {data.city_to}
            </Text>
            <Text className="text-base font-qbold text-primary mb-3">
              Fecha
              <Text className="text-base font-qbold text-black">
                : {data.date}
              </Text>
            </Text>
            <Text className="text-base font-qsemibold text-gray-500 mb-3">
              Hora de
              <Text className="text-base font-qbold text-primary">
                {" "}
                salida
                <Text className="text-base font-qbold text-black">
                  : {data.start_minimum_time.split(":").slice(0, 2).join(":")} -{" "}
                  {data.start_maximum_time.split(":").slice(0, 2).join(":")}
                </Text>
              </Text>
            </Text>
            <Text className="text-base font-qbold text-primary mb-6">
              Vehículo:
              <Text className="text-base font-qbold text-black">
                {" "}
                {data.car_model}, {data.car_plate}
              </Text>
            </Text>
            <Text className=" w-full pt-5 text-base font-qsemibold text-gray-500 mb-1 border-t-2 border-t-[#eee]">
              Trasladaste:
            </Text>
            <Text className="text-base font-qbold text-black mb-1">
              Personas:
              <Text className="text-base font-qbold text-black">
                {" "}
                {data.persons}
              </Text>
            </Text>
            <Text className="text-base font-qbold text-black mb-1">
              Paquetes
              <Text className="text-base font-qbold text-primary">
                {" "}
                chicos
                <Text className="text-base font-qbold text-black">
                  : {data.small_package}
                </Text>
              </Text>
            </Text>
            <Text className="text-base font-qbold text-black mb-1">
              Paquetes
              <Text className="text-base font-qbold text-primary">
                {" "}
                medianos
                <Text className="text-base font-qbold text-black">
                  : {data.medium_package}
                </Text>
              </Text>
            </Text>
            <Text className="text-base font-qbold text-black">
              Paquetes
              <Text className="text-base font-qbold text-primary">
                {" "}
                grandes
                <Text className="text-base font-qbold text-black">
                  : {data.large_package}
                </Text>
              </Text>
            </Text>
            <View className="w-full items-start border-t-2 border-t-[#eee] mt-6 pt-4">
              <Text className="text-xl font-qbold text-primary mb-3">
                Ganancia: ${data.price}
              </Text>
            </View>
          </YStack>
        </Pressable>
      </ScrollView>
    </YStack>
  );
}
