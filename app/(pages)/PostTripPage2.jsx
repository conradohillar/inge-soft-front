import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { YStack, XStack, Button } from "tamagui";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
import AddCarModal from "../../components/AddCarModal";
import { useQueryClient } from "@tanstack/react-query";
import Window from "../../components/Window";
import { MaterialIcons } from "@expo/vector-icons";

export default function PostTripPage2() {
  const [isAddCarModalVisible, setIsAddCarModalVisible] = useState(false);
  const [priceErrors, setPriceErrors] = useState(0);

  const toggleAddCarModal = () => {
    setIsAddCarModalVisible(!isAddCarModalVisible);
  };

  const { fromLocation, toLocation, formattedDate, departureTime } =
    useLocalSearchParams();

  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(postTripDetailsSchema),
    defaultValues: {
      car: "",
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
      setValue("pricePerson", Math.round(data.prices.price_person));
      setValue(
        "priceSmallPackage",
        Math.round(data.prices.price_small_package)
      );
      setValue(
        "priceMediumPackage",
        Math.round(data.prices.price_medium_package)
      );
      setValue(
        "priceLargePackage",
        Math.round(data.prices.price_large_package)
      );
      setValue("defaultPricePerson", Math.round(data.prices.price_person));
      setValue(
        "defaultPriceSmallPackage",
        Math.round(data.prices.price_small_package)
      );
      setValue(
        "defaultPriceMediumPackage",
        Math.round(data.prices.price_medium_package)
      );
      setValue(
        "defaultPriceLargePackage",
        Math.round(data.prices.price_large_package)
      );
      if (data.cars.length > 0) {
        setValue("car", data.cars[0].plate);
      }
    }
  }, [data]);

  useEffect(() => {
    const errorCount = [
      errors.pricePerson,
      errors.priceSmallPackage,
      errors.priceMediumPackage,
      errors.priceLargePackage,
    ].filter(Boolean).length;

    setPriceErrors(errorCount);
  }, [
    errors.pricePerson,
    errors.priceSmallPackage,
    errors.priceMediumPackage,
    errors.priceLargePackage,
  ]);

  const mutation = useMutation({
    mutationFn: ({ tripData, car }) => postTrip(tripData, car),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ridesUpcoming"] });
      queryClient.invalidateQueries({
        queryKey: ["get", "upcoming", "driver"],
      });

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
        available_space_people: Number(formData.availableSeats),
        available_space_small_package: Number(formData.spacesSmallPackage),
        available_space_medium_package: Number(formData.spacesMediumPackage),
        available_space_large_package: Number(formData.spacesLargePackage),
      },
      price: {
        price_person: Number(formData.pricePerson),
        price_small_package: Number(formData.priceSmallPackage),
        price_medium_package: Number(formData.priceMediumPackage),
        price_large_package: Number(formData.priceLargePackage),
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
    <ScrollView className="bg-background">
      <YStack className="h-full mb-12">
        <YStack className=" justify-center items-center h-[10%]">
          <Text className="text-[27px] font-qbold text-primary">
            Detalles{" "}
            <Text className="text-[27px] font-qbold text-black">
              de la publicación
            </Text>
          </Text>
        </YStack>
        <Pressable>
          <YStack className="items-center justify-center mb-12">
            <Text className="text-sm text-black font-qbold ml-8 mb-3 w-[90%]">
              Seleccioná tu
              <Text className="text-sm text-primary font-qbold ml-10 mb-3">
                {" "}
                auto
              </Text>
            </Text>

            <View
              className="w-full items-center"
              style={{
                display: `${data.cars.length > 0 ? "" : "none"}`,
              }}
            >
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
              {errors.car && (
                <Text className="text-red-500">{errors.car.message}</Text>
              )}
            </View>

            {data.cars.length > 0 ? (
              <></>
            ) : (
              <View className="w-full items-center">
                <AddCarModal
                  isVisible={isAddCarModalVisible}
                  onClose={toggleAddCarModal}
                />
                <Text className="text-sm text-red-500 font-qbold  mb-3">
                  No tenés autos registrados
                </Text>
                <Button
                  className="w-[50%] h-[42] rounded-2xl items-center pb-0.5"
                  onPress={toggleAddCarModal}
                >
                  <Text className="text-lg font-qsemibold text-white">
                    Agregá un auto
                  </Text>
                </Button>
              </View>
            )}

            <XStack className="self-start mt-8 mb-3 ml-10">
              <Text className="text-sm font-qbold text-black">
                Indicá tus{" "}
                <Text className="text-sm font-qbold text-primary">
                  espacios disponibles
                </Text>
              </Text>
            </XStack>
            <Window height={340}>
              <YStack className="w-full items-start justify-center h-full">
                <XStack className="w-full items-center justify-around px-5 ml-2 mb-3">
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
                        bgColor="#eee"
                      />
                    )}
                  />
                  {errors.availableSeats && (
                    <Text className="text-red-500">
                      {errors.availableSeats.message}
                    </Text>
                  )}
                </XStack>
                <XStack className="w-full items-center justify-around px-5 ml-2 mb-3">
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
                        bgColor="#eee"
                      />
                    )}
                  />
                  {errors.spacesSmallPackage && (
                    <Text className="text-red-500">
                      {errors.spacesSmallPackage.message}
                    </Text>
                  )}
                </XStack>
                <XStack className="w-full items-center justify-around px-5 ml-2 mb-3">
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
                        bgColor="#eee"
                      />
                    )}
                  />
                  {errors.spacesMediumPackage && (
                    <Text className="text-red-500">
                      {errors.spacesMediumPackage.message}
                    </Text>
                  )}
                </XStack>
                <XStack className="w-full items-center justify-around px-5 ml-2">
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
                        bgColor="#eee"
                      />
                    )}
                  />
                  {errors.spacesLargePackage && (
                    <Text className="text-red-500">
                      {errors.spacesLargePackage.message}
                    </Text>
                  )}
                </XStack>
              </YStack>
            </Window>
            <XStack className="self-start mt-8 ml-10 mb-3">
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
            <Window height={520 + priceErrors * 50}>
              <YStack className="h-full w-full items-start justify-start">
                <Controller
                  control={control}
                  name="pricePerson"
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      width={"92%"}
                      keyboardType="numeric"
                      title="Precio por persona"
                      value={String(value)}
                      handleChangeText={onChange}
                      hint={errors.pricePerson?.message}
                      borderColor={
                        errors.pricePerson ? "border-red-500" : undefined
                      }
                      prependIcon={
                        <MaterialIcons
                          name="attach-money"
                          size={16}
                          color="#808080"
                        />
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="priceSmallPackage"
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      width={"92%"}
                      keyboardType="numeric"
                      title="Precio por paquete chico"
                      value={String(value)}
                      handleChangeText={onChange}
                      hint={errors.priceSmallPackage?.message}
                      borderColor={
                        errors.priceSmallPackage ? "border-red-500" : undefined
                      }
                      prependIcon={
                        <MaterialIcons
                          name="attach-money"
                          size={16}
                          color="#808080"
                        />
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="priceMediumPackage"
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      width={"92%"}
                      keyboardType="numeric"
                      title="Precio por paquete mediano"
                      value={String(value)}
                      handleChangeText={onChange}
                      hint={errors.priceMediumPackage?.message}
                      borderColor={
                        errors.priceMediumPackage ? "border-red-500" : undefined
                      }
                      prependIcon={
                        <MaterialIcons
                          name="attach-money"
                          size={16}
                          color="#808080"
                        />
                      }
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="priceLargePackage"
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      width={"92%"}
                      keyboardType="numeric"
                      title="Precio por paquete grande"
                      value={String(value)}
                      handleChangeText={onChange}
                      hint={errors.priceLargePackage?.message}
                      borderColor={
                        errors.priceLargePackage ? "border-red-500" : undefined
                      }
                      prependIcon={
                        <MaterialIcons
                          name="attach-money"
                          size={16}
                          color="#808080"
                        />
                      }
                    />
                  )}
                />
              </YStack>
            </Window>
            <XStack className="items-center mx-12 mt-10 mb-12">
              <Link href="/(pages)/PostTripPage" asChild>
                <Button className="w-8 h-8 bg-background">
                  <Image
                    source={icons.arrowleft}
                    className="w-8 h-8"
                    resizeMode="contain"
                  />
                </Button>
              </Link>
              <ButtonNext
                onPress={handleSubmit(handleContinue)}
                variant="secondary"
              >
                <Text className="text-2xl font-qsemibold text-white">
                  Publicar Viaje
                </Text>
              </ButtonNext>
            </XStack>
          </YStack>
        </Pressable>
      </YStack>
    </ScrollView>
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
