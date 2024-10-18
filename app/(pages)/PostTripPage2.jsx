import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { YStack, XStack, Button } from "tamagui";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery, useMutation } from "@tanstack/react-query";
import Header from "../../components/Header";
import Counter from "../../components/Counter";
import ButtonNext from "../../components/ButtonNext";
import CustomInput from "../../components/CustomInput";
import DropdownComponent from "../../components/DropdownComponent";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import icons from "../../constants/icons";
import { getRideData, postTrip } from "../../services/rides";
import { postTripDetailsSchema } from "../../validation/ridesSchemas";

export default function PostTripPage2() {
  const { fromLocation, toLocation, formattedDate, departureTime } =
    useLocalSearchParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(postTripDetailsSchema),
    defaultValues: {
      car: '',
      availableSeats: 0,
      spacesSmallPackage: 0,
      spacesMediumPackage: 0,
      spacesLargePackage: 0,
      pricePerson: 0,
      priceSmallPackage: 0,
      priceMediumPackage: 0,
      priceLargePackage: 0,
      defaultPricePerson: 0,
      defaultPriceSmallPackage: 0,
      defaultPriceMediumPackage: 0,
      defaultPriceLargePackage: 0,
    },
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["getRideData"],
    queryFn: () => getRideData(fromLocation, toLocation),
  });

  useEffect(() => {
    if (data && data.prices) {
      setValue('pricePerson', Math.round(data.prices.price_person));
      setValue('priceSmallPackage', Math.round(data.prices.price_small_package));
      setValue('priceMediumPackage', Math.round(data.prices.price_medium_package));
      setValue('priceLargePackage', Math.round(data.prices.price_large_package));
      setValue('defaultPricePerson', Math.round(data.prices.price_person));
      setValue('defaultPriceSmallPackage', Math.round(data.prices.price_small_package));
      setValue('defaultPriceMediumPackage', Math.round(data.prices.price_medium_package));
      setValue('defaultPriceLargePackage', Math.round(data.prices.price_large_package));
      setValue('car', data.cars[0].plate);
    }
  }, [data]);


  const mutation = useMutation({
    mutationFn: ({ tripData, car }) => postTrip(tripData, car),
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

  const handleContinue = async (formData) => {
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
        available_space_people: formData.availableSeats,
        available_space_small_package: formData.spacesSmallPackage,
        available_space_medium_package: formData.spacesMediumPackage,
        available_space_large_package: formData.spacesLargePackage,
      },
      price: {
        price_person: formData.pricePerson,
        price_small_package: formData.priceSmallPackage,
        price_medium_package: formData.priceMediumPackage,
        price_large_package: formData.priceLargePackage,
      },
    };

    mutation.mutate({ tripData: obj, car: formData.car });
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
            <Controller
              control={control}
              name="car"
              render={({ field: { onChange, value } }) => (
                <DropdownComponent
                  data={data.cars.map((car) => ({
                    label: `${car.model} - ${car.plate}`,
                    value: car.plate,
                  }))}
                  value={value}
                  setValue={onChange}
                />
              )}
            />
            {errors.car && <Text className="text-red-500">{errors.car.message}</Text>}
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
              <Controller
                control={control}
                name="availableSeats"
                render={({ field: { onChange, value } }) => (
                  <Counter
                    maxCount={4}
                    count={value}
                    handleChangeCount={onChange}
                  />
                )}
              />
              {errors.availableSeats && <Text className="text-red-500">{errors.availableSeats.message}</Text>}
            </XStack>
            <XStack className="w-full items-center justify-around px-10 ml-2 mb-3">
              <Image
                source={icons.mypackage}
                className="w-8 h-8"
                resizeMode="contain"
              />
              <Controller
                control={control}
                name="spacesSmallPackage"
                render={({ field: { onChange, value } }) => (
                  <Counter
                    maxCount={4}
                    count={value}
                    handleChangeCount={onChange}
                  />
                )}
              />
              {errors.spacesSmallPackage && <Text className="text-red-500">{errors.spacesSmallPackage.message}</Text>}
            </XStack>
            <XStack className="w-full items-center justify-around px-10 ml-2 mb-3">
              <Image
                source={icons.mypackage}
                className="w-10 h-10"
                resizeMode="contain"
              />
              <Controller
                control={control}
                name="spacesMediumPackage"
                render={({ field: { onChange, value } }) => (
                  <Counter
                    maxCount={4}
                    count={value}
                    handleChangeCount={onChange}
                  />
                )}
              />
              {errors.spacesMediumPackage && <Text className="text-red-500">{errors.spacesMediumPackage.message}</Text>}
            </XStack>
            <XStack className="w-full items-center justify-around px-10 ml-2">
              <Image
                source={icons.mypackage}
                className="w-12 h-12"
                resizeMode="contain"
              />
              <Controller
                control={control}
                name="spacesLargePackage"
                render={({ field: { onChange, value } }) => (
                  <Counter
                    maxCount={4}
                    count={value}
                    handleChangeCount={onChange}
                  />
                )}
              />
              {errors.spacesLargePackage && <Text className="text-red-500">{errors.spacesLargePackage.message}</Text>}
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
              <Controller
                control={control}
                name="pricePerson"
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    keyboardType="numeric"
                    title="Precio por persona"
                    value={String(value)}
                    handleChangeText={onChange}
                  />
                )}
              />
              {errors.pricePerson && <Text className="text-red-500">{errors.pricePerson.message}</Text>}
            </View>
            <View className="w-full items-center justify-between">
              <Controller
                control={control}
                name="priceSmallPackage"
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    keyboardType="numeric"
                    title="Precio por paquete chico"
                    value={String(value)}
                    handleChangeText={onChange}
                  />
                )}
              />
              {errors.priceSmallPackage && <Text className="text-red-500">{errors.priceSmallPackage.message}</Text>}
            </View>
            <View className="w-full items-center justify-between">
              <Controller
                control={control}
                name="priceMediumPackage"
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    keyboardType="numeric"
                    title="Precio por paquete mediano"
                    value={String(value)}
                    handleChangeText={onChange}
                  />
                )}
              />
              {errors.priceMediumPackage && <Text className="text-red-500">{errors.priceMediumPackage.message}</Text>}
            </View>
            <View className="w-full items-center justify-between">
              <Controller
                control={control}
                name="priceLargePackage"
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    keyboardType="numeric"
                    title="Precio por paquete grande"
                    value={String(value)}
                    handleChangeText={onChange}
                  />
                )}
              />
              {errors.priceLargePackage && <Text className="text-red-500">{errors.priceLargePackage.message}</Text>}
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
              <ButtonNext height={90} width={270} onPress={handleSubmit(handleContinue)}>
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
