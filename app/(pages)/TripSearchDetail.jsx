import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { useEffect, useState } from "react";
import { XStack, YStack, Avatar, Button } from "tamagui";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getRideSearchDetail } from "../../services/rides";
import LoadingPage from "./LoadingPage";
import { Link } from "expo-router";
import ErrorPage from "./ErrorPage";
import Counter from "../../components/Counter";
import icons from "../../constants/icons";
import { useLocalSearchParams } from "expo-router";
import ButtonNext from "../../components/ButtonNext";
import { joinRide } from "../../services/rides";
import { useRouter } from "expo-router";

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
    <SafeAreaView className="bg-background flex-1">
      <Header />
      <YStack className="h-full items-start justify-start bg-background mb-12">
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
                <Text className="text-3xl font-qbold text-black">
                  {" "}
                  del viaje
                </Text>
              </Text>
            </View>
          </XStack>
        </View>
        <ScrollView className="h-full w-full">
          <YStack className="items-start justify-between w-full px-4 pb-8 pt-2 mb-1 border-2 border-[#eee]">
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
              Fecha:
              <Text className="text-base font-qbold text-black">
                {" "}
                {data.date}
              </Text>
            </Text>
            <Text className="text-base font-qsemibold text-gray-500 mb-6">
              Hora de
              <Text className="text-base font-qbold text-primary">
                {" "}
                salida:
                <Text className="text-base font-qbold text-black">
                  {" "}
                  {data.start_minimum_time
                    .split(":")
                    .slice(0, 2)
                    .join(":")} -{" "}
                  {data.start_maximum_time.split(":").slice(0, 2).join(":")}
                </Text>
              </Text>
            </Text>
            <Text className=" w-full pt-5 text-base font-qsemibold text-gray-500 mb-1 border-t-2 border-t-[#eee]">
              Espacios
              <Text className="text-base font-qbold text-primary">
                {" "}
                disponibles:
              </Text>
            </Text>
            <Text className="text-base font-qbold text-black mb-1">
              Personas:
              <Text className="text-base font-qbold text-black">
                {" "}
                {data.available_space_persons}
              </Text>
            </Text>
            <Text className="text-base font-qbold text-black mb-1">
              Paquetes
              <Text className="text-base font-qbold text-primary">
                {" "}
                chicos:
                <Text className="text-base font-qbold text-black">
                  {" "}
                  {data.available_space_small_package}
                </Text>
              </Text>
            </Text>
            <Text className="text-base font-qbold text-black mb-1">
              Paquetes
              <Text className="text-base font-qbold text-primary">
                {" "}
                medianos:
                <Text className="text-base font-qbold text-black">
                  {" "}
                  {data.available_space_medium_package}
                </Text>
              </Text>
            </Text>
            <Text className="text-base font-qbold text-black">
              Paquetes
              <Text className="text-base font-qbold text-primary">
                {" "}
                grandes:
                <Text className="text-base font-qbold text-black">
                  {" "}
                  {data.available_space_large_package}
                </Text>
              </Text>
            </Text>
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
              <Link href={`/driver/${data.driver_id}`} asChild>
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
          <YStack className="items-start justify-between w-full px-4 pb-8 pt-3 mb-12 border-t-2 border-t-[#eee]">
            <Text className="text-sm font-qbold text-[#ccc] mb-5">
              Confirmá tu reserva
            </Text>
            <YStack className="w-full items-start justify-center mb-10">
              <XStack className="w-full items-center justify-around px-10 ml-2 mb-1">
                <Image
                  source={icons.profile2}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
                <Counter
                  maxCount={data.available_space_persons}
                  count={seats}
                  handleChangeCount={setSeats}
                />
              </XStack>
              <XStack className="w-full items-center justify-around px-10 ml-2 mb-1">
                <Image
                  source={icons.mypackage}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
                <Counter
                  maxCount={data.available_space_small_package}
                  count={spacesSmallPackage}
                  handleChangeCount={setSmallPackage}
                />
              </XStack>
              <XStack className="w-full items-center justify-around px-10 ml-2 mb-1">
                <Image
                  source={icons.mypackage}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
                <Counter
                  maxCount={data.available_space_medium_package}
                  count={spacesMediumPackage}
                  handleChangeCount={setMediumPackage}
                />
              </XStack>
              <XStack className="w-full items-center justify-around px-10 ml-2">
                <Image
                  source={icons.mypackage}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
                <Counter
                  maxCount={data.available_space_large_package}
                  count={spacesLargePackage}
                  handleChangeCount={setLargePackage}
                />
              </XStack>
            </YStack>
            <View className="w-full items-center justify-center mb-3">
              <Text className="text-xl font-qbold text-grey-800 mb-3">
                Costo: ${price}
              </Text>
            </View>
            <ButtonNext onPress={handleJoin}>
              <Text className="text-2xl font-qsemibold text-white">
                Reservar viaje
              </Text>
            </ButtonNext>
          </YStack>
        </ScrollView>
      </YStack>
    </SafeAreaView>
  );
}
