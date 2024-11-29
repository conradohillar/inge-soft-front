import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Linking,
} from "react-native";
import { useEffect, useState } from "react";
import { XStack, YStack, Avatar, Button } from "tamagui";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getRideSearchDetail, payRide } from "../../services/rides";
import LoadingPage from "./LoadingPage";
import { Link } from "expo-router";
import ErrorPage from "./ErrorPage";
import Counter from "../../components/Counter";
import icons from "../../constants/icons";
import { useLocalSearchParams } from "expo-router";
import ButtonNext from "../../components/ButtonNext";
import { joinRide } from "../../services/rides";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Window from "../../components/Window";
export default function TripSearchDetail() {
  const { ride_id, people, smallPacks, mediumPacks, largePacks } =
    useLocalSearchParams();

  const [pressed, setPressed] = useState(false);

  const [seats, setSeats] = useState(parseInt(people, 10));
  const [spacesSmallPackage, setSmallPackage] = useState(
    parseInt(smallPacks, 10)
  );
  const [spacesMediumPackage, setMediumPackage] = useState(
    parseInt(mediumPacks, 10)
  );
  const [spacesLargePackage, setLargePackage] = useState(
    parseInt(largePacks, 10)
  );

  const { data, isError, isLoading } = useQuery({
    queryKey: ["rideSearchDetail", ride_id],
    queryFn: () => getRideSearchDetail(ride_id),
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data) => joinRide(data),
    onSuccess: () => {
      const title = "Reservaste tu viaje";
      const section = "MIS VIAJES";
      const sectionSource = icons.car;
      const returnTo = "Volver al Inicio";
      const returnToSource = icons.home;
      const returnToRef = "/(tabs)/home";

      router.push({
        pathname: "/(pages)/PostSuccessful",
        params: {
          title,
          section,
          sectionSource,
          returnTo,
          returnToSource,
          returnToRef,
        },
      });
    },
  });

  const paymentMutation = useMutation({
    mutationFn: (data) => payRide(data),
    onSuccess: (data) => {
      Linking.openURL(data.link);
    },
  });

  const handleJoin = () => {
    const data = {
      ride_id: ride_id,
      people: seats,
      small_packages: spacesSmallPackage,
      medium_packages: spacesMediumPackage,
      large_packages: spacesLargePackage,
    };
    mutation.mutate(data);
  };

  const handlePayment = () => {
    const data = {
      title: "Pagá la reserva de tu viaje",
      price: price * 0.15,
      ride_id: ride_id,
    };
    paymentMutation.mutate(data);
  };

  if (isLoading || mutation.isPending) {
    return <LoadingPage />;
  }

  if (isError || mutation.isError) {
    return <ErrorPage />;
  }

  const price = (
    data.price_person * seats +
    data.price_small_package * spacesSmallPackage +
    data.price_medium_package * spacesMediumPackage +
    data.price_large_package * spacesLargePackage
  ).toFixed(2);

  return (
    <YStack className="w-full h-full items-start justify-start bg-background mb-12">
      <View className="w-full h-[10%] items-center justify-center">
        <XStack className="w-full items-start justify-center ml-12">
          <Link href={"/(pages)/SearchResultsPage"} asChild>
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
      <ScrollView className="h-full w-full">
        <Pressable>
          <YStack className="items-start justify-between w-full px-6 pb-8 pt-4 mb-1 border-b-2 border-b-[#eee]">
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
                  {data.available_space_persons}
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
                  {data.available_space_small_package}
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
                  {data.available_space_medium_package}
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
                  {data.available_space_large_package}
                </Text>
              </XStack>
            </YStack>
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
          <YStack className="items-center justify-between w-full px-4 pb-8 pt-3 mb-12 border-t-2 border-t-[#eee]">
            <Text className="self-start text-sm font-qbold text-[#ccc] mb-6">
              Confirmá tu reserva
            </Text>
            <Window height={310} width={"90%"}>
              <YStack className="w-full items-center justify-center">
                <XStack className="w-full items-center justify-around px-5 ml-2 mb-1">
                  <Image
                    source={icons.profile2}
                    className="w-8 h-8"
                    resizeMode="contain"
                  />
                  <Counter
                    maxCount={data.available_space_persons}
                    count={seats}
                    handleChangeCount={setSeats}
                    bgColor={"#eee"}
                  />
                </XStack>
                <XStack className="w-full items-center justify-around px-5 ml-2 mb-1">
                  <Image
                    source={icons.mypackage}
                    className="w-8 h-8"
                    resizeMode="contain"
                  />
                  <Counter
                    maxCount={data.available_space_small_package}
                    count={spacesSmallPackage}
                    handleChangeCount={setSmallPackage}
                    bgColor={"#eee"}
                  />
                </XStack>
                <XStack className="w-full items-center justify-around px-5 ml-2 mb-1">
                  <Image
                    source={icons.mypackage}
                    className="w-10 h-10"
                    resizeMode="contain"
                  />
                  <Counter
                    maxCount={data.available_space_medium_package}
                    count={spacesMediumPackage}
                    handleChangeCount={setMediumPackage}
                    bgColor={"#eee"}
                  />
                </XStack>
                <XStack className="w-full items-center justify-around px-5 ml-2">
                  <Image
                    source={icons.mypackage}
                    className="w-12 h-12"
                    resizeMode="contain"
                  />
                  <Counter
                    maxCount={data.available_space_large_package}
                    count={spacesLargePackage}
                    handleChangeCount={setLargePackage}
                    bgColor={"#eee"}
                  />
                </XStack>
              </YStack>
            </Window>
            <View className="w-full items-center justify-center my-6">
              <Text className="text-xl font-qbold text-grey-800 mb-3">
                Costo: ${price}
              </Text>
            </View>
            <ButtonNext
              onPress={() => {
                handlePayment();
                handleJoin();
              }}
              variant="secondary"
            >
              <Text className="text-2xl font-qsemibold text-white">
                Reservar viaje
              </Text>
            </ButtonNext>
          </YStack>
        </Pressable>
      </ScrollView>
    </YStack>
  );
}
