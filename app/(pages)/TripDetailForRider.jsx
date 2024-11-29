import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { useState } from "react";
import { XStack, YStack, Avatar, Button } from "tamagui";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { getRiderDetail } from "../../services/rides";
import LoadingPage from "./LoadingPage";
import { Link } from "expo-router";
import ErrorPage from "./ErrorPage";
import icons from "../../constants/icons";
import { useLocalSearchParams } from "expo-router";
import ButtonNext from "../../components/ButtonNext";
import RateCommentModal from "../../components/RateCommentModal";
import { MaterialIcons } from "@expo/vector-icons";
export default function TripDetailForRider() {
  const { ride_id } = useLocalSearchParams();

  const [pressed, setPressed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["riderDetail", ride_id],
    queryFn: () => getRiderDetail(ride_id),
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <YStack className="h-full items-start justify-start bg-background mb-12 w-full">
      <View className="w-full h-[10%] items-center justify-center">
        <XStack className="w-full items-start justify-center ml-12 mt-3">
          <Link
            href={{
              pathname: "/(pages)/TripsPage",
              params: { category: "rider" },
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
      {data.state && <StatusMsg state={data.state} />}
      <ScrollView className="h-full w-full">
        <Pressable>
          <YStack className="items-start justify-between w-full px-6 pb-6 pt-4 mb-1 border-b-2 border-b-[#eee]">
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
              Espacios disponibles
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
                  {data.space_persons}
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
                  {data.space_small_package}
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
                  {data.space_medium_package}
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
                  {data.space_large_package}
                </Text>
              </XStack>
            </YStack>
            <View className="w-full items-start border-t-2 border-t-[#eee] mt-10 pt-4">
              <Text className="text-xl font-qbold text-red-700 my-3">
                Costo: ${data.price.toFixed(2)}
              </Text>
            </View>
          </YStack>
          <YStack className="items-start justify-between w-full px-4 pb-6 pt-3 mb-1 border-2 border-[#eee]">
            <Text className="text-sm font-qbold text-[#ccc] mb-5">
              Sobre el conductor
            </Text>
            <XStack className="items-center justify-start w-full mb-5">
              <Avatar circular size="$10" borderColor="$black" borderWidth={1}>
                <Avatar.Image
                  src={
                    data.driver_photo === ""
                      ? icons.placeholder_profile
                      : data.driver_photo
                  }
                />
                <Avatar.Fallback backgroundColor="$gray8" />
              </Avatar>
              <YStack className="items-start justify-start">
                <Text className="text-xl font-qbold text-black ml-3 mb-1">
                  {data.driver_name}
                </Text>
                <Text className="text-sm font-qbold text-gray-500 ml-3">
                  Vehículo: {data.car_model}, {data.car_plate}
                </Text>
              </YStack>
            </XStack>
            <View className="w-full items-center mb-4">
              <Link
                href={{
                  pathname: "/(pages)/UserProfile",
                  params: { user_id: data.driver_id, category: "driver" },
                }}
                asChild
              >
                <Pressable
                  onPressIn={() => setPressed(true)}
                  onPressOut={() => setPressed(false)}
                  style={{
                    backgroundColor: "#59A58A",
                    opacity: pressed ? 0.7 : 1,
                    alignItems: "center",
                    paddingVertical: 8,
                    borderRadius: 8,
                    width: "60%",
                  }}
                >
                  <Text className="text-sm font-qsemibold text-white">
                    Ver perfil del conductor
                  </Text>
                </Pressable>
              </Link>
            </View>
          </YStack>
          <YStack className="items-start justify-between w-full px-4 pb-8 pt-3 border-t-2 border-t-[#eee]">
            <Text className="text-sm font-qbold text-[#ccc] mb-4">
              Calificá tu experiencia
            </Text>
            <ButtonNext
              onPress={() => setIsModalVisible(true)}
              variant={"secondary"}
            >
              <Text className="text-2xl font-qsemibold text-white">
                Calificar
              </Text>
            </ButtonNext>
          </YStack>
        </Pressable>
      </ScrollView>
      <RateCommentModal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        category={"driver"}
        rideId={ride_id}
        receiverId={data.driver_id}
        setIsVisible={setIsModalVisible}
      />
    </YStack>
  );
}

const StatusMsg = ({ state }) => {
  const msg =
    state === "pending"
      ? "todavía no aceptó"
      : state === "accepted"
      ? "ya aceptó"
      : "rechazó";

  return (
    <View className="w-full items-center">
      <XStack className="w-[95%] items-center justify-center space-x-2 mb-4">
        <Image
          source={getState(state)}
          className="h-6 w-6"
          resizeMode="contain"
          style={{
            tintColor:
              state === "pending"
                ? "#ff6633"
                : state === "accepted"
                ? "#008000"
                : "#FF0000",
          }}
        />
        <Text className="text-sm font-qbold text-gray-600">
          El conductor {msg} tu solicitud
        </Text>
      </XStack>
    </View>
  );
};

const getState = (state) => {
  if (state === "pending") {
    return require("../../assets/icons/alert.png");
  } else if (state === "accepted") {
    return require("../../assets/icons/accepted.png");
  } else if (state === "dismissed") {
    return require("../../assets/icons/dismissed.png");
  } else return null;
};
