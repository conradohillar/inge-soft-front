import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { View, Text, Image, ScrollView } from "react-native";
import { YStack, XStack, PortalProvider, Button } from "tamagui";
import { Link } from "expo-router";
import SelectFieldCar from "../../components/SelectFieldCar";
import Counter from "../../components/Counter";
import icons from "../../constants/icons";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ButtonNext from "../../components/ButtonNext";
import { useRouter } from "expo-router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { LOCAL_IP } from "@env";
import CustomInput from "../../components/CustomInput";

import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { getRideData } from "../../services/rides";
import { Pressable } from "react-native";
import { postTrip } from "../../services/rides";
import DropdownComponent from "../../components/DropdownComponent";

export default function PostTripPage2() {
  const { fromLocation, toLocation, formattedDate, departureTime } =
    useLocalSearchParams();

  const [car, setCar] = useState("");
  const [availableSeats, setAvailableSeats] = useState(0);
  const [spacesSmallPackage, setSmallPackage] = useState(0);
  const [spacesMediumPackage, setMediumPackage] = useState(0);
  const [spacesLargePackage, setLargePackage] = useState(0);
  const [pricePerson, setPricePerson] = useState(0);
  const [priceSmallPackage, setPriceSmallPackage] = useState(0);
  const [priceMediumPackage, setPriceMediumPackage] = useState(0);
  const [priceLargePackage, setPriceLargePackage] = useState(0);

  const { isLoading, error, data } = useQuery({
    queryKey: ["getRideData"],
    queryFn: () => getRideData(fromLocation, toLocation),
  });

  useEffect(() => {
    if (data) {
      setPricePerson(data.prices.price_person.toFixed(2));
      setPriceSmallPackage(data.prices.price_small_package.toFixed(2));
      setPriceMediumPackage(data.prices.price_medium_package.toFixed(2));
      setPriceLargePackage(data.prices.price_large_package.toFixed(2));
      setCar(data.cars[0] ? data.cars[0].plate : "");
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (tripData) => postTrip(tripData, car),
    onSuccess: () => {
      const title = "Publicaste tu viaje";
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

  const router = useRouter();

  const handleContinue = async () => {
    const auxTime = new Date(
      new Date(`1970-01-01T${departureTime}`).getTime() + 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[1];

    const obj = {
      ride: {
        city_from: fromLocation,
        city_to: toLocation,
        ride_date: formattedDate,
        start_minimum_time: departureTime,
        start_maximum_time: auxTime,
        available_space_people: availableSeats,
        available_space_small_package: spacesSmallPackage,
        available_space_medium_package: spacesMediumPackage,
        available_space_large_package: spacesLargePackage,
      },
      price: {
        price_person: pricePerson,
        price_small_package: priceSmallPackage,
        price_medium_package: priceMediumPackage,
        price_large_package: priceLargePackage,
      },
    };

    mutation.mutate(obj);
  };

  if (mutation.isPending || isLoading) {
    return <LoadingPage />;
  }

  if (mutation.isError || error) {
    return <ErrorPage />;
  }

  return (
    <SafeAreaView className="h-full w-full bg-background">
      <Header />
      <View className=" items-center mt-10 mb-12">
        <Text className="text-[27px] font-qbold text-black">
          Detalles de la publicación
        </Text>
      </View>
      <ScrollView>
        <YStack className="items-start justify-center">
          <Text className="text-sm text-black font-qbold ml-10 mb-3">
            Seleccioná tu
            <Text className="text-sm text-primary font-qbold ml-10 mb-3">
              {" "}
              auto
            </Text>
          </Text>
          <View className="w-full items-start ml-7">
            <DropdownComponent
              data={data.cars.map((car) => ({
                label: `${car.model} - ${car.plate}`,
                value: car.plate,
              }))}
              value={car}
              setValue={setCar}
            />
          </View>

          <XStack className="mx-11 mb-5 mt-12">
            <Text className="text-sm font-qbold text-black">
              Indicá los
              <Text className="text-sm font-qbold text-primary">
                {" "}
                espacios disponibles
                <Text className="text-sm font-qbold text-black">
                  {" "}
                  en tu auto:
                </Text>
              </Text>
            </Text>
          </XStack>
          <YStack className="w-full items-start justify-center mb-10">
            <XStack className="w-full items-center justify-around px-10 ml-2 mb-3">
              <Image
                source={icons.profile2}
                className="w-8 h-8"
                resizeMode="contain"
              />
              <Counter
                maxCount={4}
                count={availableSeats}
                handleChangeCount={setAvailableSeats}
              />
            </XStack>
            <XStack className="w-full items-center justify-around px-10 ml-2 mb-3">
              <Image
                source={icons.mypackage}
                className="w-8 h-8"
                resizeMode="contain"
              />
              <Counter
                maxCount={4}
                count={spacesSmallPackage}
                handleChangeCount={setSmallPackage}
              />
            </XStack>
            <XStack className="w-full items-center justify-around px-10 ml-2 mb-3">
              <Image
                source={icons.mypackage}
                className="w-10 h-10"
                resizeMode="contain"
              />
              <Counter
                maxCount={4}
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
                maxCount={4}
                count={spacesLargePackage}
                handleChangeCount={setLargePackage}
              />
            </XStack>
          </YStack>
          <XStack className="mx-11 my-5 ">
            <Text className="text-sm font-qbold text-black">
              Indicá los
              <Text className="text-sm font-qbold text-primary">
                {" "}
                precios
                <Text className="text-sm font-qbold text-black">
                  {" "}
                  que querés asignar:
                </Text>
              </Text>
            </Text>
          </XStack>
          <YStack className="w-full items-start mb-10 space-y-3">
            <View className="w-full items-center justify-between">
              <CustomInput
                title="Precio por persona"
                value={pricePerson}
                handleChangeText={setPricePerson}
              />
            </View>
            <View className="w-full items-center justify-between">
              <CustomInput
                title="Precio por paquete chico"
                value={priceSmallPackage}
                handleChangeText={setPriceSmallPackage}
              />
            </View>
            <View className="w-full items-center justify-between">
              <CustomInput
                title="Precio por paquete mediano"
                value={priceMediumPackage}
                handleChangeText={setPriceMediumPackage}
              />
            </View>
            <View className="w-full items-center justify-between">
              <CustomInput
                title="Precio por paquete grande"
                value={priceLargePackage}
                handleChangeText={setPriceLargePackage}
              />
            </View>
          </YStack>
          <View className="items-center space-y-5 mx-12 mb-8">
            <XStack className="items-center">
              <Link href="/(pages)/PostTripPage" asChild>
                <Button className="w-8 h-8 bg-background">
                  <Image
                    source={icons.arrowleft}
                    className="w-8 h-8"
                    resizeMode="contain"
                  />
                </Button>
              </Link>
              <ButtonNext height={90} width={270} onPress={handleContinue}>
                <Text className="text-2xl font-qsemibold text-white">
                  Publicar Viaje
                </Text>
              </ButtonNext>
            </XStack>
            <Link href="/(tabs)/home" asChild>
              <Text className="text-base font-qsemibold text-red-500">
                Cancelar publicación
              </Text>
            </Link>
          </View>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

const renderSelectedCar = (items, plate) => {
  const myItem = items.find((item) => item.plate === plate);
  return (
    <Text>
      {myItem.model}, {plate}
    </Text>
  );
};
